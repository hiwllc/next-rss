# RSS
> RSS for markdown base blog.

A simple package for create RSS to a markdown based blog.

## How to use

Import the lib:

```typescript
import { generateRSS } from '@uselessdev/rss'
// or you can use const { generateRSS } = require('@uselessdev/rss')
```

```typescript
generateRSS({
  title: 'Your website title',
  description: 'Your website description',
  siteLanguage: 'en',
  siteUrl: 'https://your-site-url.com',
  destinationFolder: 'public',
  itemsFolder: 'content/posts',
})
```
