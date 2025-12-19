## SCORM Portfolio Landing Page – Feature Reference

### Current features
- **GitHub Pages + custom domain**: Static site hosted via GitHub Pages on `scorm.concinnity.au`.
- **Data-driven listings**: Example cards are generated from JSON:
  - `content/modules.json` (examples, URLs, ordering, publish state, metadata)
  - `content/categories.json` (category name + Material icon)
- **Category filtering**: Filter chips are generated from `categories.json`.
- **Ordering**: Examples are sorted by `order` (ascending) from `modules.json`.
- **Hard-coded external URLs supported**: Examples link to existing published URLs (no file move required).
- **Externalised assets**:
  - CSS: `css/styles.css`
  - JS: `js/app.js`
- **Loading skeletons**: Skeleton cards display while JSON loads.
- **Graceful fallback**:
  - If JSON fails to load, a professional fallback message is shown.
  - If JavaScript is disabled, a `<noscript>` notice is shown.
- **Per-module metadata**: Optional `lastUpdated` date displayed per example.
- **Analytics hooks**: Clicking “View example” triggers an event hook (GA4/Plausible compatible).

### Future (optional) features
- **GitHub Actions publishing workflow**: Upload a SCORM ZIP + metadata to auto-publish and update JSON.
- **Unpublish vs delete management**: Hide examples or remove files entirely via workflow.
- **Category management workflow**: Add/edit/remove categories and icons safely.
- **Reorder workflow**: Adjust ordering without manually editing JSON.
- **Redirect support for moved modules**: If modules are moved to `/modules/`, old links can be preserved with per-page redirects.
- **External storage for scale**: Host SCORM packages on CDN/object storage if Pages size limits become a concern.
