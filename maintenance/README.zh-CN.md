# 个人主页维护指南

[English](README.en.md) · [返回仓库说明](../README.md)

网站是纯静态 HTML/CSS/JavaScript，GitHub Pages 直接发布根目录。**日常内容只需修改根目录的 `index.html`，无需安装依赖、运行生成器或编译。** 请不要从历史设计稿重新生成首页，以免覆盖正式内容。

## 1. 文件放哪里

| 路径 | 用途 |
| --- | --- |
| `index.html` | 正式首页：个人信息、简介、研究方向、所有项目/论文、教育与工作经历 |
| `homepage.css` | 首页布局、颜色、字体大小、照片裁切及手机适配 |
| `homepage.js` | 深浅模式切换、流动背景动画、导航高亮 |
| `images/portrait.jpg` | 左侧个人照片 |
| `images/paper/` | Project 和 Publication 的缩略图；两者共用此目录 |
| `images/institution/` | 学校、实验室、公司的 logo |
| `images/logo.jpg` | 浏览器标签页图标 |
| `assets/fonts/` | 本地字体及字体许可文件 |
| `sra/`、`d-opsd/` | 已有独立项目页面，保持各自结构 |
| `maintenance/` | 本指南的中文与英文版 |

旧的 `stylesheet.css` 保留在仓库中，但新版首页使用的是 `homepage.css`。

图片建议用简短的小写英文文件名，例如 `my-project.jpg`，避免空格。GitHub Pages 区分大小写，`My-Project.jpg` 和 `my-project.jpg` 不是同一文件。常用 JPG/PNG/WebP 均可；论文图建议宽约 800–1200 px，并在清晰的前提下压缩到几百 KB。新图片上传后，HTML 中的文件名和后缀必须对应。

## 2. 如何增加 Project

1. 将图片放到 `images/paper/my-project.jpg`。
2. 打开 `index.html`，搜索 `id="projects"`（代表项目）或 `id="other-projects"`（其他项目）。
3. 将下面整个 `<article>...</article>` 插入该 section 内的 `<div class="work-list">`，与现有 article 并列。放在前面就会显示在前面。
4. 修改唯一 ID、图片、标题、作者、简介、所有链接，并更新 section 标题里的数量。

以下是代表项目的完整示例，示例链接需替换为自己的真实地址：

```html
<article class="work-card featured project" id="work-my-project">
  <a class="work-image" href="https://example.com/my-project/"
     aria-label="Open My Project">
    <img src="images/paper/my-project.jpg" alt="My Project overview" loading="lazy">
  </a>
  <div class="work-body">
    <div class="work-kicker">
      <span class="venue">Open-source project</span>
      <span class="featured-label">SELECTED</span>
    </div>
    <h3><a href="https://example.com/my-project/">My Project: Full Title</a></h3>
    <p class="authors">Author One, <strong>Dengyang Jiang</strong>, Author Three</p>
    <p class="description">Write a short description of the project here.</p>
    <div class="resource-links">
      <a href="https://example.com/my-project/">Project page <span aria-hidden="true">↗</span></a>
      <a href="https://github.com/USERNAME/REPOSITORY">Code <span aria-hidden="true">↗</span></a>
    </div>
  </div>
</article>
```

不存在的资源链接直接删去，不要用 `#` 冒充地址。要新增 Paper、Demo、Hugging Face 等按钮，复制一个资源链接 `<a>` 并修改名称与地址。图片和标题通常都链接到项目主页。

**其他项目**使用 `class="work-card standard project"`，去掉 `SELECTED` 的 span，并将简介改为可展开的形式：

```html
<details class="summary">
  <summary>Summary</summary>
  <p class="description">Write the project description here.</p>
</details>
```

## 3. 如何增加 Publication

图片仍放 `images/paper/`。在 `index.html` 搜索 `id="publications"`（代表论文）或 `id="other-publications"`（其他论文），复制同一栏目的一整个 article 修改最方便。

结构与 Project 相同，具体差异如下：

| 内容 | 代表论文写法 |
| --- | --- |
| article 样式 | `class="work-card featured publication"` |
| 唯一标识 | 如 `id="work-my-paper"`，不能与其他条目重复 |
| venue | 如 `CVPR, 2027` 或 `Preprint, 2027`，以实际情况为准 |
| 作者 | 按论文顺序填写，用 `<strong>...</strong>` 高亮本人，等贡献保留 `*` |
| 图片与标题链接 | 通常链接论文或项目页面 |
| 资源链接 | Paper、Code、Project page 等，仅保留真实存在的资源 |

其他论文用 `class="work-card standard publication"`，不显示 SELECTED，并使用上述 `<details>` 收起简介。新建的条目不会自动排序，直接调整 article 在文件中的顺序即可。

## 4. 代表作、排序、数量与删除

- 从「其他」升为代表作：将整个 article 移入相应 Selected 栏目的 work-list，把 `standard` 改为 `featured`，加上 SELECTED 标签，将 details 简介改为普通 description 段落。
- 从代表作降为「其他」：反向操作。请移动而非复制，避免重复作品及重复 ID。
- **数量需手动更新**：例如 `<h2>Selected Publications <span>04</span></h2>` 中的 `04`。新增、移组或删除后，更新所有受影响栏目。
- 删除条目：只删除对应的 `<article>...</article>`。图片若仍被其他页面引用，应保留。
- 当前代表项目为 Z-Image；代表论文依次为 Pixel-Space empirical study、D-OPSD、DMDR、SRA。lbGen 位于 Other Publications。

## 5. 如何增加 Education / Work Experience

教育经历搜索 `id="experience"`，工作经历搜索 `id="work-experience"`。将 logo 放入 `images/institution/`，在相应 section 中复制一个 `experience-item`。以下例子可直接按真实情况修改；最新经历通常放最前面：

```html
<div class="experience-item">
  <img src="images/institution/my-lab.png" alt="My Lab logo" loading="lazy">
  <div>
    <span class="dates">Sep 2027 — Present</span>
    <h3>My University or Company</h3>
    <p>Research Intern · My Team</p>
    <p>Mentored by <a href="https://example.com/">Mentor Name</a>.</p>
  </div>
</div>
```

教育经历的职位行可写 `Ph.D. · Department Name`。没有导师或补充说明时删除最后一段即可；没有 logo 时可删除 img。这里没有数量字段需要更新。

## 6. 修改个人信息、简介、头像和联系方式

- **姓名与单位**：在 `index.html` 的 `PROFILE` 注释下面改 h1、role、affiliation；同时检查 banner 姓名、网页 title、description 元信息和 footer。
- **简介**：搜索 `ABOUT AND RESEARCH INTERESTS`，修改 about-copy 段落。
- **研究方向**：修改 interest-block 中的 `<li>`；一个 li 是一个标签。
- **邮箱**：搜索旧邮箱并更新全部出现位置，包括显示文字、侧边栏、简介和页脚的 `mailto:`。
- **Scholar / GitHub / 小红书**：修改 social-links 内对应 a 的 href。替换为自己的主页时也要检查简介中的链接。
- **个人照片**：用新照片替换 `images/portrait.jpg`，或修改 portrait-link 的 href 和 avatar 的 src 两处。更换照片比例时同步修改 img 的 width/height 属性。当前保留人物上半身与环境，没有放大头部。
- **照片取景**：在 `homepage.css` 搜索 `.portrait-link` 调整外框大小、搜索 `.avatar` 调整 `object-position`。手机样式在 media query 中。不要添加 scale 放大，除非确实希望近景。
- **页脚年份**：在 index.html 的 footer 手动更新。

HTML 中普通文本的 `&` 写为 `&amp;`，`<` 写为 `&lt;`。URL 查询参数中的 `&` 也建议写成 `&amp;`。不要把整个 article 嵌套进另一个 article。

## 7. 调整配色、字体和动画

- `homepage.css` 的 `body` 定义浅色变量，`body.dark` 定义深色变量。背景看 `--bg`，卡片看 `--surface`，正文看 `--ink`，强调色看 `--accent`，项目/论文底色看 `--project` / `--paper`。
- banner 的颜色变量位于 CSS 后部的 `--banner-*`。动画线条和光晕颜色在 `homepage.js` 的 draw 函数中。
- 字体通过 CSS 顶部 `@font-face` 本地加载，正文族在 `--font-text` 中；当前为 TeX Gyre Pagella，属 Palatino 风格。分发字体时保留 `assets/fonts/` 内许可和上游说明。
- 初始 HTML 的 `<body class="dark">` 与 JS 中 `homepage-color-theme` 共同控制默认夜间模式。访客手动切换后会记住偏好，浅色用户再次打开仍会看到浅色，这是预期行为。
- 动画可以通过页面按钮暂停，会尊重系统减少动态效果设置，并在离开视口或隐藏页面时停止绘制。
- 改字体尺寸时注意 CSS 后部与 media query 的覆盖规则；手机布局主要在 `max-width:800px` 和 `max-width:520px` 中。

## 8. 本地检查与发布

在仓库根目录运行：

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

打开 [本地首页](http://127.0.0.1:8000/)。修改后刷新；若旧 CSS/图片仍被缓存，用强制刷新。检查深浅模式、手机宽度、作品链接、图片及代表作数量。终端按 Ctrl+C 停止服务器。

提交前先检查变更，只暂存本次真正需要发布的文件。例如只新增一个项目时：

```sh
git status --short
git diff -- index.html
git add index.html images/paper/my-project.jpg
git diff --cached --stat
git commit -m "Add My Project to homepage"
git push origin main
```

如果同时修改了样式或指南，将对应文件名加入 git add。未变更的文件不会被重复提交；不要提交本地临时预览、缓存、凭据或尚未公开的论文材料。

推送后在仓库 Settings → Pages 查看发布来源，在 Actions / 部署记录确认成功，再访问 [正式主页](https://vvvvvjdy.github.io/)。页面刷新可能稍有延迟。若仓库配置为从分支发布，应选择 main 分支的 `/ (root)`。

也可以直接在 GitHub 上上传图片、编辑 index.html 并提交，但多文件更新更适合在本地作为一个 commit 发布。其他人复用时，请修改个人资料、链接、照片、元信息以及本文中的域名和仓库地址；保留适用的字体许可与来源致谢。项目论文配图与个人照片不因本模板公开而自动获得复用授权。
