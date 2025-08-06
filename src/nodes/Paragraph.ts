import { performance } from 'perf_hooks';
import { DocNode } from '../interfaces/DocNode';
import { DocRenderer } from '../interfaces/DocRenderer';
import { RenderEventPublisher } from '../RenderEventPublisher';
import { RenderContext } from '../interfaces/RenderContext';

export class Paragraph implements DocNode {
  constructor(
    private text: string,
    private renderer: DocRenderer
  ) {}
  render(): string {
    const start = performance.now();
    const result = this.renderer.renderParagraph(this.text);
    const context: RenderContext = {
      type: 'Paragraph',
      content: this.text,
      renderTime: performance.now() - start,
    };
    RenderEventPublisher.notify(context);
    return result;
  }
}