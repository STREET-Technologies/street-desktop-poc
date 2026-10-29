import { cp, mkdir } from 'node:fs/promises';

// Publish only the browser app. Development tools and research notes stay out.
const output = new URL('./dist/', import.meta.url);
await mkdir(output, { recursive: true });
for (const file of ['index.html', 'style.css', 'app.js', 'model.mjs', 'assets']) {
  await cp(new URL(file, import.meta.url), new URL(file, output), { recursive: true });
}
console.log('Static discussion prototype built in dist/');
