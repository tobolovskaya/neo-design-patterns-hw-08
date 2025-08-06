import { performance } from 'perf_hooks';
import { DocNode } from '../interfaces/DocNode';
import { DocRenderer } from '../interfaces/DocRenderer';
import { RenderEventPublisher } from '../RenderEventPublisher';
import { RenderContext } from '../interfaces/RenderContext';


export class Section implements DocNode {
  constructor(
    private title: string,
    private renderer: DocRenderer,
    private children: DocNode[] = [],
    private level: number = 1
  ) {}

  add(child: DocNode): void {
    this.children.push(child);
  }

  render(): string {
    const start = performance.now();
    const heading = this.renderer.renderHeader(this.level, this.title);
    let content = '';
    for (const child of this.children) {
      content += '\n' + child.render();
    }
    const result = `${heading}${content}`;
    const context: RenderContext = {
      type: 'Section',
      content: this.title,
      level: this.level,
      renderTime: performance.now() - start,
    };
    RenderEventPublisher.notify(context);
    return result;
  }
}