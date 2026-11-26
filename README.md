# AI Creation Lab

**English** · [简体中文](README.zh-CN.md)

Ostrovsky2056’s lab for AI artwork, open-source browser tools, and notes on how they were made. [Visit the lab](https://ostrovsky2056.github.io/)

## Projects

- **Screenshot Redactor** redacts screenshots in your browser without uploading them. Open a screenshot, review the automatically selected areas, and export a PNG. [Try it](https://ostrovsky2056.github.io/screenshot-redactor/) · [Code and README](https://github.com/Ostrovsky2056/screenshot-redactor)

## Local preview

Run `python3 -m http.server 8000` from the repository root and open `http://127.0.0.1:8000/`.

## Site structure

| Path | Contents |
| --- | --- |
| `/` | Home page and orbital artwork |
| `/experiments/` | Project demos, source code, and related notes |
| `/notes/` | Making notes, newest first |
| `/about/` | Lab introduction and site source |
| `/404.html` | Custom GitHub Pages error page |

## Add a project or note

- List projects in `experiments/index.html`. Link directly to a project’s site or add a detail page at `experiments/project-name/index.html` with an introduction, a demo, and source links.
- Put notes in `notes/note-name/index.html`. Include a title, publication date, and a link to the related project when available. List notes newest first in `notes/index.html`.
- Add published items to the existing `index-list`. Remove the empty state when publishing the first item in that section.

```html
<article class="index-row">
  <h2 lang="en" data-zh-cn="中文标题">Project title</h2>
  <div>
    <p lang="en" data-zh-cn="用一句话介绍项目。">A short project description.</p>
    <div class="page-actions">
      <a class="text-link" href="https://example.org/" data-zh-cn="在线使用">Use in browser</a>
      <a class="text-link" href="https://github.com/your-account/your-project"
         data-zh-cn="源码与说明"
         data-zh-cn-href="https://github.com/your-account/your-project/blob/main/README.zh-CN.md">Code and README</a>
    </div>
  </div>
</article>
```

Copy the nearest index page’s header, footer, and `main` structure for a new detail page. Keep `page-intro` and `page-title`, use `content-section` for the body and `page-actions` for links. Update the metadata, remove the index’s `aria-current="page"` marker, and add the new page to `sitemap.xml`.

### Languages

Write `README.md` in English and put the Simplified Chinese version in `README.zh-CN.md`. Link the two versions near the top of both files.

Start with English in the HTML. Use `data-zh-cn` for Simplified Chinese text and `data-zh-cn-href` for a published translated link. Use `data-zh-cn-aria-label`, `data-zh-cn-content`, and `data-zh-cn-alt` for translated attributes. English is shown when the browser language is unsupported or a field has no translation. Add `lang="en"` to project titles and descriptions so assistive technology reads the fallback as English.

GitHub Pages deploys from the root of the `main` branch.

## Orbital artwork

The Canvas artwork animates three nodes around a central core. Moving the pointer across the artwork changes the viewing angle. With ImageMagick installed, run `node scripts/render-orbit-study.cjs` to render the static preview from the same scene. [Static WebP](assets/orbit-study.webp)

The English display type uses Barlow Condensed Black. [Font license](assets/barlow-condensed-ofl.txt)
