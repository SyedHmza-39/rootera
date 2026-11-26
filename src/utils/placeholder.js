/** True for empty values and for config values ending in _PLACEHOLDER. */
export function isPlaceholder(value) {
  return !value || /_PLACEHOLDER$/.test(value)
}