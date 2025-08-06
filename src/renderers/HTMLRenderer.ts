import { BaseRenderer } from './BaseRenderer';

export class HTMLRenderer extends BaseRenderer {
  renderHeader(level: number, text: string): string {
    const headingLevel = level > 0 && level < 7 ? level : 1;
    return `
\t\t<h${headingLevel}>${this.escape(text)}</h${headingLevel}>`;
  }

  renderParagraph(text: string): string {
    return `
\t\t<p>${this.escape(text)}</p>`;
  }

  renderList(items: string[]): string {
    const listItems = items.map(item => `\t\t\t<li>${this.escape(item)}</li>`).join('\n');
    return `
\t\t<ul>
${listItems}
    </ul>`;
  }

  wrapDocument(content: string): string {
    return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Document</title>
    ${this.renderStyles()}
  </head>
  <body>
    ${content}
  </body>
</html>`;
  }

  private renderStyles() {
    return `<style>
      body {
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        line-height: 1.6;
      }
    
      h2 {
        color: #2c3e50;
        margin-top: 2em;
      }
    
      ul {
        list-style-type: disc;
        padding-left: 2em;
      }
    </style>`;
  }
}