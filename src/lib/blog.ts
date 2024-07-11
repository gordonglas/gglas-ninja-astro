import MarkdownIt from 'markdown-it';
import { getCollection } from 'astro:content';

export async function getPublishedPostsByDateDesc() {
  const isDev = import.meta.env.DEV;

  const posts = (await getCollection('blog'))
  .filter(
    // only published posts make it to production
    (post) => post.data.published || isDev
  ).sort(
    // newest posts first
    (a, b) => b.data.pubDateString.valueOf() - a.data.pubDateString.valueOf()
  );

  return posts;
}

const stripHtml = (html: string) => {
  return html.replace(/<\/?[^>]+(>|$)/g, '');
};

// Removes leading "import" lines (allowed in mdx).
// Obviously this means our mdx is somewhat limited,
// but this can be adjusted to strip out more, if needed.
// Alternatively, could try: https://stackoverflow.com/a/77537167
const stripMdx = (mdx: string) => {
  if (mdx.trim().startsWith('import ')) {
    return '';
  }
  return mdx;
};

// Modified verison of:
// https://www.paulie.dev/posts/2023/09/how-to-create-excerpts-with-astro/
export function createExcerpt(body: string, maxChars: number) {
  const parser = new MarkdownIt();
  return parser
    .render(body) // render markdown as html (Note: any mdx code still exists after render())
    .split('\n')  // split into array of lines
    .slice(0, 10) // take first 10 lines (might need more if post has lots of leading mdx)
    .map((str: string) => {
      let s = stripHtml(str);
      s = stripMdx(s);
      return s.split('\n'); // return array
    })
    .flat()     // concat arrays
    .join(' ')  // concat into string
    .substring(0, maxChars) // take up to maxChars
    .trim();  // trim whitespace
};
