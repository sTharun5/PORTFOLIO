import { createApp } from 'vue';
import { MotionPlugin } from '@vueuse/motion';
import Particles from "@tsparticles/vue3";
import { loadFull } from "tsparticles";
import './index.css';
import App from './App.vue';

const app = createApp(App);

app.use(MotionPlugin);
app.use(Particles, {
  init: async engine => {
    // loadFull covers all essential interactions like connecting lines, mouse attract, repulse, etc.
    await loadFull(engine);
  },
});

app.mount('#app');
