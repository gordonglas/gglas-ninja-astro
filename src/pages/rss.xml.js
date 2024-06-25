import rss from '@astrojs/rss';
import {getPublishedPostsByDateDesc, createExcerpt} from '../lib/blog';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const posts = await getPublishedPostsByDateDesc();
	return rss({
		title: `${SITE_TITLE} - blog`,
		description: SITE_DESCRIPTION,
		site: context.site,
		customData: `<generator>AstroJS</generator>`,
		trailingSlash: false,
		items: posts.map((post) => ({
			...post.data,
			description: `${createExcerpt(post.body, 280)}...`,
			link: `/blog/${post.slug}`,
		})),
	});
}
