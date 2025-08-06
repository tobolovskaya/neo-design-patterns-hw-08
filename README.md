# Document Generation CLI Utility (HW7)

Цей проєкт демонструє створення системи генерації документів із використанням патернів **Composite** та **Bridge**.

## Структура проекту

```
src/
├── interfaces/
│   ├── DocNode.ts        # Інтерфейс для елементів документа (Composite)
│   └── DocRenderer.ts    # Інтерфейс для рендерерів (Bridge)
├── renderers/
│   ├── BaseRenderer.ts   # Абстрактний базовий клас рендерерів
│   ├── HTMLRenderer.ts   # Реалізація DocRenderer для HTML
│   ├── MarkdownRenderer.ts # Реалізація DocRenderer для Markdown
│   └── PlainTextRenderer.ts # Реалізація DocRenderer для plain text
├── nodes/
│   ├── Paragraph.ts      # DocNode: параграф (делегує форматування Bridge)
│   ├── List.ts           # DocNode: список з елементів
│   └── Section.ts        # DocNode-Composite: секція з дочірніми DocNode
├── factories/
│   └── RendererFactory.ts # Фабрика для вибору DocRenderer (Bridge)
└── main.ts               # CLI: створення документа та вивід файлу або в консоль

.gitignore
package.json
tsconfig.json
```

## Використані патерни

* **Composite**: клас `Section` реалізує `DocNode` та містить список дочірніх `DocNode`, формуючи дерево елементів документа.
* **Bridge**: інтерфейс `DocRenderer` абстрагує форматування; конкретні рендерери (`HTMLRenderer`, `MarkdownRenderer`, `PlainTextRenderer`) реалізують інтерфейс незалежно від структури документа.

## Приклад запуску

```bash
# Генерація Markdown та вивід у файл output.md
npx ts-node src/main.ts markdown output.md

# Генерація HTML та вивід у консоль
npx ts-node src/main.ts html
```
## Встановлення
```bash
npm install
```

## Використання

### Запуск з виводом в консоль
```bash
npm start -- markdown  # Markdown формат
npm start -- plain    # Простий текст
npm start -- html     # HTML формат
```

### Збереження у файл
```bash
npm start -- html output.html     # Зберегти як HTML
npm start -- markdown output.md   # Зберегти як Markdown
npm start -- plain output.txt     # Зберегти як текст
```

## Приклад виводу

### Markdown (output.md)

```markdown
# Структурні патерни

## Основні патерни

Розглянемо два важливих структурних патернів.

## Composite

Дозволяє створювати деревоподібні структури об'єктів.

- Спрощує структуру
- Гнучкий код
- Легка підтримка

## Bridge

Розділяє абстракцію та реалізацію.

- Незалежні зміни
- Краща масштабованість
```

### HTML

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <h1>Структурні патерни</h1>
  <h2>Основні патерни</h2>
  <p>Розглянемо два важливих структурних патернів.</p>
  <h2>Composite</h2>
  <p>Дозволяє створювати деревоподібні структури об&#039;єктів.</p>
  <ul>
    <li>Спрощує структуру</li>
    <li>Гнучкий код</li>
    <li>Легка підтримка</li>
  </ul>
  <h2>Bridge</h2>
  <p>Розділяє абстракцію та реалізацію.</p>
  <ul>
    <li>Незалежні зміни</li>
    <li>Краща масштабованість</li>
  </ul>
</body>
</html>
```

## Пояснення застосування патернів

* **Composite** у `Section.ts`: секція є контейнером (`Composite`), яка може містити інші елементи (`Leaf` — `Paragraph`, `List`) та інші секції.
* **Bridge** через `DocRenderer` та `RendererFactory`: розділення абстракції документа й конкретної реалізації форматування (Markdown, HTML, Text).

---

© 2025 Design Patterns 
