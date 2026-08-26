# D.797's home

A GitHub Pages site built with Jekyll. Notes are stored as Markdown and rendered automatically.

## Routes

- `/` — Home
- `/Notes/` — Notes
- `/Archieve/` — Archive
- `/about/` — About
- `/Notes/<slug>/` — Individual rendered notes

## Editing

- Site styles live in `styles.css`.
- Search data, theme switching, and interactions live in `script.js`.
- The shared note page lives in `_layouts/note.html`.
- Each note is a `.md` file inside `Notes/`.

Add a new note with YAML front matter:

```markdown
---
layout: note
title: "Note title"
date: 2026-08-26 12:00:00 +0800
excerpt: "One-sentence summary."
keywords:
  - keyword
permalink: /Notes/note-slug/
---

Markdown content starts here.
```

The Home, Notes, Archive, dates, and search index are generated from this front matter automatically.

## GitHub Pages

Publish the repository's `main` branch from the root. GitHub Pages runs Jekyll and renders every Markdown note.

