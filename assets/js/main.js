import { initGithubStats } from "./github-stats.js";
import { initDropdowns } from "./ui-dropdown.js";
import { initAccordions } from "./ui-accordion.js";
import { initTabs } from "./ui-tabs.js";
import { initCopyButtons } from "./ui-copy.js";
import { initCarousels } from "./ui-carousel.js";
import { initBenchTables } from "./ui-bench-table.js";
import { initBenchToggle } from "./ui-bench-toggle.js";
import { initBenchSortToggle } from "./ui-bench-sort-toggle.js";
import { initBenchEnhanceToggle } from "./ui-bench-enhance-toggle.js";
import { initBenchMatricesHeatToggle } from "./ui-bench-matrices-heat-toggle.js";
import { initBenchMatricesSortToggle } from "./ui-bench-matrices-sort-toggle.js";




document.addEventListener("DOMContentLoaded", () => {
  initDropdowns();
  initAccordions();
  initTabs();
  initCopyButtons();
  initCarousels();
  initBenchTables();
  initBenchToggle();
  initBenchSortToggle();
  initBenchEnhanceToggle();
  initGithubStats({
  owner: "JayceonHo",
  repo: "VJA",
  starsEl: "#hero-stars-count",
  forksEl: "#hero-forks-count",
  });
  initBenchMatricesSortToggle();
  initBenchMatricesHeatToggle();



});


