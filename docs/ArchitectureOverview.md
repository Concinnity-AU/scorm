## Architecture Overview (Current)

````md
[Visitor Browser]
   |
   |  GET https://scorm.concinnity.au/
   v
[GitHub Pages - Static Site]
   |
   |-- index.html
   |-- css/styles.css
   |-- js/app.js
   |-- content/categories.json
   |-- content/modules.json
   |
   |  app.js loads JSON and renders cards/filters
   v
[Rendered Landing Page]
   |
   |-- Each card links to a hard-coded SCORM URL
   v
[SCORM Example Content]
   |
   |-- Hosted as extracted HTML folders within the same GitHub Pages site
   |   (existing paths retained to avoid breaking external links)
````

## Architecture Overview (Future - Optional Publishing Workflow)

````md
[Staff]
  |
  | Run GitHub Action: "Publish SCORM Example"
  | Upload ZIP + metadata (title/desc/category/order)
  v
[GitHub Actions Workflow]
  |
  |-- Unzip + validate package structure
  |-- Add/update content in repo OR upload to external storage
  |-- Update content/modules.json
  v
[GitHub Pages Redeploy]
  |
  v
[Visitor sees updated landing page automatically]
````
