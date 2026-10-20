export type ChunkCategory = 
  | 'experience'
  | 'projects'
  | 'education'
  | 'skills'
  | 'certifications'
  | 'leadership'
  | 'contact';

export interface SourceCitation {
  id: string;
  title: string;
  category: ChunkCategory;
  url?: string;
  sourceType?: 'github' | 'linkedin' | 'credential' | 'demo' | 'internal';
}

export interface KnowledgeChunk {
  id: string;
  title: string;
  category: ChunkCategory;
  content: string;
  keywords: string[];
  importance: number; // 1 to 10
  sourceUrl?: string;
  sourceType?: 'github' | 'linkedin' | 'credential' | 'demo' | 'internal';
}

export interface RetrievalResult {
  chunk: KnowledgeChunk;
  score: number;
  bm25Score: number;
  semanticScore: number;
}

export type StreamEvent = 
  | { type: 'citations'; citations: SourceCitation[] }
  | { type: 'delta'; text: string }
  | { type: 'done' }
  | { type: 'error'; message: string };
