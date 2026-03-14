import { readFileSync, writeFileSync } from 'fs';

const filePath = '/mnt/c/Users/liyif/source/repos/blog_final/src/lib/hono/routes.ts';
const content = readFileSync(filePath, 'utf-8');

const oldText = `// Router 之前的防护
app.all("*", shieldMiddleware);`;

const newText = `// Static assets route (must be before shieldMiddleware)
app.get("/assets/*", async (c) => {
  if (c.env.ASSETS) {
    try {
      const asset = await c.env.ASSETS.fetch(new URL(c.req.url));
      if (asset.status === 200) {
        return asset;
      }
    } catch (e) {
      console.error('Asset fetch error:', e);
    }
  }
  return handler.fetch(c.req.raw, {
    context: {
      env: c.env,
      executionCtx: c.executionCtx,
    },
  });
});

// Router 之前的防护
app.all("*", shieldMiddleware);`;

if (content.includes(oldText)) {
  const newContent = content.replace(oldText, newText);
  writeFileSync(filePath, newContent);
  console.log('Success');
} else {
  console.log('Pattern not found');
}
