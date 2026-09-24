# Yiliu Cao — personal website

A small academic website built with HTML, CSS, and JavaScript. It uses Georgia, has light and dark themes, and includes a photography gallery. There are no dependencies to install, no build step, no animation, and no external fonts or analytics.

The original `../sample/` folder is untouched. This folder contains everything the new site needs; it does not load anything from `sample`.

## 1. Start here

Open `index.html` in your browser to view the site. For a more reliable local preview, open Terminal and run:

```sh
cd "/Users/caoyiliu/Desktop/UW/website/academic-site"
python3 -m http.server 8000 --bind 127.0.0.1
```

Visit <http://127.0.0.1:8000/>. Leave Terminal running while you preview. Press **Control+C** to stop the server. If port 8000 is already in use, use `8001` in both the command and address. Python 3 is needed only for this optional preview, not for the published website.

After editing a file, save it and refresh the browser. If an old stylesheet persists, use **Command+Shift+R** on Mac or **Control+Shift+R** on Windows/Linux.

### Content to review before uploading

- The biography uses **PhD student**, as requested. Add your current university, department, supervisor, and current projects when ready. The old site described an incoming MMath; that wording was not carried forward.
- The research interests, historical education, project report, teaching history, email, and GitHub link come from your sample. Check that they still represent you. The email currently used is `yiliu.cao@mail.utoronto.ca`.
- `docs/CV.pdf` is an unchanged copy of the supplied older CV. Replace it with your current CV using the same filename.
- The gallery includes the five new photographs and the original winter landscape. The owner confirmed Hong Kong for the first four new photos, Vancouver for the café photo, and September 2026 for all six photographs. The winter landscape’s location is still unspecified. Visible captions contain only location and month, such as `Hong Kong, 2026.9`.
- The old lecture-notes page was empty, so there is no empty notes page in the navigation. Instructions for adding notes are below.

## 2. Where everything lives

```text
academic-site/
├── index.html                     About, biography, Contact me
├── research.html                  Research interests and projects
├── publication.html               Editable publication list
├── vitae.html                     CV highlights and a link to the full PDF
├── misc.html                      Teaching and other academic activities
├── teaching.html                  Previous teaching page, kept for compatibility
├── photography.html               Gallery: photographs and captions
├── README.md                      This guide
├── .nojekyll                      Tells GitHub to serve plain static files
├── .gitignore                     Keeps Mac temporary files out of Git
├── assets/
│   ├── css/
│   │   └── styles.css             Typography, colours, responsive layouts
│   ├── js/
│   │   ├── theme.js               Theme choice and browser preference
│   │   └── gallery.js             Full-image viewer and keyboard controls
│   └── images/
│       ├── favicon.svg            Small Y icon in the browser tab
│       ├── portrait.jpg           Your portrait
│       └── photography/
│           ├── taxi-stand.jpg     DSC_0046.JPG
│           ├── night-traffic.jpg  DSC_0050.JPG
│           ├── after-hours.jpg    DSC_0110.JPG
│           ├── above-the-city.jpg DSC_0123.JPG
│           ├── cafe-corner.jpg    DSC_0207.JPG
│           └── winter-light.jpg  Original gallery photograph
└── docs/
    ├── CV.pdf
    └── bicycle-thefts-report.pdf
```

Each page is ordinary HTML. The navigation and footer are repeated in the seven HTML files so the site works without a framework. If you change a shared name, contact link, or navigation item, update **all seven pages**. `aria-current="page"` identifies the selected navigation item. The navigation order is **About, Research, Publication, Vitae, Gallery, Misc**. Vitae opens `vitae.html`, which shows selected highlights and links to `docs/CV.pdf`. The older teaching page highlights Misc as its parent section.

All internal paths are relative: `docs/CV.pdf`, not `/docs/CV.pdf`. Keep this convention so the site also works at addresses such as `username.github.io/repository-name/`.

## 3. Common edits

Use a plain-text code editor, such as VS Code, rather than a word processor. Keep closing tags and quotes intact. In visible HTML text, write `&amp;` for an ampersand and `&lt;` for a less-than sign.

### Biography, contact information, and portrait

Edit the paragraphs below `<!-- Edit your short biography here. -->` in `index.html`. You can add your university as a regular link:

```html
<p>I’m a PhD student in [department] at
  <a href="https://your-university.example">[university]</a>.
</p>
```

Replace the bracketed text and example URL with your real details. Also update the page's `<meta name="description">` if needed. The email and GitHub icons beneath the portrait are in `<figcaption class="profile-links">`; edit each link's `href`, `aria-label`, and optional `title` when changing those destinations.

The **Contact me** section is also in `index.html`. Edit the visible email address and its matching `mailto:` link. Replace `Room 000, Department building` with your office location and remove the `(example)` label. The contact section has a thin divider above it.

To replace your portrait, put a new image at `assets/images/portrait.jpg`. Update its `width` and `height` in `index.html` to the image's actual pixel dimensions. CSS controls the displayed size; the attributes reserve space while it loads. The portrait is displayed as a square.

### CV and reports

Edit the selected education, experience, and skills in `vitae.html`. These are ordinary HTML entries and do not automatically update when you replace the PDF. The introductory “Read my full CV (PDF)” link opens the complete document.

Replace `docs/CV.pdf` with a new file of the same name. All CV links will continue working. Names are case-sensitive on GitHub: `CV.pdf` and `cv.pdf` are different.

For a report, add the PDF to `docs/` and link to it:

```html
<a href="docs/my-report.pdf">Read report (PDF)</a>
```

### Research, publications, and teaching entries

In `research.html`, duplicate an `<article class="entry">...</article>` block. Edit its title, authors, year, description, and resource links. Distinguish projects, working papers, and publications accurately. Remove any resource link you do not yet have.

In `publication.html`, replace the short placeholder paragraph with your publication entries. You can reuse the `<article class="entry">` structure from Research for titles, authors, dates, and links. No project report has been relabelled as a publication.

In `misc.html`, add an entry for a course, term, institution, and your role. New entries can go above the older ones. The previous `teaching.html` URL is retained for compatibility; keep it aligned with teaching changes in Misc if you continue sharing it.

To add lecture notes, create `docs/notes/`, put your PDFs there, and insert a section in `misc.html` before the closing `</div>` of `reading-width`:

```html
<section class="content-section" aria-labelledby="notes-heading">
  <h2 id="notes-heading">Lecture notes</h2>
  <ul>
    <li><a href="docs/notes/your-notes.pdf">Your course title (PDF)</a></li>
  </ul>
</section>
```

Replace the example filename and title. Share only notes you intend to make public.

### Add a photograph

1. Put the photograph in `assets/images/photography/`. Use a short filename such as `lakeside.jpg`, with lowercase letters and hyphens.
2. In `photography.html`, find `<div class="gallery">`. Duplicate the complete `<figure class="gallery-item">...</figure>` block **inside that div**.
3. Update **both** image paths: the link's `href` and the image's `src`.
4. Update the `aria-label`, `alt`, and the location/month in `.photo-details`. Keep a descriptive `alt` for accessibility; visible photo titles and descriptions are not needed.
5. Set `width` and `height` to the photo's actual dimensions. For photographs after the first, add `loading="lazy"` to the image.

Example block; replace all example details and add the actual file before using it:

```html
<figure class="gallery-item">
  <a class="photo-link"
     href="assets/images/photography/lakeside.jpg"
     aria-label="Open photograph in gallery view">
    <img src="assets/images/photography/lakeside.jpg"
         alt="Describe the scene in your photograph"
         width="2400" height="1600" loading="lazy">
  </a>
  <figcaption>
    <p class="photo-details">Your location, <time datetime="2026-09">2026.9</time></p>
  </figcaption>
</figure>
```

Keep the month-only `datetime` value and the visible date consistent: `datetime="2026-09"` displays as `2026.9`. Replace “Your location” with the place name. If a location is unknown, leave it as “Location not specified”.

The order of the figure blocks is the order of the photographs. To remove one, delete its complete figure block. With several images, the gallery uses two columns on larger screens and one on mobile. The six-photo arrangement pairs the two taxi scenes, then the night crossing and skyline, then the café scene and winter landscape. Photographs sit in consistent 3:2 frames, with space around images of a different shape. A single image uses a wider layout. Images are contained without cropping; both landscape and portrait photographs work.

The “Open gallery view” text link opens the viewer at the first photograph. Each photograph also opens the viewer at its own position. The viewer automatically picks up each image and its location/month caption. When replacing the first photograph, also update the text link’s `href` so its no-JavaScript fallback opens the correct image. It supports **Escape** to close, arrow keys for previous/next, and returns keyboard focus to the selected photograph. Previous/next buttons appear when there is more than one photograph. Without JavaScript, selecting a photograph opens its image directly.

For faster loading, export large camera originals as JPEG or WebP, around 1600–2400 pixels on the long edge, and ideally below 1 MB. Keep your originals separately. If changing the extension, update both paths. This is a file-based gallery: adding photos means editing the file and publishing the change; there is no online upload dashboard.

### Colours, fonts, and spacing

Edit the colour variables at the top of `assets/css/styles.css`:

- `--background`: page background.
- `--surface`: subtle control and image backgrounds.
- `--text` and `--heading`: body and heading colours.
- `--muted`: dates, labels, and secondary text.
- `--accent`: links and the thin line at the top.
- `--line`: dividers and borders.

There are light values and **two matching dark blocks**: one for the system preference when JavaScript is unavailable, and one for the selected dark theme. Keep the dark values in both blocks aligned.

Georgia is set through `--serif`. Small utility labels use the system sans-serif font. The site loads no web fonts. Main text is 18 pixels at the browser's default setting, with a generous line height. Page width is controlled by `.container`.

The site starts with the visitor's device theme. The borderless sun/moon icon is the theme toggle. It has a screen-reader label despite having no visible text. The toggle stores their choice in that browser and carries it across pages and reloads. If browser storage is blocked, the toggle still works on the current page. Light/dark changes have no animation.

Responsive rules are near the bottom of the stylesheet. At 720 pixels the portrait becomes smaller; at 540 pixels the layout switches to one column. Navigation stays visible and wraps, so visitors never need to open a menu.

## 4. Upload to GitHub Pages

These steps publish a plain static website. You do not need Jekyll, Node, an npm command, or a custom workflow file.

### Recommended: a personal `username.github.io` repository

1. Sign in to GitHub and create a repository named **`YOUR-USERNAME.github.io`**, replacing `YOUR-USERNAME` with your actual account name. If you still use the account linked in the sample, that would be **`yiliuc.github.io`**. Use a **public** repository for GitHub Free. If the repository already exists, update that repository instead of creating another.
2. Open the local `academic-site` folder. Upload **its contents**, not the enclosing folder. `index.html` must be at the repository root, alongside `research.html`, `publication.html`, `vitae.html`, `misc.html`, `teaching.html`, `photography.html`, `assets/`, and `docs/`.
3. In the repository, choose **Add file → Upload files**, drag in the files and folders, and commit the upload. A browser upload supports up to 100 files at a time and 25 MiB per file; larger galleries can be uploaded in batches or with GitHub Desktop.
4. Make sure **`.nojekyll`** is at the repository root. This hidden file skips Jekyll processing. In Mac Finder, **Command+Shift+.** shows hidden files. If it was missed, choose **Add file → Create new file** on GitHub, name it `.nojekyll`, add a blank line, and commit.
5. Go to **Settings → Pages → Build and deployment**. Choose **Deploy from a branch**, then **main** and **/(root)**, and click **Save**. If you use a different branch name, select that branch.
6. Publication can take up to ten minutes. Use **Visit site** in Pages settings. The address will be **`https://YOUR-USERNAME.github.io/`**.

You may include this README and `.gitignore` in the repository. Do not upload the original `sample` folder, temporary Mac files, or your entire parent `website` folder. There is no need to upload this guide to a separate website service.

**Important:** branch-based GitHub Pages supports the repository root or a `/docs` folder as its publishing source. It cannot directly select a folder named `/academic-site`. Keeping that name locally is fine; upload the contents to the repository root as described above. In this project, `docs/` holds PDFs, so select **/(root)** rather than **/docs**.

### Updating later

Edit your local files, preview them, then upload/commit the changed files to the same branch. GitHub Pages republishes automatically. Replacing `docs/CV.pdf` updates the CV without changing links. Adding a photo requires uploading the new image **and** the edited `photography.html`.

The GitHub **Actions** tab shows deployment progress and failures, even when you use “Deploy from a branch.”

### Check after publishing

- Open every navigation link and both PDFs.
- Switch themes, visit another page, and refresh to confirm the choice persists.
- Open the gallery image and close it using Escape or the Close button.
- Check a narrow phone screen and a larger screen; navigation should wrap and text should fit.
- If a page or image is missing, check its exact spelling and capitalization, whether it was uploaded, and whether `index.html` is at the publishing root.

### Official GitHub references

- [What is GitHub Pages?](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Configuring the publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Uploading files to a repository](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
- [Troubleshooting a 404](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites)
