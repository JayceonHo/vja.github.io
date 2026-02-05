// ui-bench-matrices-heat-toggle.js
export function initBenchMatricesHeatToggle({
  sectionSelector = "#benchmarks-matrices",
} = {}) {
  const section = document.querySelector(sectionSelector);
  if (!section) return;

  const btn = section.querySelector("[data-bench-heat-toggle]");
  if (!btn) return;

  const tables = Array.from(section.querySelectorAll("[data-bench-table]"));
  if (!tables.length) return;

  // 兼容旧 heatmap class（就算现在不用，也可以清掉）
  const HM_CLASSES = [
    "hm-g0","hm-g1","hm-g2","hm-g3",
    "hm-y1","hm-y2","hm-y3",
    "hm-b1","hm-b2","hm-b3",
    "hm-p1","hm-p2","hm-p3",
  ];

  function clearHeatmap(table) {
    table.querySelectorAll("td.hm").forEach((td) => {
      // ✅ 清理连续渐变 inline 背景
      td.style.backgroundColor = "";
      // ✅ 清理旧 class
      HM_CLASSES.forEach((c) => td.classList.remove(c));
    });
  }

  function applyHeatmap(table) {
    clearHeatmap(table);

    const cols = Array.from(table.querySelectorAll("thead th[data-col]"))
      .map((th) => th.getAttribute("data-col"))
      .filter(Boolean);

    cols.forEach((col) => {
      const cells = Array.from(
        table.querySelectorAll(`tbody td.hm[data-col="${col}"][data-val]`)
      );

      const vals = cells
        .map((td) => parseFloat(td.dataset.val))
        .filter((v) => Number.isFinite(v));

      if (!vals.length) return;

      const min = Math.min(...vals);
      const max = Math.max(...vals);
      const span = (max - min) || 1e-9;

      // ✅ 渐变强度（你可以继续调）
      const alphaMin = 0.06;
      const alphaMax = 0.62;

      cells.forEach((td) => {
        const v = parseFloat(td.dataset.val);
        if (!Number.isFinite(v)) return;

        const t = (v - min) / span; // 0..1
        const a = alphaMin + (alphaMax - alphaMin) * t;

        td.style.backgroundColor = `rgba(0, 91, 255, ${a.toFixed(3)})`;
      });
    });
  }

  if (!section.dataset.heatEnabled) section.dataset.heatEnabled = "true";

  function render() {
    const on = section.dataset.heatEnabled !== "false";
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.textContent = `Heatmap: ${on ? "On" : "Off"}`;

    if (on) tables.forEach(applyHeatmap);
    else tables.forEach(clearHeatmap);
  }

  btn.addEventListener("click", () => {
    const cur = section.dataset.heatEnabled !== "false";
    section.dataset.heatEnabled = cur ? "false" : "true";
    render();
  });

  render();
}
