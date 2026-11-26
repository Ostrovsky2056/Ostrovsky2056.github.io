# AI Creation Lab

**English** · [简体中文](README.zh-CN.md)

Ostrovsky2056’s lab for AI artwork, open-source browser tools, and notes on how they were made. [Visit the lab](https://ostrovsky2056.github.io/)

## Projects

- **Screenshot Redactor** automatically detects avatars, nicknames, and sensitive text in your browser with no uploads. Replace speaker avatars in messages and matched quotes, then copy or export the redacted image. [Open tool](https://ostrovsky2056.github.io/screenshot-redactor/) · [Try an example](https://ostrovsky2056.github.io/screenshot-redactor/?example=chat) · [Project overview and source](https://github.com/Ostrovsky2056/screenshot-redactor)
- **Orbit Study** uses Canvas to animate three orbits around a central core. Move your pointer to change the viewing angle. [Explore the orbits](https://ostrovsky2056.github.io/#orbit-study) · [Source code](assets/orbit-study.js)

## Local preview

Run `python3 -m http.server 8000` from the repository root and open `http://127.0.0.1:8000/`.

## Site structure

| Path | Contents |
| --- | --- |
| `/` | Featured tool, a before-and-after example, and the interactive orbit study |
| `/experiments/` | Project previews, browser demos, and source code |
| `/notes/` | Making notes, newest first |
| `/about/` | Lab introduction and site source |
| `/404.html` | Custom GitHub Pages error page |

## Add a project or note

- Add project cards to `experiment-gallery` in `experiments/index.html`. Use an actual project preview. Link directly to the project or add a detail page at `experiments/project-name/index.html`.
- Put notes in `notes/note-name/index.html`. Include a title, publication date, and a link to the related project when available. List notes newest first in `index-list` in `notes/index.html`.

```html
<article class="project-card" id="project-name" aria-labelledby="project-name-title">
  <header class="project-heading">
    <h2 id="project-name-title" lang="en" data-zh-cn="中文标题">Project title</h2>
    <a class="button" href="https://example.org/" data-zh-cn="在线使用">Use in browser</a>
  </header>
  <img class="project-cover" src="/assets/project-preview.webp" width="640" height="360"
    alt="A description of the preview" data-zh-cn-alt="预览图说明">
  <div class="project-details">
    <p class="project-description" lang="en" data-zh-cn="用一句话介绍项目。">A short project description.</p>
    <div class="page-actions">
      <a class="text-link" href="https://github.com/your-account/your-project"
         data-zh-cn="源码与说明">Code and README</a>
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
