/**
 * Smart template engine for Ravomix document generation.
 * 
 * Features:
 * - Skips lines with only empty placeholders
 * - Handles conditional date ranges (from/to)
 * - Dynamic subject lines
 * - Locale-aware date formatting
 */

import { type LangCode, formatDateByLang } from '@/data/languages';

/**
 * Fill template placeholders with data values.
 * - {{key}} and [key] patterns are replaced
 * - Date keys are formatted by language
 * - Lines that contain ONLY empty placeholders are removed
 * - Handles "from {{fromDate}} to {{toDate}}" gracefully when dates are missing
 */
export function fillTemplate(template: string, data: Record<string, string>, lang: LangCode = 'en-US'): string {
  // First pass: replace placeholders
  let result = template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const val = data[key]?.trim() || '';
    if (key.toLowerCase().includes('date') && val) return formatDateByLang(val, lang);
    return val;
  });

  result = result.replace(/\[(\w+)\]/g, (match, key) => {
    if (data[key] !== undefined) {
      const val = data[key]?.trim() || '';
      if (key.toLowerCase().includes('date') && val) return formatDateByLang(val, lang);
      return val;
    }
    return match;
  });

  // Fix broken "from  to ." pattern — when both dates are empty
  result = result.replace(/from\s+to\s*\./gi, 'due to the following reason.');
  // Fix "from [date] to ." or "from  to [date]."
  result = result.replace(/from\s+to\s+(\S)/gi, 'due to the following reason. $1');

  // Remove lines that are completely empty after placeholder replacement (just whitespace/punctuation)
  const lines = result.split('\n');
  const cleaned = lines.filter(line => {
    const trimmed = line.trim();
    // Keep empty lines (paragraph breaks)
    if (trimmed === '') return true;
    // Remove lines that are just "- Label: " with no value (list items with empty values)
    if (/^-\s+[^:]+:\s*$/.test(trimmed)) return false;
    // Remove lines like "Roll No: " or "Section: " with no value
    if (/^[A-Za-z\s\/]+:\s*$/.test(trimmed)) return false;
    return true;
  });

  // Collapse 3+ consecutive blank lines into 2
  let blankCount = 0;
  const final: string[] = [];
  for (const line of cleaned) {
    if (line.trim() === '') {
      blankCount++;
      if (blankCount <= 2) final.push(line);
    } else {
      blankCount = 0;
      final.push(line);
    }
  }

  return final.join('\n').trim();
}

/**
 * Build a dynamic subject line.
 * If data contains a 'reason' or 'description' or 'issue' field, append it to the title.
 * Otherwise use the title as-is.
 */
export function buildDynamicSubject(title: string, data: Record<string, string>): string {
  // Try to find a reason/issue field for dynamic subject
  const reason = data.reason?.trim() || data.description?.trim() || data.issue?.trim() || data.purpose?.trim() || '';
  
  if (!reason) return title;

  // Truncate long reasons for subject line (max ~60 chars)
  const short = reason.length > 60 ? reason.substring(0, 57) + '...' : reason;

  // Check if title already contains common patterns
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('complaint')) {
    return `Complaint Regarding ${short}`;
  }
  if (lowerTitle.includes('leave')) {
    return `Leave Application for ${short}`;
  }
  if (lowerTitle.includes('certificate')) {
    return `${title} for ${short}`;
  }
  if (lowerTitle.includes('application')) {
    return `${title} for ${short}`;
  }
  
  return `${title} — ${short}`;
}

/**
 * Format date for display using locale-aware formatting.
 * Re-exported for convenience.
 */
export { formatDateByLang };
