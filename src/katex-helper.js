import katex from 'katex';
import 'katex/dist/katex.min.css';

export function renderMath(el) {
  if (!el) return;
  // Render $...$ and $$...$$ within the element's text/HTML.
  const walk = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.nodeValue;
      if (!text || (!text.includes('$') && !text.includes('\\('))) return;
      const frag = document.createDocumentFragment();
      let i = 0;
      const re = /\$\$([\s\S]+?)\$\$|\$([^\$\n]+?)\$/g;
      let m;
      while ((m = re.exec(text)) !== null) {
        if (m.index > i) frag.appendChild(document.createTextNode(text.slice(i, m.index)));
        const isBlock = m[1] != null;
        const tex = isBlock ? m[1] : m[2];
        const span = document.createElement(isBlock ? 'div' : 'span');
        try {
          katex.render(tex, span, { displayMode: isBlock, throwOnError: false });
        } catch {
          span.textContent = m[0];
        }
        frag.appendChild(span);
        i = m.index + m[0].length;
      }
      if (i < text.length) frag.appendChild(document.createTextNode(text.slice(i)));
      node.parentNode.replaceChild(frag, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') return;
      if (node.dataset && node.dataset.mathRendered) return;
      const children = Array.from(node.childNodes);
      for (const c of children) walk(c);
    }
  };
  walk(el);
  el.dataset.mathRendered = '1';
}

export function tex(s, displayMode = false) {
  const span = document.createElement(displayMode ? 'div' : 'span');
  try {
    katex.render(s, span, { displayMode, throwOnError: false });
  } catch {
    span.textContent = s;
  }
  return span.outerHTML;
}
