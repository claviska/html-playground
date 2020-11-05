# HTML Playground

A playground for your custom elements.

🚧 This package is an experimental work in progress!

## Usage

```html
<!-- Import the component -->
<script type="module" src="https://www.jsdelivr.com/package/npm/html-playground/dist/esm/index.js"></script>

<!-- Add a playground to your page -->
<html-playground></html-playground>

<!-- Give it a template and define some controls -->
<script>
  const playground = document.querySelector('html-playground');

  // Create controls that will act as a context for your template
  playground.controls = [
    { name: 'label', type: 'text', value: 'Click me' },
    { name: 'textColor', type: 'color', value: '#fff' },
    { name: 'backgroundColor', type: 'color', value: '#08c' },
    { name: 'padding', type: 'range', value: '.5', min: 0, max: 1, step: 0.25 },
    { name: 'disabled', type: 'boolean', value: false }
  ];

  // Access the context using whiskers syntax: https://github.com/gsf/whiskers.js/#usage
  playground.template = `
    <button 
      type="button"
      style="
        color: {textColor};
        background-color: {backgroundColor};
        padding: {padding}rem;
      "
      {if disabled}disabled{/if}
    >
      {label}
    </button>
  `;
</script>
```

## Developing

To run the project in dev/watch mode:

```bash
npm start
```

To build the project:

```bash
npm run build
```
