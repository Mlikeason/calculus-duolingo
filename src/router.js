const listeners = new Set();

function parseHash() {
  const h = location.hash.replace(/^#\/?/, '');
  if (!h) return { name: 'tree' };
  const parts = h.split('/');
  if (parts[0] === 'lesson' && parts[1]) return { name: 'lesson', unitId: parts[1] };
  return { name: 'tree' };
}

export function currentRoute() { return parseHash(); }

export function go(path) {
  location.hash = path.startsWith('#') ? path : '#' + path;
}

window.addEventListener('hashchange', () => {
  for (const fn of listeners) fn(parseHash());
});

export function onRoute(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
