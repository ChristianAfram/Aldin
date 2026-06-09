import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'

/**
 * Renders Markdown to HTML and sanitizes the result so admin-authored
 * content can never inject scripts or event handlers (stored XSS).
 */
export function renderMarkdown(markdown: string): string {
  const html = String(marked.parse(markdown || ''))
  return sanitizeHtml(html, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img'],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'title', 'width', 'height'],
      a: ['href', 'name', 'target', 'rel'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }),
    },
  })
}
