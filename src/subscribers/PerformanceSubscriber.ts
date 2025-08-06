import { RenderEventSubscriber } from '../interfaces/RenderEventSubscriber';
import { RenderContext } from '../interfaces/RenderContext';

export class PerformanceSubscriber implements RenderEventSubscriber {
  private totalTime = 0;

  update(context: RenderContext): void {
    if (context.renderTime) {
      this.totalTime += context.renderTime || 0;
    }
  }

  info(): void {
    console.log(`[Performance] Total render time: ${this.totalTime.toFixed(3)}ms`);
  }
}