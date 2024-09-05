// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'gglas.ninja';
export const SITE_DESCRIPTION = 'The personal blog of Gordon Glas';
export const MAX_POSTS_INDEX = 8;
export const MAX_POSTS_RSS  = 50;

export const appSettings = {
  formatTitle: function(pageTitle: string): string {
    return pageTitle + " - " + SITE_TITLE;
  }
};
