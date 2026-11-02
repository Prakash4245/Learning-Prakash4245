// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle (remembers choice)
const root = document.documentElement;
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;
  else if (matchMedia("(prefers-color-scheme: dark)").matches) root.dataset.theme = "dark";
} catch (e) {}
document.getElementById("theme").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
});

// Mobile menu
const menu = document.getElementById("menu");
document.getElementById("burger").addEventListener("click", () => menu.classList.toggle("open"));
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));

// Reveal sections on scroll + count-up stats
document.querySelectorAll(".section").forEach(s => s.classList.add("reveal"));
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("show");
    e.target.querySelectorAll("[data-count]").forEach(el => {
      const end = +el.dataset.count;
      let n = 0;
      const step = Math.max(1, Math.ceil(end / 40));
      const t = setInterval(() => {
        n = Math.min(end, n + step);
        el.textContent = n + (n === end && end >= 100 ? "+" : "");
        if (n === end) clearInterval(t);
      }, 30);
    });
    io.unobserve(e.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(s => io.observe(s));
