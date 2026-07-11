/**
 * Sanitizes rich HTML content by stripping hazardous tags and attributes.
 * Useful for blog and program content editing.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return "";

  let clean = html;

  // 1. Remove script tags and their content
  clean = clean.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "");

  // 2. Remove event handlers like onload, onerror, onclick, etc.
  clean = clean.replace(/\s+on\w+\s*=\s*(['"][^'"]*['"]|[^\s>]+)/gi, "");

  // 3. Remove javascript: pseudo-protocol links
  clean = clean.replace(/href\s*=\s*['"]javascript:[^'"]*['"]/gi, 'href="#"');

  // 4. Remove iframe, object, embed, frame, frameset tags
  clean = clean.replace(/<(iframe|object|embed|frame|frameset)[^>]*>([\s\S]*?)<\/\1>/gi, "");
  clean = clean.replace(/<(iframe|object|embed|frame|frameset)[^>]*\/>/gi, "");

  // 5. Remove meta and link tags
  clean = clean.replace(/<(meta|link)[^>]*>/gi, "");

  return clean;
}

/**
 * Sanitizes simple text inputs by stripping all HTML tags.
 * Useful for public endpoints like appointments and grievances.
 */
export function sanitizeText(text: string): string {
  if (!text) return "";
  // Strip simple HTML tags to protect plain-text inputs
  return text.replace(/<[^>]*>/g, "");
}
