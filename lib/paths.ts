/** Prefix public assets for a GitHub Pages project site; leave external links alone. */
export function asset(path:string):string {
  return path.startsWith('/') && !path.startsWith('//')
    ? (process.env.NEXT_PUBLIC_BASE_PATH || '') + path
    : path;
}
