---
---
const posts = [
{% assign notes = site.pages | where: "layout", "note" | sort: "date" | reverse %}
{% for note in notes %}
  {
    title: {{ note.title | jsonify }},
    date: {{ note.date | date: "%d %b, %Y" | jsonify }},
    excerpt: {{ note.excerpt | jsonify }},
    url: {{ note.url | relative_url | jsonify }},
    keywords: {{ note.keywords | join: " " | jsonify }}
  }{% unless forloop.last %},{% endunless %}
{% endfor %}
];

const root = document.documentElement;
const savedTheme = localStorage.getItem("d797-theme") || "light";
root.dataset.theme = savedTheme;

const cjkSequence = /([\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]+)/g;
const cjkTest = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/;

function emphasizeChinese(rootNode) {
  if (!rootNode) return;

  const walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!cjkTest.test(node.nodeValue || "")) return NodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      if (!parent || parent.closest("script, style, noscript, textarea, code, pre, svg, math, strong, .cjk-strong, .MathJax, .MathJax_Display, [aria-hidden='true']")) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  textNodes.forEach((node) => {
    const fragment = document.createDocumentFragment();
    node.nodeValue.split(cjkSequence).filter(Boolean).forEach((part) => {
      if (cjkTest.test(part)) {
        const strong = document.createElement("strong");
        strong.className = "cjk-strong";
        strong.textContent = part;
        fragment.appendChild(strong);
      } else {
        fragment.appendChild(document.createTextNode(part));
      }
    });
    node.replaceWith(fragment);
  });
}

document.querySelectorAll(".article-title, .post-title").forEach(emphasizeChinese);

const articleTitle = document.querySelector(".article-title");
let titleFitFrame = 0;

function fitArticleTitle() {
  titleFitFrame = 0;
  if (!articleTitle) return;

  articleTitle.style.removeProperty("font-size");
  const naturalSize = Number.parseFloat(getComputedStyle(articleTitle).fontSize);
  const titleLeft = articleTitle.getBoundingClientRect().left;
  const rightGutter = Math.max(18, Math.min(titleLeft, 72));
  const availableWidth = Math.max(1, document.documentElement.clientWidth - titleLeft - rightGutter);
  const naturalWidth = articleTitle.scrollWidth;

  if (naturalWidth > availableWidth) {
    const fittedSize = Math.max(10, naturalSize * (availableWidth / naturalWidth) * 0.985);
    articleTitle.style.fontSize = `${fittedSize}px`;
  }
}

function requestTitleFit() {
  if (!titleFitFrame) titleFitFrame = window.requestAnimationFrame(fitArticleTitle);
}

if (articleTitle) {
  requestTitleFit();
  document.fonts?.ready.then(requestTitleFit);
  window.addEventListener("resize", requestTitleFit, { passive: true });
}

const calendarIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 3v3M17 3v3M4.5 9h15M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/>
    <path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01"/>
  </svg>`;

function syncThemeLabels() {
  const isDark = root.dataset.theme === "dark";
  document.querySelectorAll(".theme-toggle").forEach((button) => {
    button.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    button.setAttribute("title", isDark ? "Light theme" : "Dark theme");
  });
}

function toggleTheme() {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("d797-theme", next);
  syncThemeLabels();
}

document.querySelector(".site-header")?.insertAdjacentHTML("beforeend", `
  <div class="header-tools" aria-label="Quick actions">
    <a class="utility-action" href="{{ '/Archieve/' | relative_url }}" aria-label="Open the archive" title="Archive">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7.5h16M5.5 7.5V20h13V7.5M4 4h16v3.5H4zM9 12h6"/></svg>
    </a>
    <button class="utility-action search-open" type="button" aria-label="Search notes" title="Search">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.2 4.2"/></svg>
    </button>
    <button class="utility-action theme-toggle" type="button" aria-label="Switch to dark theme" title="Theme">
      <svg class="moon-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.2A8.4 8.4 0 0 1 8.8 3.8a8.5 8.5 0 1 0 11.4 11.4Z"/></svg>
      <svg class="sun-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
    </button>
  </div>`);

document.querySelectorAll(".theme-toggle").forEach((button) => {
  button.addEventListener("click", toggleTheme);
});

document.body.insertAdjacentHTML("beforeend", `
  <div class="search-layer" role="dialog" aria-modal="true" aria-label="Search notes" aria-hidden="true">
    <div class="search-inner">
      <div class="search-top">
        <button class="search-close" type="button" aria-label="Close search">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>
        </button>
      </div>
      <div class="search-form" role="search">
        <label class="sr-only" for="site-search">Search notes</label>
        <input class="search-input" id="site-search" type="search" inputmode="search" autocomplete="off" placeholder="Search notes…">
        <p class="search-hint">Type a title or keyword · Press Esc to close</p>
      </div>
      <div class="search-results" aria-live="polite"></div>
    </div>
  </div>`);

const searchLayer = document.querySelector(".search-layer");
const searchInput = document.querySelector(".search-input");
const searchResults = document.querySelector(".search-results");
let lastFocusedElement = null;

function postResultMarkup(post) {
  return `
    <article class="post-item">
      <h2 class="post-title"><a href="${post.url}">${post.title}</a></h2>
      <div class="date-line">${calendarIcon}<time>${post.date}</time></div>
      <p class="post-excerpt">${post.excerpt}</p>
    </article>`;
}

function renderSearch(query = "") {
  const normalized = query.trim().toLocaleLowerCase();
  const results = normalized
    ? posts.filter((post) => `${post.title} ${post.excerpt} ${post.keywords}`.toLocaleLowerCase().includes(normalized))
    : posts;

  searchResults.innerHTML = results.length
    ? results.map(postResultMarkup).join("")
    : '<p class="search-empty">Nothing found. Try another word.</p>';
  searchResults.querySelectorAll(".post-title").forEach(emphasizeChinese);
}

function openSearch() {
  if (!searchLayer) return;
  lastFocusedElement = document.activeElement;
  searchLayer.classList.add("is-open");
  searchLayer.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  renderSearch("");
  window.setTimeout(() => searchInput?.focus(), 120);
}

function closeSearch() {
  if (!searchLayer) return;
  searchLayer.classList.remove("is-open");
  searchLayer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  if (searchInput) searchInput.value = "";
  lastFocusedElement?.focus();
}

document.querySelectorAll(".search-open").forEach((button) => {
  button.addEventListener("click", openSearch);
});

document.querySelector(".search-close")?.addEventListener("click", closeSearch);
searchInput?.addEventListener("input", (event) => renderSearch(event.target.value));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && searchLayer?.classList.contains("is-open")) {
    closeSearch();
  }
  if ((event.metaKey || event.ctrlKey) && event.key.toLocaleLowerCase() === "k") {
    event.preventDefault();
    openSearch();
  }
});

const timelineTrack = document.querySelector(".timeline-track");
const timelineThumb = document.querySelector(".timeline-thumb");
const timelineLabel = document.querySelector(".timeline-label");

if (timelineTrack && timelineThumb) {
  let timelineDragging = false;
  let timelineFrame = 0;
  let timelineDragFrame = 0;
  let pendingPointerY = 0;
  let dragTrackRect = null;
  let dragThumbTravel = 0;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const maxPageScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const thumbTravel = () => Math.max(0, timelineTrack.clientHeight - timelineThumb.offsetHeight);

  const updateTimelineThumb = () => {
    timelineFrame = 0;
    const limit = maxPageScroll();
    const ratio = limit ? window.scrollY / limit : 0;
    const thumbTop = Math.round(ratio * thumbTravel());
    timelineThumb.style.top = `${thumbTop}px`;
    if (timelineLabel) timelineLabel.style.top = `${thumbTop + timelineThumb.offsetHeight / 2}px`;
    timelineTrack.setAttribute("aria-valuenow", String(Math.round(ratio * 100)));
  };

  const requestTimelineUpdate = () => {
    if (timelineDragging) return;
    if (!timelineFrame) timelineFrame = window.requestAnimationFrame(updateTimelineThumb);
  };

  const applyPointerScroll = () => {
    timelineDragFrame = 0;
    if (!dragTrackRect?.height || !dragThumbTravel) return;
    const thumbRadius = timelineThumb.offsetHeight / 2;
    const ratio = clamp((pendingPointerY - dragTrackRect.top - thumbRadius) / dragThumbTravel, 0, 1);
    window.scrollTo({ top: ratio * maxPageScroll(), behavior: "auto" });
    updateTimelineThumb();
  };

  const requestPointerScroll = (clientY) => {
    pendingPointerY = clientY;
    if (!timelineDragFrame) timelineDragFrame = window.requestAnimationFrame(applyPointerScroll);
  };

  timelineTrack.addEventListener("pointerdown", (event) => {
    timelineDragging = true;
    dragTrackRect = timelineTrack.getBoundingClientRect();
    dragThumbTravel = thumbTravel();
    timelineTrack.classList.add("is-dragging");
    timelineTrack.setPointerCapture(event.pointerId);
    requestPointerScroll(event.clientY);
    event.preventDefault();
  });

  timelineTrack.addEventListener("pointermove", (event) => {
    if (timelineDragging) requestPointerScroll(event.clientY);
  });

  const stopTimelineDrag = (event) => {
    if (!timelineDragging) return;
    if (timelineDragFrame) {
      window.cancelAnimationFrame(timelineDragFrame);
      applyPointerScroll();
    }
    timelineDragging = false;
    dragTrackRect = null;
    dragThumbTravel = 0;
    timelineTrack.classList.remove("is-dragging");
    if (timelineTrack.hasPointerCapture(event.pointerId)) timelineTrack.releasePointerCapture(event.pointerId);
    requestTimelineUpdate();
  };

  timelineTrack.addEventListener("pointerup", stopTimelineDrag);
  timelineTrack.addEventListener("pointercancel", stopTimelineDrag);

  timelineTrack.addEventListener("keydown", (event) => {
    const current = Number(timelineTrack.getAttribute("aria-valuenow")) || 0;
    let next = current;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next += 5;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next -= 5;
    if (event.key === "PageDown") next += 20;
    if (event.key === "PageUp") next -= 20;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = 100;
    if (next === current && !["Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const ratio = clamp(next, 0, 100) / 100;
    window.scrollTo({ top: ratio * maxPageScroll(), behavior: "auto" });
    updateTimelineThumb();
  });

  window.addEventListener("scroll", requestTimelineUpdate, { passive: true });
  window.addEventListener("resize", requestTimelineUpdate);
  requestTimelineUpdate();
}

syncThemeLabels();

