import { KNOWLEDGE_BASE } from './knowledge';
import { KnowledgeChunk, RetrievalResult, SourceCitation } from './types';

// Common stop words to strip during lexical analysis
const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
  'to', 'was', 'were', 'will', 'with', 'about', 'tell', 'me', 'what',
  'who', 'where', 'when', 'how', 'does', 'did', 'his', 'can', 'you'
]);

// Semantic query expansion synonyms dictionary
const SYNONYM_MAP: Record<string, string[]> = {
  'internship': ['aptean', 'tlx', 'intern', 'work', 'experience', 'industry'],
  'job': ['aptean', 'role', 'work', 'experience', 'career'],
  'company': ['aptean', 'tlx'],
  'experience': ['aptean', 'internship', 'stored procedures', 't-sql', 'genai'],
  'mcp': ['model context protocol', 'ai agent', 'tools', 'freight audit'],
  'sql': ['t-sql', 'sql server', 'stored procedures', 'query optimization', 'indexing'],
  'database': ['sql server', 't-sql', 'mysql', 'rds', 'jdbc', 'acid'],
  'college': ['bannari amman', 'btech', 'education', 'degree', 'cgpa'],
  'education': ['bannari amman', 'btech', 'cgpa', 'grades', 'college'],
  'gpa': ['cgpa', '8.95', 'marks', 'score', 'academics'],
  'cert': ['nptel', 'certification', 'udemy', 'iit kharagpur', 'credential'],
  'certs': ['nptel', 'certification', 'udemy', 'iit kharagpur', 'credential'],
  'certification': ['nptel', 'java', 'iit kharagpur', 'topper', 'elite', 'udemy'],
  'certifications': ['nptel', 'java', 'iit kharagpur', 'topper', 'elite', 'udemy'],
  'java': ['nptel', 'iit kharagpur', 'railway reservation', 'jdbc', 'trainer'],
  'project': ['freight audit', 'alpr', 'od approval', 'railway', 'github'],
  'projects': ['freight audit', 'alpr', 'od approval', 'railway', 'github'],
  'resume': ['contact', 'email', 'phone', 'linkedin', 'cgpa', 'aptean'],
  'contact': ['email', 'phone', 'linkedin', 'github', 'reach', 'stharun612@gmail.com'],
  'hire': ['availability', 'full-time', 'contact', 'relocation', 'email'],
  'vision': ['opencv', 'easyocr', 'rapidocr', 'alpr', 'computer vision'],
  'ocr': ['rapidocr', 'easyocr', 'freight audit', 'alpr', 'onnx runtime']
};

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .map(w => w.trim())
    .filter(w => w.length > 1 && !STOP_WORDS.has(w));
}

// Compute IDF across our knowledge base
const TOTAL_DOCS = KNOWLEDGE_BASE.length;
const DOC_FREQUENCIES: Record<string, number> = {};

KNOWLEDGE_BASE.forEach(chunk => {
  const docTokens = new Set([
    ...tokenize(chunk.title),
    ...tokenize(chunk.content),
    ...chunk.keywords.map(k => k.toLowerCase())
  ]);
  docTokens.forEach(token => {
    DOC_FREQUENCIES[token] = (DOC_FREQUENCIES[token] || 0) + 1;
  });
});

function calculateIdf(token: string): number {
  const df = DOC_FREQUENCIES[token] || 0;
  return Math.log(1 + (TOTAL_DOCS - df + 0.5) / (df + 0.5));
}

// BM25 parameters
const K1 = 1.2;
const B = 0.75;
const AVG_DOC_LEN =
  KNOWLEDGE_BASE.reduce((acc, c) => acc + tokenize(c.content).length, 0) / TOTAL_DOCS;

/**
 * High-performance Hybrid Retriever (BM25 + Semantic Expansion)
 */
export class HybridRetriever {
  private chunks: KnowledgeChunk[];

  constructor(chunks: KnowledgeChunk[] = KNOWLEDGE_BASE) {
    this.chunks = chunks;
  }

  public retrieve(query: string, topK: number = 4): { results: RetrievalResult[]; citations: SourceCitation[] } {
    const rawTokens = tokenize(query);
    if (rawTokens.length === 0) {
      // Default to highest importance chunks if query is empty or trivial
      const topDefaults = [...this.chunks]
        .sort((a, b) => b.importance - a.importance)
        .slice(0, 2);
      return {
        results: topDefaults.map(chunk => ({
          chunk,
          score: 1.0,
          bm25Score: 1.0,
          semanticScore: 1.0
        })),
        citations: topDefaults.map(c => this.toCitation(c))
      };
    }

    // Expand query with domain synonyms
    const expandedTokens = new Set<string>(rawTokens);
    rawTokens.forEach(t => {
      if (SYNONYM_MAP[t]) {
        SYNONYM_MAP[t].forEach(syn => expandedTokens.add(syn.toLowerCase()));
      }
    });

    const queryTokensList = Array.from(expandedTokens);

    const scored = this.chunks.map(chunk => {
      const titleTokens = tokenize(chunk.title);
      const contentTokens = tokenize(chunk.content);
      const keywordTokens = chunk.keywords.map(k => k.toLowerCase());
      
      const docLen = contentTokens.length;

      // 1. BM25 calculation
      let bm25Score = 0;
      queryTokensList.forEach(qt => {
        const idf = calculateIdf(qt);
        const tf = contentTokens.filter(t => t === qt).length;
        const numerator = tf * (K1 + 1);
        const denominator = tf + K1 * (1 - B + B * (docLen / AVG_DOC_LEN));
        bm25Score += idf * (numerator / (denominator || 1));

        // Direct Title & Keyword bonuses
        if (titleTokens.includes(qt)) bm25Score += 2.5;
        if (keywordTokens.some(k => k.includes(qt))) bm25Score += 2.0;
      });

      // 2. Semantic Intersection Score
      let semanticHits = 0;
      queryTokensList.forEach(qt => {
        if (
          titleTokens.some(t => t.includes(qt) || qt.includes(t)) ||
          keywordTokens.some(k => k.includes(qt) || qt.includes(k)) ||
          contentTokens.some(t => t.includes(qt))
        ) {
          semanticHits++;
        }
      });
      const semanticScore = semanticHits / (queryTokensList.length || 1);

      // 3. Combined Hybrid Score with importance weighting
      const normalizedBm25 = Math.min(bm25Score / 10, 1.0);
      const combinedScore = (normalizedBm25 * 0.5) + (semanticScore * 0.4) + ((chunk.importance / 10) * 0.1);

      return {
        chunk,
        score: combinedScore,
        bm25Score,
        semanticScore
      };
    });

    // Sort descending by combined hybrid score
    scored.sort((a, b) => b.score - a.score);

    // Keep topK matches with minimum relevance threshold
    const bestMatches = scored
      .filter(item => item.score > 0.18 || item.semanticScore > 0.3)
      .slice(0, topK);

    // If no strong matches, provide top high-importance default
    const finalResults = bestMatches.length > 0 ? bestMatches : [scored[0]];

    const citations = finalResults.map(r => this.toCitation(r.chunk));

    return { results: finalResults, citations };
  }

  private toCitation(chunk: KnowledgeChunk): SourceCitation {
    return {
      id: chunk.id,
      title: chunk.title,
      category: chunk.category,
      url: chunk.sourceUrl,
      sourceType: chunk.sourceType
    };
  }
}

export const retriever = new HybridRetriever();
