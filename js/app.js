/* =========================================================
   Concinnity SCORM Portfolio - Dynamic Cards
   ========================================================= */

const CATEGORIES_URL = "content/categories.json";
const MODULES_URL = "content/modules.json";

// State
let categories = [];
let modules = [];
let activeCategory = "all";

function removeSkeletons() {
    document.querySelectorAll("[data-skeleton]").forEach(el => el.remove());
}

function showFallback() {
    removeSkeletons();
    const fallback = document.getElementById("fallback");
    if (fallback) fallback.style.display = "block";
}

function trackEvent(name, data = {}) {
    // Google Analytics 4
    if (typeof window.gtag === "function") {
        window.gtag("event", name, data);
    }

    // Plausible
    if (typeof window.plausible === "function") {
        window.plausible(name, { props: data });
    }

    // Fallback (for debugging)
    console.debug("Analytics event:", name, data);
}

function escapeHtml(str) {
    return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function renderFilters() {
    const el = document.getElementById("filters");
    if (!el) return;

    const chips = [];

    // All chip
    chips.push(`
    <button class="chip" type="button" data-category="all" aria-pressed="${activeCategory === "all"}">
      <span class="material-symbols-rounded" aria-hidden="true">apps</span>
      All
    </button>
  `);

    // Category chips
    for (const c of categories) {
        chips.push(`
      <button class="chip" type="button" data-category="${escapeHtml(c.id)}" aria-pressed="${activeCategory === c.id}">
        <span class="material-symbols-rounded" aria-hidden="true">${escapeHtml(c.icon || "label")}</span>
        ${escapeHtml(c.name)}
      </button>
    `);
    }

    el.innerHTML = chips.join("");

    // Click handlers
    el.querySelectorAll("button[data-category]").forEach(btn => {
        btn.addEventListener("click", () => {
            activeCategory = btn.getAttribute("data-category") || "all";
            renderFilters();
            renderCards();
        });
    });
}

function getCategoryMeta(categoryId) {
    return categories.find(c => c.id === categoryId) || {
        id: categoryId,
        name: categoryId,
        icon: "label"
    };
}

function renderCards() {
    const el = document.getElementById("cards");
    if (!el) return;

    const visible = modules
        .filter(m => m && m.published !== false)
        .filter(m => activeCategory === "all" ? true : m.categoryId === activeCategory)
        .sort((a, b) => (Number(a.order ?? 9999) - Number(b.order ?? 9999)));

    if (!visible.length) {
        el.innerHTML = `
      <article class="card" style="grid-column: span 12;">
        <div class="tag">
          <span class="material-symbols-rounded" aria-hidden="true">info</span>
          No results
        </div>
        <h3>No modules in this category yet</h3>
        <p>Please select another category, or check back soon.</p>
      </article>
    `;
        return;
    }

    el.innerHTML = visible.map(m => {
        const cat = getCategoryMeta(m.categoryId);

        return `
      <article class="card">
        <div class="tag">
          <span class="material-symbols-rounded" aria-hidden="true">${escapeHtml(cat.icon)}</span>
          ${escapeHtml(cat.name)}
        </div>
        <h3>${escapeHtml(m.title)}</h3>
${m.lastUpdated ? `
  <div class="meta">
    Last updated: ${new Date(m.lastUpdated).toLocaleDateString()}
  </div>
` : ""}
<p>${escapeHtml(m.description || "")}</p>

        <div class="actions">
          <a class="btn"
   href="${escapeHtml(m.url)}"
   target="_blank"
   rel="noopener"
   onclick="trackEvent('scorm_example_click', {
     id: '${escapeHtml(m.id)}',
     title: '${escapeHtml(m.title)}',
     category: '${escapeHtml(m.categoryId)}'
   })">
  View example
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M14 5h5v5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 14L19 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M19 14v5H5V5h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</a>

        </div>
      </article>
    `;
    }).join("");
}

async function init() {
    try {
        const [catRes, modRes] = await Promise.all([
            fetch(CATEGORIES_URL, { cache: "no-store" }),
            fetch(MODULES_URL, { cache: "no-store" })
        ]);

        if (!catRes.ok || !modRes.ok) {
            throw new Error("JSON files not accessible");
        }

        categories = await catRes.json();
        modules = await modRes.json();

        if (!Array.isArray(categories) || !Array.isArray(modules)) {
            throw new Error("Invalid JSON structure");
        }

        // Success state
        removeSkeletons();
        const fallback = document.getElementById("fallback");
        if (fallback) fallback.remove();

        renderFilters();
        renderCards();

    } catch (err) {
        console.error("SCORM page initialisation failed:", err);
        showFallback();
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    init();
});

// Remove skeletons / fallback once JS succeeds
const cards = document.getElementById("cards");
if (cards) cards.innerHTML = "";
