/* ------------------------------------------------------------------ */
/* CATALOGUE DATA — the full ironmongery schedule.                     */
/* Edit this array to add, remove, or change categories.               */
/* Each item automatically gets an image placeholder labelled          */
/* "<NAME> IMAGE". To add a real photo, just drop a file into the      */
/* /images folder named "catalogue-<code>.jpg" (e.g. images/catalogue- */
/* 01.jpg for Hinges) — it will appear automatically, no code edits.   */
/* ------------------------------------------------------------------ */

const CATALOGUE = [
  { code: "01", name: "Hinges", finishes: ["Stainless Steel", "Black", "Brass"] },
  { code: "02", name: "3 Lever Locks", finishes: ["Stainless Steel", "Black", "Brass"] },
  { code: "03", name: "Cylinder Sash Locks", finishes: ["Stainless Steel", "Black", "Brass"] },
  { code: "04", name: "Cylinders", finishes: ["Satin Nickel", "Black", "Brass"] },
  { code: "05", name: "Lever Handles", finishes: ["Stainless Steel", "Black", "Brass", "Special Range"] },
  { code: "06", name: "Pull Handles", finishes: ["Stainless Steel", "Black"], note: "Brass Vintage Range available on request" },
  { code: "07", name: "Door Stops", finishes: ["Satin Nickel", "Black", "PVD"] },
  { code: "08", name: "Bolts", finishes: ["Satin Nickel", "Black", "Brass"] },
  { code: "09", name: "Rebate Kits", finishes: ["Satin Nickel", "Black", "Brass"] },
  { code: "10", name: "Door Closers", finishes: ["Steel", "Black"] },
  { code: "11", name: "Floor Springs", finishes: ["Steel", "Black"] },
  { code: "12", name: "Sliding Gear", finishes: [], note: "Barn Sliders" },
  { code: "13", name: "Flush Pulls", finishes: ["Stainless Steel", "Black"] },
];

/* ------------------------------------------------------------------ */
/* CATALOGUE RENDERING                                                 */
/* ------------------------------------------------------------------ */

function renderCatalogue() {
  const grid = document.getElementById("catalogueGrid");
  if (!grid) return;

  grid.innerHTML = CATALOGUE.map((item) => {
    const financesLine = item.finishes.length
      ? `<p class="hru-schedule-card__finishes">${item.finishes.join(" · ")}</p>`
      : "";
    const noteLine = item.note
      ? `<p class="hru-schedule-card__note">${item.note}</p>`
      : "";

    return `
      <article class="hru-schedule-card">
        <div class="hru-placeholder hru-schedule-card__image" style="aspect-ratio: 4 / 3;">
          <img src="images/catalogue-${item.code}.jpg" alt="${item.name}" class="hru-placeholder__img" onerror="this.style.display='none'" />
          <span class="hru-placeholder__corner hru-placeholder__corner--tl"></span>
          <span class="hru-placeholder__corner hru-placeholder__corner--tr"></span>
          <span class="hru-placeholder__corner hru-placeholder__corner--bl"></span>
          <span class="hru-placeholder__corner hru-placeholder__corner--br"></span>
          <span class="hru-placeholder__label">${item.name.toUpperCase()} IMAGE</span>
        </div>
        <div class="hru-schedule-card__body">
          <div class="hru-schedule-card__top">
            <span class="hru-schedule-card__code">${item.code}</span>
            <h3 class="hru-schedule-card__name">${item.name}</h3>
          </div>
          ${financesLine}
          ${noteLine}
        </div>
      </article>
    `;
  }).join("");
}

/* ------------------------------------------------------------------ */
/* MOBILE MENU                                                         */
/* ------------------------------------------------------------------ */

function initMobileMenu() {
  const burgerBtn = document.getElementById("burgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (!burgerBtn || !mobileMenu) return;

  const closeIcon = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
  const menuIcon = burgerBtn.innerHTML;

  burgerBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    burgerBtn.setAttribute("aria-expanded", String(isOpen));
    burgerBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    burgerBtn.innerHTML = isOpen ? closeIcon : menuIcon;
  });

  // Close the menu whenever a link inside it is tapped
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      burgerBtn.setAttribute("aria-expanded", "false");
      burgerBtn.setAttribute("aria-label", "Open menu");
      burgerBtn.innerHTML = menuIcon;
    });
  });
}

/* ------------------------------------------------------------------ */
/* HERO SLIDER — automatic crossfade with manual dot/arrow controls    */
/* ------------------------------------------------------------------ */

function initHeroSlider() {
  const slidesContainer = document.getElementById("heroSlides");
  if (!slidesContainer) return;

  const slides = Array.from(slidesContainer.querySelectorAll(".hru-hero__slide"));
  const dashesContainer = document.getElementById("heroDashes");
  const prevBtn = document.getElementById("heroPrev");
  const nextBtn = document.getElementById("heroNext");

  let index = 0;
  let timer = null;

  // Build the dash indicators to match the number of slides
  slides.forEach((_, i) => {
    const dash = document.createElement("button");
    dash.className = "hru-hero__dash" + (i === 0 ? " is-active" : "");
    dash.setAttribute("role", "tab");
    dash.setAttribute("aria-label", `Show slide ${i + 1}`);
    dash.addEventListener("click", () => goTo(i));
    dashesContainer.appendChild(dash);
  });
  const dashes = Array.from(dashesContainer.querySelectorAll(".hru-hero__dash"));

  function goTo(i) {
    index = ((i % slides.length) + slides.length) % slides.length;
    slides.forEach((slide, s) => slide.classList.toggle("is-active", s === index));
    dashes.forEach((dash, s) => dash.classList.toggle("is-active", s === index));
    restartTimer();
  }

  function restartTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(index + 1), 5200);
  }

  prevBtn.addEventListener("click", () => goTo(index - 1));
  nextBtn.addEventListener("click", () => goTo(index + 1));

  restartTimer();
}

/* ------------------------------------------------------------------ */
/* INIT                                                                */
/* ------------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  renderCatalogue();
  initMobileMenu();
  initHeroSlider();

  const yearEl = document.getElementById("footerYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
