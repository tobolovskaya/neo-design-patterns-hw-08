import { BaseRenderer } from './BaseRenderer';

export class PlainTextRenderer extends BaseRenderer {
  renderHeader(level: number, text: string): string {
    const pattern = level === 1 ? '=' : '-';
    return `${text.toUpperCase()}\n${pattern.repeat(text.length)}\n`;
  }

  renderParagraph(text: string): string {
    return `${text}\n`;
  }

  renderList(items: string[]): string {
    const listItems = items.map(item => `- ${item}`).join('\n');
    return `${listItems}\n`;
  }

  wrapDocument(content: string): string {
    return content;
  }
}