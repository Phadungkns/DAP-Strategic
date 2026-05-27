import React from 'react';

interface LinkifyTextProps {
  text: string;
  className?: string;
}

const URL_REGEX = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;

/**
 * Renders text with any URLs automatically converted to clickable links.
 * Supports whitespace-pre-line behaviour (newlines preserved).
 */
export function LinkifyText({ text, className }: LinkifyTextProps) {
  const parts = text.split(URL_REGEX);

  return (
    <span className={className} style={{ whiteSpace: 'pre-line' }}>
      {parts.map((part, i) => {
        if (URL_REGEX.test(part)) {
          const href = part.startsWith('www.') ? `https://${part}` : part;
          return (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 hover:underline break-all transition-colors"
            >
              {part}
            </a>
          );
        }
        return part;
      })}
    </span>
  );
}

/**
 * Converts plain text with URLs into HTML string (for use with dangerouslySetInnerHTML).
 * Escapes HTML entities first to prevent XSS, then linkifies URLs.
 */
export function linkifyToHtml(text: string): string {
  // Escape HTML entities first
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  // Then replace URLs with anchor tags
  return escaped.replace(URL_REGEX, (url) => {
    const href = url.startsWith('www.') ? `https://${url}` : url;
    return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-700 hover:underline break-all transition-colors">${url}</a>`;
  });
}
