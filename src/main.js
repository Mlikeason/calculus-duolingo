import '../styles/main.css';
import { currentRoute, onRoute } from './router.js';
import { renderTree } from './tree.js';
import { renderLesson } from './lesson.js';

const app = document.getElementById('app');

function render() {
  const r = currentRoute();
  if (r.name === 'lesson') {
    renderLesson(app, r.unitId, false);
  } else if (r.name === 'preview') {
    renderLesson(app, r.unitId, true);
  } else {
    renderTree(app);
  }
  window.scrollTo({ top: 0 });
}

onRoute(render);
render();
