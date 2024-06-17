// Calculate delay based on overview text
export function calculateDelay(overview_text: string) {
  return 0.1 + 0.3 * (overview_text.length / 200);
}

export function sanitizeMediaId(id: string) {
  return id.split('-')[0];
}
