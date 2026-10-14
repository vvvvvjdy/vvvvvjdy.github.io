# Homepage maintenance guide

[中文版](README.zh-CN.md) · [Repository overview](../README.md)

This is a static HTML/CSS/JavaScript site served from the repository root by GitHub Pages. **Edit the root `index.html` to update content. No dependency installation, generator, or build command is required.** Do not regenerate the live homepage from historical design drafts; that would overwrite current content.

## 1. File map

| Path | Purpose |
| --- | --- |
| `index.html` | Live homepage: profile, biography, interests, projects, publications, education and employment |
| `homepage.css` | Layout, colors, typography, portrait framing and responsive styles |
| `homepage.js` | Theme toggle, animated banner and active navigation |
| `images/portrait.jpg` | Profile photograph |
| `images/paper/` | Thumbnails for both projects and publications |
| `images/institution/` | University, laboratory and company logos |
| `images/logo.jpg` | Browser favicon |
| `assets/fonts/` | Self-hosted fonts, license and upstream documentation |
| `sra/`, `d-opsd/` | Existing standalone project websites; preserve their structures |
| `maintenance/` | English and Chinese maintenance guides |

The legacy `stylesheet.css` remains in the repository, but the current homepage loads `homepage.css`.

Use short lowercase filenames, such as `my-project.jpg`, without spaces. GitHub Pages paths are case-sensitive: `My-Project.jpg` and `my-project.jpg` are different files. JPG, PNG and WebP work well. Research thumbnails around 800–1200 px wide are usually sufficient; compress them to a few hundred KB where practical. Match filenames and extensions exactly in HTML.

## 2. Add a project

1. Place the thumbnail at `images/paper/my-project.jpg`.
2. In `index.html`, find `id="projects"` for selected projects or `id="other-projects"` for other projects.
3. Insert the complete article below inside that section's `<div class="work-list">`, alongside existing articles. File order determines display order.
4. Replace the unique ID, image, title, authors, description and every URL. Update the section's displayed count.

Complete selected-project example; replace the example URLs with real destinations:

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

Remove unavailable resources instead of using placeholder `#` links. To add Paper, Demo or Hugging Face buttons, duplicate a resource-link anchor and change its label and URL. The thumbnail and title usually link to the project website.

For an **other project**, use `class="work-card standard project"`, remove the SELECTED span, and replace the description paragraph with a collapsible summary:

```html
<details class="summary">
  <summary>Summary</summary>
  <p class="description">Write the project description here.</p>
</details>
```

## 3. Add a publication

Place its thumbnail in `images/paper/`. Find `id="publications"` for selected papers or `id="other-publications"` for other papers. Copy an entire article from the desired section and edit it.

The structure matches a project, with these differences:

| Field | Selected publication |
| --- | --- |
| Article class | `class="work-card featured publication"` |
| Unique ID | For example, `id="work-my-paper"`; never duplicate another entry's ID |
| Venue | An accurate label such as `CVPR, 2027` or `Preprint, 2027` |
| Authors | Preserve paper order, use `<strong>...</strong>` for your name, and retain equal-contribution `*` markers |
| Thumbnail/title links | Usually the paper or its project website |
| Resource links | Paper, Code, Project page, etc.; include only available resources |

Other publications use `class="work-card standard publication"`, omit SELECTED, and use the collapsible details block above. Entries are not sorted automatically: move entire article blocks to change their order.

## 4. Selection, ordering, counts and removal

- To feature a work, move its entire article to the appropriate Selected work-list, change `standard` to `featured`, add the SELECTED label and replace the details wrapper with a regular description paragraph.
- To move it to Other, reverse those changes. Move rather than copy to avoid duplicate entries and IDs.
- **Counts are manual.** For example, change `04` in `<h2>Selected Publications <span>04</span></h2>`. Update every affected section after adding, moving or removing works.
- To delete a work, remove only its complete article. Keep its image if another page still references it.
- Current selected project: Z-Image. Selected publications, in order: Pixel-Space empirical study, D-OPSD, DMDR and SRA. lbGen is under Other Publications.

## 5. Add education or work experience

Find `id="experience"` for education or `id="work-experience"` for employment. Place the institution logo in `images/institution/`, then add an experience-item inside the corresponding section. Newest entries usually go first. Replace this example with accurate details:

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

For education, the role line can read `Ph.D. · Department Name`. Remove the last paragraph if no mentor or additional details are needed. If you have no logo, remove the img element. Experience sections have no displayed counts to update.

## 6. Edit your profile, biography, photo and links

- **Name and institution:** edit h1, role and affiliation below the `PROFILE` comment in index.html. Also check the banner name, page title, description metadata and footer.
- **Biography:** find `ABOUT AND RESEARCH INTERESTS`, then edit the about-copy paragraphs.
- **Research interests:** edit the interest-block list; each li is one tag.
- **Email:** search for the old address and replace all occurrences, including visible text and mailto links in the sidebar, biography and footer.
- **Scholar / GitHub / RedNote:** edit the corresponding href inside social-links. Also check biography links when adapting the template.
- **Portrait:** replace `images/portrait.jpg`, or update both portrait-link href and avatar src. Update the img width/height attributes if the new image has different proportions. The current framing includes the upper body and surroundings.
- **Portrait framing:** edit `.portrait-link` dimensions and `.avatar` object-position in homepage.css. Check the mobile overrides as well. Add scaling only if you intentionally want a closer crop.
- **Copyright year:** update the footer in index.html manually.

In HTML text, escape `&` as `&amp;` and `<` as `&lt;`. Use `&amp;` for ampersands in URL query strings too. Never nest one work article inside another.

## 7. Colors, typography and motion

- In homepage.css, `body` defines the light palette and `body.dark` defines the dark palette. Key variables: `--bg` for the page, `--surface` for cards, `--ink` for text, `--accent` for accents, and `--project` / `--paper` for work backgrounds.
- Banner variables `--banner-*` are near the end of the stylesheet. Animated line and glow colors are in the draw function in homepage.js.
- The top-level `@font-face` declarations load local fonts. `--font-text` selects the text family: TeX Gyre Pagella, a Palatino-style font. Preserve the font license and upstream documentation when redistributing the font files.
- Initial `<body class="dark">` markup and the `homepage-color-theme` setting in JavaScript establish the night default. A visitor's explicit selection is remembered, so returning light-mode users still see light mode.
- The animation has a pause button, respects reduced-motion preferences, and stops drawing when outside the viewport or when the page is hidden.
- Later CSS rules and media queries override earlier ones. Main responsive breakpoints are `max-width:800px` and `max-width:520px`; check these when adjusting typography or dimensions.

## 8. Preview and publish

From the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000/. Refresh after editing; use a hard refresh if old styles or images remain cached. Check both themes, mobile width, links, images and selected-work counts. Press Ctrl+C in the terminal to stop the server.

Review changes before committing, and stage only intended files. For example, when adding a single project:

```sh
git status --short
git diff -- index.html
git add index.html images/paper/my-project.jpg
git diff --cached --stat
git commit -m "Add My Project to homepage"
git push origin main
```

If you also edited styles or guides, include those filenames in git add. Unchanged files are not committed again. Keep temporary local drafts, caches, credentials and unpublished research materials out of the commit.

After pushing, inspect Settings → Pages for the publishing source and Actions / deployment history for success, then visit https://vvvvvjdy.github.io/. Publication can take a short time. If using branch-based publishing, select main and `/ (root)`.

You can also upload images and edit index.html directly on GitHub, but local commits make coordinated multi-file updates easier. When reusing this template, replace personal details, links, photos, metadata, and repository/domain references in these instructions. Retain applicable font licenses and source acknowledgements. A public template does not automatically grant reuse rights to personal photographs or research illustrations.
