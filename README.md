# AI Creation Lab · AI 创作实验室

[站点地址](https://ostrovsky2056.github.io/)

Ostrovsky2056 的个人实验室，记录 AI 作品、浏览器实验和制作过程。

## 本地预览

在仓库根目录运行 `python3 -m http.server 8000`，然后打开 `http://localhost:8000`。

## 站点结构

| 路径 | 内容 |
| --- | --- |
| `/` | 首页与首屏作品 |
| `/experiments/` | 实验目录，汇集在线体验、制作记录和源码 |
| `/notes/` | 制作记录，按发布时间倒序排列 |
| `/about/` | 实验室简介和站点源码 |
| `/404.html` | GitHub Pages 的自定义错误页 |

## 发布作品或记录

- 有独立站点的实验可从 `experiments/index.html` 直接链接过去，附上已公开的制作记录和源码。需要本站详情页时，在 `experiments/项目名/index.html` 写作品简介、体验入口和源码链接。
- 在 `notes/记录名/index.html` 写制作记录。详情页包含标题、发布日、正文，以及相关实验的链接（如有）。从 `notes/index.html` 按最新在前的顺序链接过去。
- 首次发布时，把相应目录内的空状态换成下面的条目。后续在同一个 `index-list` 中添加条目。只列出已经可访问的链接。若标题已直接链接到独立站点，可以省去在线体验链接。

```html
<article class="index-row">
  <h2><a href="/experiments/your-experiment/" data-zh-cn="中文标题">Experiment title</a></h2>
  <div>
    <p data-zh-cn="用一句话说明这个实验。">A short description of the experiment.</p>
    <div class="page-actions">
      <a class="text-link" href="https://example.org/" data-zh-cn="在线体验">Try it</a>
      <a class="text-link" href="/notes/your-note/" data-zh-cn="制作记录">Making notes</a>
      <a class="text-link" href="https://github.com/your-account/your-project" data-zh-cn="源码">Source code</a>
    </div>
  </div>
</article>
```

新详情页可复制对应目录页的页眉、页脚和 `<main>`。保留 `page-intro` 和 `page-title`，用 `content-section` 写正文，用 `page-actions` 放体验与源码链接。更新页面标题、简介，移除目录链接上的 `aria-current="page"`，并把新地址加入 `sitemap.xml`。

英文放在 HTML 标签内，简体中文放在同一标签的 `data-zh-cn` 属性中。无障碍标签、页面简介和图片替代文本分别用 `data-zh-cn-aria-label`、`data-zh-cn-content` 和 `data-zh-cn-alt` 翻译。

本站从 `main` 分支的根目录发布。提交推送后，GitHub Pages 会自动部署。

## 首屏作品

《轨道实验》用 Canvas 绘制围绕核心运动的三个节点。指针在画面内移动时会改变视角。安装 ImageMagick 后，可运行 `node scripts/render-orbit-study.cjs`，用同一份场景重新生成 [WebP 静态图](assets/orbit-study.webp)。

英文标题使用 Barlow Condensed Black。 [字体许可](assets/barlow-condensed-ofl.txt)
