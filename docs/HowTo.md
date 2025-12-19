## How to update the SCORM examples page (Staff Guide)

### Add a new example
1. Open `content/modules.json`
2. Copy an existing module entry and paste a new one at the end.
3. Update these fields:
   - `id`: a short unique name (e.g., "client-project-2025")
   - `title`: what appears on the card
   - `description`: short summary for the card
   - `categoryId`: must match an ID in `content/categories.json`
   - `order`: a number (lower numbers appear first)
   - `published`: `true`
   - `url`: the full SCORM link (keep as-is if already shared externally)
   - `lastUpdated`: date in `YYYY-MM-DD` (optional)
4. Save and commit the change.

### Hide an example (unpublish)
1. In `content/modules.json`, find the example.
2. Set `"published": false`
3. Commit the change.

### Reorder examples
1. Change the `order` value in `content/modules.json`
2. Commit the change.

### Add or change categories
1. Open `content/categories.json`
2. Add a new category object with:
   - `id` (short unique key)
   - `name` (label shown on filters)
   - `icon` (Material Symbol name, e.g., "public", "menu_book")
3. Commit the change.

### Testing notes
- The site needs to be served over `http://` or `https://` to load JSON.
- For local testing, use a simple local server (e.g., VS Code Live Server).
