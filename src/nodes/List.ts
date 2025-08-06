import { performance } from 'perf_hooks';
import { DocNode } from '../interfaces/DocNode';
import { DocRenderer } from '../interfaces/DocRenderer';
import { RenderEventPublisher } from '../RenderEventPublisher';
import { RenderContext } from '../interfaces/RenderContext';

export class List implements DocNode {
  constructor(
    private items: string[],
    private renderer: DocRenderer
  ) {}
  render(): string {
    const start = performance.now();
    const result = this.renderer.renderList(this.items);
    const context: RenderContext = {
      type: 'List',
      content: result,
      items: this.items,
      renderTime: performance.now() - start,
    };
    RenderEventPublisher.notify(context);
    return result;
  }
}