export function getFavicon(linkString: string): string {
  const url = new URL(linkString);
  return `${url.protocol}//${url.host}/favicon.ico`;
}
