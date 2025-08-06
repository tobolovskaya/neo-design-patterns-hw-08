import { RenderEventSubscriber } from '../interfaces/RenderEventSubscriber';
import { RenderContext } from '../interfaces/RenderContext';

export class SummaryCollector implements RenderEventSubscriber {
  private types: Record<RenderContext['type'], number> = {
    Section: 0,
    Paragraph: 0,
    List: 0,
  };

  update(context: RenderContext): void {
    if (Object.keys(this.types).includes(context.type)) {
      this.types[context.type]++;
    }
  }

  info(): void {
    const { Section, Paragraph, List } = this.types;
    console.log(`[Summary] Rendered ${Section} sections, ${Paragraph} paragraphs, ${List} lists`);
  }
}