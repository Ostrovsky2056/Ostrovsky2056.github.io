# Open Projects · 开源项目

[在线项目目录](https://ostrovsky2056.github.io/)

用静态 HTML、CSS 和 JavaScript 搭建的开源项目主页。

## 本地预览

在仓库根目录运行 `python3 -m http.server 8000`，然后打开 `http://localhost:8000`。

## 更新项目目录

在 `index.html` 的项目目录中新增项目卡片。项目发布后，把对应卡片的筹备状态改为「在线使用」和「查看源码」链接。项目可以在独立仓库中启用 GitHub Pages。

英文放在 HTML 标签内，简体中文放在同一标签的 `data-zh-cn` 属性中。标题、无障碍标签和页面简介也应提供两种语言。相应属性为 `data-zh-cn`、`data-zh-cn-aria-label` 和 `data-zh-cn-content`。

本站从 `main` 分支的根目录发布。提交推送后，GitHub Pages 会自动部署。
