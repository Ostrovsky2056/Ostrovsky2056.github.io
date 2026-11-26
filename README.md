# AI Creation Lab

**English** · [简体中文](README.zh-CN.md)

Ostrovsky2056’s lab for AI artwork, open-source browser tools, and notes on how they were made. [Visit the lab](https://ostrovsky2056.github.io/)

## Projects

- **Screenshot Redactor** automatically detects avatars, nicknames, and sensitive text in your browser with no uploads. Replace speaker avatars in messages and matched quotes, then copy or export the redacted image. [Open tool](https://ostrovsky2056.github.io/screenshot-redactor/) · [Try an example](https://ostrovsky2056.github.io/screenshot-redactor/?example=chat) · [Project overview and source](https://github.com/Ostrovsky2056/screenshot-redactor)
- **Orbit Study** uses Canvas to animate three orbits around a central core. Move your pointer to change the viewing angle. [Explore the orbits](https://ostrovsky2056.github.io/#orbit-study) · [Source code](assets/orbit-study.js)

## Local preview

Keep the `screenshot-redactor` checkout beside this repository. Run `python3 scripts/preview.py` and open `http://127.0.0.1:8785/`. This serves the lab and the editor from the same origin so you can drop a screenshot on the homepage and scan it in the editor.

## Site structure

| Path | Contents |
| --- | --- |
| `/` | Screenshot workbench, a three-stage example, tool index, and the interactive orbit study |
| `/experiments/` | Tools and artwork with results, browser demos, and source code |
| `/notes/` | Practical guides, sample outputs, and making notes |
| `/about/` | Local processing and site source |
| `/404.html` | Custom GitHub Pages error page |

## Add a project or note

- Add project cards to `experiment-gallery` in `experiments/index.html`. Use an actual project preview. Link directly to the project or add a detail page at `experiments/project-name/index.html`.
- Add short guides to `notes/index.html` and use `notes/note-name/index.html` for longer notes. Link to the related project and include any sample needed to follow the guide.

```html
<article class="project-card" id="project-name" aria-labelledby="project-name-title">
  <div class="project-details">
    <h2 id="project-name-title" lang="en" data-zh-cn="中文标题">Project title</h2>
    <p class="project-description" lang="en" data-zh-cn="用一句话介绍项目。">A short project description.</p>
    <div class="page-actions">
      <a class="button" href="https://example.org/" data-zh-cn="在线使用">Use in browser</a>
      <a class="text-link" href="https://github.com/your-account/your-project"
         data-zh-cn="源码与说明">Code and README</a>
    </div>
  </div>
  <img class="project-cover" src="/assets/project-preview.webp" width="640" height="400"
    alt="A description of the preview" data-zh-cn-alt="预览图说明">
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
