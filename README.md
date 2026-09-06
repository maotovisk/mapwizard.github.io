# MapWizard Website

<div align="center">
  
  ![MapWizard Logo](./public/img/favicon-128x128.png)
  
  Official website codebase for [MapWizard](https://github.com/maotovisk/MapWizard)
  
</div>

## Development

### Prerequisites

- [Bun](https://bun.sh) (v1.0.0 or higher)

### Setup

```bash
# Clone the repository
git clone https://github.com/maotovisk/mapwizard.github.io.git

# Navigate to project directory
cd mapwizard.github.io

# Install dependencies
bun install
```

### Available Commands

```bash
# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Generate favicons
bun run generate:icons
```

## Deployment

The website automatically deploys to GitHub Pages when changes are pushed to the main branch.

## License

This project is open-source and available under the [MIT License](LICENSE).

## Wiki

Wiki articles live in `wiki/<Article_name>/<language>.md`, inspired by the
folder and language structure of [osu! wiki](https://github.com/ppy/osu-wiki).
The initial guide is `wiki/Getting_started/en.md`.

Add a Markdown file with a single `# Page title`; the build discovers it and adds
it to the wiki navigation. Its URL is `/#/wiki/<Article_name>/<language>`.
Hash routes work on GitHub Pages without server rewrites, including direct links
and refreshes. Link to other articles with `#/wiki/Article_name/en`, and use
`#download` or `#screenshots` to return to a section of the website.

Markdown supports headings, lists, fenced code, links, images and tables. Put
images in `public/img/wiki/` and reference them as `/img/wiki/filename.png`.
Rendered HTML is sanitized before display. Preview with `bun run dev` and verify
with `bun run build` before submitting changes.
