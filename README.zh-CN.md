# AI 创作实验室

[English](README.md) · **简体中文**

Ostrovsky2056 的个人实验室，用来发布 AI 作品、开源浏览器工具和制作记录。[访问实验室](https://ostrovsky2056.github.io/)

## 项目

- **截图脱敏** 在浏览器本地自动识别头像、昵称和敏感文字，无需上传。支持替换发言人头像并同步到已匹配的引用，核对后可复制脱敏图或导出 PNG。[打开工具](https://ostrovsky2056.github.io/screenshot-redactor/) · [试用示例](https://ostrovsky2056.github.io/screenshot-redactor/?example=chat) · [项目介绍与源码](https://github.com/Ostrovsky2056/screenshot-redactor)
- **轨道实验** 用 Canvas 绘制围绕核心转动的三条轨道，移动指针可改变视角。[体验轨道实验](https://ostrovsky2056.github.io/#orbit-study) · [查看源码](assets/orbit-study.js)

## 本地预览

将 `screenshot-redactor` 仓库与本站仓库放在同一目录下。在本站运行 `python3 scripts/preview.py`，打开 `http://127.0.0.1:8785/`。预览将首页和脱敏工具放在同一站点，支持在首页拖入截图并自动进入工具识别。

## 站点结构

| 路径 | 内容 |
| --- | --- |
| `/` | 截图工作台、三步脱敏示例、工具索引和互动轨道作品 |
| `/experiments/` | 工具与作品的预览、在线体验和源码 |
| `/notes/` | 使用指南、示例结果和制作记录 |
| `/about/` | 本地处理说明和站点源码 |
| `/404.html` | GitHub Pages 的自定义错误页 |

## 发布项目或记录

- 在 `experiments/index.html` 的 `experiment-gallery` 中添加项目卡，配上实际预览。可以直接链接到独立站点，也可以在 `experiments/项目名/index.html` 添加详情页。
- 简短指南可写在 `notes/index.html`，较长的制作记录放在 `notes/记录名/index.html`。附上相关项目和复现时用到的示例。

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

新详情页可以沿用相应目录页的页眉、页脚和 `main` 结构。用 `page-intro` 和 `page-title` 写标题与简介，用 `content-section` 写正文，用 `page-actions` 放链接。更新页面元数据，移除目录链接上的 `aria-current="page"`，并将新页面加入 `sitemap.xml`。

### 语言

仓库默认的 `README.md` 使用英文，简体中文放在 `README.zh-CN.md`，两份文档的页首互链。

站点用英文作为基础文案，简体中文放在 `data-zh-cn` 中。已经发布的译文链接用 `data-zh-cn-href`，无障碍标签、页面简介和图片替代文本分别用 `data-zh-cn-aria-label`、`data-zh-cn-content` 和 `data-zh-cn-alt`。浏览器语言不受支持或某项缺少翻译时显示英文。项目标题和简介使用 `lang="en"`，以便用英语朗读回退的英文内容。

GitHub Pages 从 `main` 分支根目录自动部署。

## 轨道作品

首页用 Canvas 绘制绕核心运动的三个节点，移动指针可改变视角。安装 ImageMagick 后，运行 `node scripts/render-orbit-study.cjs` 可从同一场景生成静态图。[WebP 静态图](assets/orbit-study.webp)

英文大标题使用 Barlow Condensed Black。[字体许可](assets/barlow-condensed-ofl.txt)
