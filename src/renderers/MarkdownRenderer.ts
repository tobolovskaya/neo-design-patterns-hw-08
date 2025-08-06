import { BaseRenderer } from './BaseRenderer';

export class MarkdownRenderer extends BaseRenderer {
  renderHeader(level: number, text: string): string {
    const headingLevel = level > 0 && level < 7 ? level : 1;
    return `${'#'.repeat(headingLevel)} ${text}\n`;
  }

  renderParagraph(text: string): string {
    return `${text}\n`;
  }

  renderList(items: string[]): string {
    const listItems = items.map(item => `- ${item}`).join('\n');
    return `${listItems}\n`;
  }
}