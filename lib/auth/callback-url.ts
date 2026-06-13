export function getSafeCallbackUrl(value?: string) {
  return value?.startsWith('/') && !value.startsWith('//') ? value : '/admin';
}
