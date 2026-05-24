import { renderFunctionMachine } from './function-machine.js';
import { renderPlotter } from './plotter.js';
import { renderUnitCircle } from './unit-circle.js';
import { renderExpLog } from './exp-log.js';
import { renderDomainRange } from './domain-range.js';
import { renderInverseMirror } from './inverse-mirror.js';
import { renderComposition } from './composition.js';
import { renderLimitApproach } from './limit-approach.js';
import { renderDiscontinuityTypes } from './discontinuity-types.js';
import { renderSmallOrders } from './small-orders.js';
import { renderELimit } from './e-limit.js';

export function renderViz(host, viz) {
  switch (viz.type) {
    case 'function-machine':    return renderFunctionMachine(host, viz);
    case 'plotter':             return renderPlotter(host, viz);
    case 'unit-circle':         return renderUnitCircle(host, viz);
    case 'exp-log':             return renderExpLog(host, viz);
    case 'domain-range':        return renderDomainRange(host, viz);
    case 'inverse-mirror':      return renderInverseMirror(host, viz);
    case 'composition':         return renderComposition(host, viz);
    case 'limit-approach':      return renderLimitApproach(host, viz);
    case 'discontinuity-types': return renderDiscontinuityTypes(host, viz);
    case 'small-orders':        return renderSmallOrders(host, viz);
    case 'e-limit':             return renderELimit(host, viz);
    default:
      host.innerHTML = `<div class="text-muted text-sm">(视觉：${viz.type})</div>`;
  }
}
