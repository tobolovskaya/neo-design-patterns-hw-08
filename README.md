**Document Generator with Observer** — консольна утіли́та для побудови документів у різних форматах (Markdown, HTML, plain text) з логуванням та статистикою процесу рендерингу через патерн Observer.

# Document Generation CLI Utility (HW8)

## Структура проекту

```
src/
├── main.ts                        # Точка входу CLI
├── RenderEventPublisher.ts       # Статичний видавець подій для Observer
├── interfaces/
│   ├── DocNode.ts                # Інтерфейс елементів документа (Composite)
│   ├── DocRenderer.ts            # Інтерфейс рендерерів (Bridge)
│   ├── RenderContext.ts          # Контекст подій рендерингу
│   └── RenderEventSubscriber.ts  # Інтерфейс підписника для Observer
├── subscribers/
│   ├── RenderLoggerSubscriber.ts # Логування кожного рендеру
│   ├── SummaryCollector.ts       # Підрахунок і вивід підсумків
│   └── PerformanceSubscriber.ts  # Підрахунок загального часу рендерингу
├── nodes/
│   ├── Paragraph.ts              # Простий вузол: параграф
│   ├── List.ts                   # Простий вузол: список
│   └── Section.ts                # Контейнер: секція (Composite)
├── factories/
│   └── RendererFactory.ts        # Фабрика вибору рендерера (Bridge)
└── renderers/
    ├── BaseRenderer.ts           # Базовий клас рендерерів
    ├── MarkdownRenderer.ts       # Реалізація Markdown
    ├── HTMLRenderer.ts           # Реалізація HTML
    └── PlainTextRenderer.ts      # Реалізація plain text

.gitignore
package.json
tsconfig.json
```

## Використані патерни

* **Composite** (в `Section.ts`): секція як контейнер, що може містити інші `DocNode`-вузли.
* **Bridge** (через `DocRenderer`): розділення структури документа і форматування виводу.
* **Observer** (новий реактивний шар): через `RenderEventPublisher` та підписників спостерігаємо за рендерингом.

## Як реалізовано Observer

1. **RenderEventPublisher** — статичний клас, що зберігає масив `RenderEventSubscriber`, методи:

   ```ts
   static subscribe(sub: RenderEventSubscriber): void;
   static unsubscribe(sub: RenderEventSubscriber): void;
   static notify(ctx: RenderContext): void;
   ```
2. **RenderContext** — об’єкт події: тип вузла (`'Section' | 'Paragraph' | 'List'`), контент, рівень, масив `items`, час рендерингу.
3. **RenderEventSubscriber** — інтерфейс з методом `update(context: RenderContext)`: реалізують:

   * `RenderLoggerSubscriber` — виводить `[Log] Rendered ...`;
   * `SummaryCollector` — підраховує і виводить підсумок по закінченні;
   * `PerformanceSubscriber` — акумулює і виводить загальний час.
4. Кожен `DocNode` (Paragraph, List, Section) у методі `render()` після формування рядка вимірює час та викликає:

   ```ts
   RenderEventPublisher.notify({ type, content, level, items, renderTime });
   ```

## Приклад запуску

```bash
# Markdown у файл
npx ts-node src/main.ts markdown output.md

# HTML у консоль
npx ts-node src/main.ts html
```

## Приклад виводу

```
# Структурні патерни
...
[Log] Rendered Paragraph (44 chars)
[Log] Rendered List (3 items)
[Log] Rendered Section ("Composite", level 2)
...
[Summary] Rendered 4 sections, 3 paragraphs, 2 lists
[Performance] Total render time: 5ms
```

## Створення нового підписника

1. Створіть клас у `subscribers/`, що реалізує `RenderEventSubscriber`:

   ```ts
   export class CustomSubscriber implements RenderEventSubscriber {
     update(ctx: RenderContext): void {
       console.log(`[Custom] ${ctx.type} rendered.`);
     }
   }
   ```
2. Підпишіть у `main.ts` перед генерацією:

   ```ts
   RenderEventPublisher.subscribe(new CustomSubscriber());
   ```

---

© 2025 Design Patterns 