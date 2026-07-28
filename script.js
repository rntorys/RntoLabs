const body = document.body;
const themeToggle = document.querySelector("#theme-toggle");
const filters = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");
const projectCount = document.querySelector("#project-count");
const copyHandle = document.querySelector("#copy-handle");
const toast = document.querySelector("#toast");
const year = document.querySelector("#year");

const savedTheme = localStorage.getItem("rntolabs-theme");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

if (savedTheme === "light" || (!savedTheme && prefersLight)) {
  body.classList.add("light");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  localStorage.setItem("rntolabs-theme", body.classList.contains("light") ? "light" : "dark");
});

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const selectedCategory = filter.dataset.filter;

    filters.forEach((item) => item.classList.remove("active"));
    filter.classList.add("active");

    let visibleProjects = 0;

    projectCards.forEach((card) => {
      const shouldShow = selectedCategory === "all" || card.dataset.category === selectedCategory;
      card.classList.toggle("hidden", !shouldShow);
      if (shouldShow) visibleProjects += 1;
    });

    projectCount.textContent = String(visibleProjects).padStart(2, "0");
  });
});

copyHandle.addEventListener("click", async () => {
  const handle = copyHandle.dataset.handle;

  try {
    await navigator.clipboard.writeText(handle);
    toast.textContent = `${handle} copiado`;
  } catch {
    toast.textContent = `Mi usuario es ${handle}`;
  }

  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
});

year.textContent = new Date().getFullYear();
