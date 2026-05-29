const header = document.querySelector("[data-header]");
const emailLinks = document.querySelectorAll(".email-link");

function setHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

async function copyEmail(link) {
  const email = link.dataset.email;

  if (!email || !navigator.clipboard) {
    return;
  }

  try {
    await navigator.clipboard.writeText(email);
    const originalText = link.textContent;

    link.textContent = "Email copied";
    link.classList.add("is-copied");

    window.setTimeout(() => {
      link.textContent = originalText;
      link.classList.remove("is-copied");
    }, 1800);
  } catch {
    // Mailto still runs when clipboard access is unavailable.
  }
}

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

emailLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    copyEmail(link);
    window.location.href = link.href;
  });
});
