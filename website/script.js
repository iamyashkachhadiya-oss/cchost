const sections = [...document.querySelectorAll("main section[id]")];
const links = [...document.querySelectorAll(".nav-links a")];

const navObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    links.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  {
    rootMargin: "-20% 0px -55% 0px",
    threshold: [0.12, 0.25, 0.5],
  }
);

sections.forEach((section) => navObserver.observe(section));

function setupSlider(trackSelector, slideSelector, prevSelector, nextSelector) {
  const track = document.querySelector(trackSelector);
  const prev = document.querySelector(prevSelector);
  const next = document.querySelector(nextSelector);

  function move(direction) {
    if (!track) return;

    const firstSlide = track.querySelector(slideSelector);
    if (!firstSlide) return;

    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 16;
    track.scrollBy({
      left: direction * (firstSlide.getBoundingClientRect().width + gap),
      behavior: "smooth",
    });
  }

  prev?.addEventListener("click", () => move(-1));
  next?.addEventListener("click", () => move(1));
}

setupSlider("[data-poster-track]", ".poster-slide", "[data-slider-prev]", "[data-slider-next]");
setupSlider("[data-reel-track]", ".reel-card", "[data-reel-prev]", "[data-reel-next]");

const modalData = {
  "modal-fashion": {
    kicker: "Experience detail",
    title: "Fashion pages",
    body: `
      <p>This is where I learned content by actually publishing. The work was less about making one perfect post and more about understanding repeated audience behavior.</p>
      <ul>
        <li>Created and tested fashion/lifestyle posts at volume.</li>
        <li>Worked with captions, hooks, comments, DMs, timing, and post formats.</li>
        <li>Learned what makes people stop scrolling, save, reply, and come back.</li>
        <li>Built the basic content instinct I now use before designing any campaign.</li>
      </ul>
    `,
  },
  "modal-peter": {
    kicker: "Experience detail",
    title: "The Peter Field",
    body: `
      <p>This experience connected content with business outcomes. The goal was not just reach. It was product trust, discovery, and buying behavior.</p>
      <ul>
        <li>Worked on ecommerce positioning for men's fashion products.</li>
        <li>Learned how content supports sales, product confidence, and repeat customers.</li>
        <li>Built thinking around what a customer needs to see before making a purchase.</li>
        <li>Scaled with a business mindset: attention should lead somewhere useful.</li>
      </ul>
    `,
  },
  "modal-patlun": {
    kicker: "Experience detail",
    title: "Patlun",
    body: `
      <p>Patlun was about turning fashion products into content that could feel clear, visual, and easy to understand online.</p>
      <ul>
        <li>Worked on product-focused marketing for fashion ecommerce.</li>
        <li>Created and used short-form videos, product visuals, and launch-style content.</li>
        <li>Thought about how to show fit, style, offer, and product value quickly.</li>
        <li>Built the habit of matching format to goal: reel for attention, poster for clarity, campaign for conversion.</li>
      </ul>
    `,
  },
  "modal-armaan": {
    kicker: "Experience detail",
    title: "Armaan Textile",
    body: `
      <p>This work helped me understand brand communication in a more business-facing environment.</p>
      <ul>
        <li>Created visual posts and poster-style content for textile communication.</li>
        <li>Worked with festive, announcement, exhibition, and product-led designs.</li>
        <li>Learned how visuals need to look professional while still being quickly readable.</li>
        <li>Built stronger judgment around layout, spacing, hierarchy, and brand tone.</li>
      </ul>
    `,
  },
  "modal-funstrike": {
    kicker: "Experience detail",
    title: "Fun Strike",
    body: `
      <p>My role here was consulting and strategy, not making the content myself. The key question was: how do we reach people who can actually visit?</p>
      <ul>
        <li>Helped think through local influencer and collaboration strategy.</li>
        <li>Recommended working with Surat-based creators because local views mattered more than broad views.</li>
        <li>Suggested discount-for-content and cross-posting ideas for smaller creators.</li>
        <li>Focused on local footfall, community relevance, and customer conversion rather than just algorithmic reach.</li>
      </ul>
    `,
  },
};

const modalBackdrop = document.querySelector("[data-modal-backdrop]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalKicker = document.querySelector("[data-modal-kicker]");
const modalBody = document.querySelector("[data-modal-body]");
const modalClose = document.querySelector("[data-modal-close]");

function openExperienceModal(id) {
  const data = modalData[id];
  if (!data || !modalBackdrop || !modalTitle || !modalKicker || !modalBody) return;

  modalTitle.textContent = data.title;
  modalKicker.textContent = data.kicker;
  modalBody.innerHTML = data.body;
  modalBackdrop.hidden = false;
  document.body.style.overflow = "hidden";
  modalClose?.focus();
}

function closeExperienceModal() {
  if (!modalBackdrop) return;

  modalBackdrop.hidden = true;
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-modal-target]").forEach((card) => {
  card.addEventListener("click", () => openExperienceModal(card.dataset.modalTarget));
});

modalClose?.addEventListener("click", closeExperienceModal);
modalBackdrop?.addEventListener("click", (event) => {
  if (event.target === modalBackdrop) closeExperienceModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeExperienceModal();
});
