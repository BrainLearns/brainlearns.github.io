const menu = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-nav");
const narrowScreen = matchMedia("(max-width: 760px)");

function closeMenu() {
  menu.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
}

menu.hidden = false;
menu.addEventListener("click", () => {
  const isOpen = menu.getAttribute("aria-expanded") === "true";
  menu.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("is-open", !isOpen);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menu.focus();
  }
});

narrowScreen.addEventListener("change", closeMenu);

const publicationTools = document.querySelector(".publication-tools");
const publicationButtons = publicationTools.querySelectorAll("button");
const publicationCount = publicationTools.querySelector(".publication-count");
const publications = document.querySelectorAll(".publication");

function filterPublications(filter) {
  let visibleCount = 0;
  publications.forEach((publication) => {
    const show = filter === "all" || publication.dataset.type === filter;
    publication.hidden = !show;
    visibleCount += Number(show);
  });

  publicationButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.filter === filter));
  });
  publicationCount.textContent = visibleCount + " of " + publications.length + " shown";
}

publicationButtons.forEach((button) => {
  button.addEventListener("click", () => filterPublications(button.dataset.filter));
});

filterPublications("all");
publicationTools.hidden = false;
