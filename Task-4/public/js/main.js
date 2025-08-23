document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("#navbar-links .nav-link");
  const content = document.getElementById("content");

  links.forEach((link) => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();

      // update active state
      links.forEach((l) => l.classList.remove("active", "text-dark"));
      links.forEach((l) => l.classList.add("text-secondary"));

      link.classList.add("active", "text-dark");
      link.classList.remove("text-secondary");

      // fetch partial
      const page = link.getAttribute("data-page").replace(".ejs", "");
      try {
        const response = await fetch(`/page/${page}`);
        if (!response.ok) throw new Error("Page not found");
        const html = await response.text();
        content.innerHTML = html;

        // update URL without reload
        history.pushState({ page }, "", `/dashboard/${page}`);

        // update dashboard title
        const title = link.textContent.trim() || "Dashboard";
        document.title = `${title} | Dashboard`;
      } catch (err) {
        content.innerHTML = `<p class="text-danger">Error loading page</p>`;
      }
    });
  });

  // auto-load home
  links[0].click();
});
