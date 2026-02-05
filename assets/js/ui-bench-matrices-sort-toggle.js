// ui-bench-matrices-sort-toggle.js
export function initBenchMatricesSortToggle({
  sectionSelector = "#benchmarks-matrices",
} = {}) {
  const section = document.querySelector(sectionSelector);
  if (!section) return;

  const btn = section.querySelector("[data-bench-sort-toggle]");
  if (!btn) return;

  const tables = Array.from(section.querySelectorAll("[data-bench-table]"));
  if (!tables.length) return;

  // === 缓存初始顺序（每张表）===
  const CACHED = "__origRowsCached";
  function cacheOriginalOrder(table) {
    if (table[CACHED]) return;
    const tbody = table.tBodies?.[0];
    if (!tbody) return;
    table.__origRows = Array.from(tbody.rows);
    table[CACHED] = true;
  }
  function restoreOriginalOrder(table) {
    const tbody = table.tBodies?.[0];
    const rows = table.__origRows;
    if (!tbody || !rows) return;
    rows.forEach((tr) => tbody.appendChild(tr));
  }

  tables.forEach(cacheOriginalOrder);

  // 默认开启（也可从 aria-pressed 初始化）
  if (!section.dataset.sortEnabled) section.dataset.sortEnabled = "true";

  function setHeaderClickable(enabled) {
    tables.forEach((t) => {
      // 这个 class 仅用于你现有 CSS 禁用点击
      t.classList.toggle("sort-disabled", !enabled);
      t.querySelectorAll("thead th[data-sort]").forEach((th) => {
        th.style.pointerEvents = enabled ? "auto" : "none";
      });
    });
  }

  function render() {
    const on = section.dataset.sortEnabled !== "false";

    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.textContent = `Sort: ${on ? "On" : "Off"}`;

    // ✅ 用于 CSS 隐藏箭头：#benchmarks-matrices.sort-off ...
    section.classList.toggle("sort-off", !on);

    if (!on) {
      // 关闭时：清理 aria-sort（避免残留 ▲▼）
      section
        .querySelectorAll(".bench-table thead th[aria-sort]")
        .forEach((th) => th.removeAttribute("aria-sort"));

      // 关闭时：恢复初始顺序
      tables.forEach(restoreOriginalOrder);
    }

    setHeaderClickable(on);
  }

  btn.addEventListener("click", () => {
    const cur = section.dataset.sortEnabled !== "false";
    section.dataset.sortEnabled = cur ? "false" : "true";
    render();
  });

  render();
}
