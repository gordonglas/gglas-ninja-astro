---
title: Site now uses Astro
description: Site now uses Astro
slug: 2024/09/site-now-uses-astro
pubDate: 2024/09/02
tags:
  - Web
  - Dev
published: true
---

It seems that only yesterday, I had [converted my sites to use gatsby](https://gglas.ninja/blog/2022/07/site-now-uses-gatsby/). The workflow I've had since allows me to use [Obsidian](https://obsidian.md/) to write posts in markdown and run a script to build and publish to the server. It really doesn't get much easier.

Except that after Netlify acquired gatsby, it all [went downhill from there](https://x.com/wardpeet/status/1693014604694061194). The biggest problem was that all of a sudden, all the nice documentation and tutorials were removed. Maybe they were removed because the people involved in those nice tutorial videos were [laid off](https://x.com/wardpeet/status/1693014604694061194)? Who knows. But at that point, I realized quick that gatsby doesn't have much of a future. Unfortunately, being "open source" doesn't mean diddly squat if the company mantaining it decides not to put much effort into it anymore.

So I looked at the different currently popular static site generator (SSG) frameworks to migrate my sites to, and I decided on [Astro](https://astro.build). These days, JS-based frameworks come and go in such short time that it's impossible to predict if Astro will be around for awhile or not, but big-name companies are using it and developers have a lot of praise for it, so that's what I've decided to use.

## Transition from Gatsby to Astro

The transition was relatively smooth, but not without some headaches...

### Responsive and clickable images

The biggest and most time-consuming issue I had was with getting images within the markdown to be both [responsive](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) with a [srcset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/srcset) and making the image clickable to show it's original size, like gatsby did by default.

There might be some better way that I'm not aware of (maybe configuring some different image processor or something), but I accomplished it by - instead of using the default markdown image syntax, such as...

```
![My image alt text](/images/example.png)
```

...I wrote a custom [Astro component](https://docs.astro.build/en/basics/astro-components/), renamed the markdown file to use an `.mdx` extension, instead of `.md`, installed the [mdx as md obsidian plugin](https://github.com/mkozhukharenko/mdx-as-md-obsidian), then I replace the above markdown image syntax with something like the following:

```
import image_import from '/images/example.png';

<RespImg src={image_import} alt="My image alt text" publicurl="/under-public-folder/example.png" width="1400" />
```

The `RespImg` component creates the outer div and optional anchor tag around the image.  
See source-code for [RespImg](https://github.com/gordonglas/gglas-ninja-astro/blob/main/src/components/RespImg.astro) and [RespImgInternal](https://github.com/gordonglas/gglas-ninja-astro/blob/main/src/components/RespImgInternal.astro). RespImgInternal then uses [Astro's built-in Image component](https://docs.astro.build/en/guides/images/#image--astroassets).

The `publicurl` is the path to the public image, whose URL is guaranteed not to change. In Astro projects, public images go under `/public`. So not only do I need to change the way the image code is specified, but I also have to copy the image to somewhere under the public folder, which kinda stinks.

...But there is a way to get around this, such that I can still use the default markdown image syntax and still have it output the RespImg code. The [Fundamental theorem of software engineering](https://en.wikipedia.org/wiki/Fundamental_theorem_of_software_engineering) says we can just introduce an extra layer to solve this problem. It would mean writing an additional app/script to process the default markdown files - it could do some image processing and copy the largest size to the /public folder, add the import statement, replace the default image syntax with the RespImg component and output the file to the final destination inside the Astro project with a .mdx extension. I haven't done this yet, but it wouldn't be difficult, especially since I already have experience with image processing in my [static photo/video album generator](https://github.com/gordonglas/tellah-photo).

I also have a custom component for embedding video files as well, so the extra layer could be useful for simplfying that as well.

### No built-in excerpt function

On the homepage, I show an excerpt of the blog post under each title. Unfortunately, Astro doesn't have a built-in function to get the excerpt text. It wasn't too difficult to code [my own excerpt function](https://github.com/gordonglas/gglas-ninja-astro/blob/e6f1520bcfd9b074d1844d9b8bfba11a9f890cb6/src/lib/blog.ts#L45), but the addition of the mdx import and component statements made it a little more complex than I thought it would be.

### pubDate javascript format issue

The markdown frontmatter `pubDate` field maps directly to a javascript `date` type in Astro and the problem is that Obsidian's default date format is `YYYY-MM-DD`, [which javascript interprets wrongly](https://stackoverflow.com/questions/7556591/). It took me some time to realize that you can simply change the date format in Obsidian to use something else by setting it in `Settings -> Daily notes -> Date format`. I changed it to `YYYY/MM/DD` and it fixes the off-by-one-day javascript issue. I'm guessing Gatsby interpreted it as a string instead of a date, then detected/converted it to `YYYY/MM/DD` as necessary, but who knows.

## Impression of Astro

Overall I'm happy with using Astro. When I run into a problem, it usually has some setting I can tweak or config I can set to get it working for my use-case. The build is pretty fast. I also like how it's not tied to any single framework... it can use React, Vue, Preact, Svlte, or Solid, etc. Astro's default is very similar to React, which I'm most familiar with, so I just stuck with the default.

Hopefully Astro will last longer than Gatsby, so I won't have to write another one of these "Site is now using {new-popular-framework-here}" posts anytime soon.
