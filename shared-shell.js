document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.add("scroll-smooth");

  const headerHtml = `
<!-- NAV -->
<!-- NAV -->
<header class="fixed top-0 w-full bg-black/70 backdrop-blur z-50">
  <div class="max-w-6xl mx-auto flex justify-between items-center py-3 px-4">

    <!-- LOGO -->
    <a href="index.html" aria-label="Go to PROOF home" class="inline-flex items-center shrink-0"><img
      src="proof-logo/Proof_header_good.png"
      alt="PROOF and ProofLab system cinematic proof-of-concept platform"
      class="h-[40px] md:h-[60px] w-auto object-contain scale-[2.5] origin-left"
    /></a>

    <!-- HAMBURGER -->
    <button id="menuBtn" class="md:hidden text-white text-2xl">
      &#9776;
    </button>

    <!-- DESKTOP NAV -->
    <nav class="hidden md:flex space-x-5 text-sm text-white">
      <a href="index.html#what-is-proof" class="hover:text-gray-300">What is PROOF?</a>
      <a href="index.html#examples" class="hover:text-gray-300">Examples</a>
      <a href="products.html" class="hover:text-gray-300">Products</a>
      <a href="development.html" class="hover:text-gray-300">PROOF: Dev</a>
      <a href="faq.html" class="hover:text-gray-300">FAQ</a>
      <a href="project-review.html" class="text-[#0066FF] font-semibold">Get Free Review</a>
    </nav>

  </div>

  <!-- MOBILE MENU -->
  <div id="mobileMenu" class="hidden md:hidden bg-black text-center py-6 flex flex-col items-center gap-4">
    <a href="project-review.html" class="block text-[#0066FF] font-semibold">Get Free Review</a>

    <button
      type="button"
      data-mobile-watch-preview
      class="hidden text-white/80 hover:text-white transition"
    >
      Watch Preview
    </button>

    <a href="index.html#what-is-proof" class="block">What is PROOF?</a>
    <a href="index.html#examples" class="block">Examples</a>
    <a href="products.html" class="block">Products</a>
    <a href="development.html" class="block hover:text-gray-300">PROOF: Dev</a>
    <a href="faq.html" class="block">FAQ</a>

    <div class="w-[88%] max-w-sm border border-white/10 rounded-2xl px-4 py-4 mt-2 bg-white/[0.02]">
      <p class="text-xs text-gray-400 leading-relaxed mb-4">
        Project stuck? Send it in for a free review before you waste another pitch.
      </p>

      <a
        href="project-review.html"
        class="block w-full bg-[#0066FF] text-white text-sm font-semibold py-3 rounded-md hover:bg-[#0052cc] transition mb-3"
      >
        Start Free Review
      </a>

      <button
        id="openChecklistPopupMobileMenu"
        type="button"
        class="block w-full border border-white/20 text-white text-sm font-semibold py-3 rounded-md hover:bg-white hover:text-black transition"
      >
        Get the 17-point Checklist
      </button>
    </div>
  </div>

</header>
`;

  const floatingBarHtml = `
<div
  id="floatingPitchBar"
  class="hidden md:block fixed left-4 right-4 top-[96px] z-[60] transition-all duration-500"
>
  <div class="max-w-5xl mx-auto bg-black/70 backdrop-blur-md border border-white/10 rounded-full shadow-[0_0_35px_rgba(0,0,0,0.45)] px-4 md:px-6 py-3">
    <p class="text-[11px] md:text-sm text-gray-400 leading-relaxed text-center">
      <span class="text-white/70">Your project is not landing.</span>

      <a
        href="project-review.html"
        class="text-[#0066FF] hover:text-white transition underline underline-offset-4 decoration-[#0066FF]/40 hover:decoration-white/60"
      >
        Get a free project review
      </a>

      <span class="text-white/70">before you pitch again.</span>
      <span class="text-white/40">Or</span>

      <button
        id="openChecklistPopupFloating"
        type="button"
        class="text-[#0066FF] hover:text-white transition underline underline-offset-4 decoration-[#0066FF]/40 hover:decoration-white/60"
      >
        get the checklist
      </button>

      <span class="text-white/70">first.</span>
    </p>
  </div>
</div>
`;

  const footerHtml = `
<footer id="proofSharedFooter" class="bg-[#0A0A0A] py-12 border-t border-white/10">
  <div class="max-w-6xl mx-auto px-4">
    <div class="grid md:grid-cols-3 gap-8 items-start">
      <div>
        <img
          src="proof-logo/Proof_header_good.png"
          alt="PROOF"
          class="w-[145px] md:w-[185px] h-auto object-contain opacity-80"
        />

        <p class="text-sm text-gray-500 leading-relaxed max-w-sm">
          Free project reviews and cinematic visual proof for scripts, decks, concepts, and entertainment pitches.
        </p>
      </div>

      <div>
        <p class="text-sm uppercase tracking-[0.25em] text-gray-600 mb-4">
          Site
        </p>

        <div class="grid grid-cols-2 gap-3 text-sm text-gray-400">
          <a href="index.html#project-fit-review" class="hover:text-white transition">Free Review</a>
          <a href="index.html#examples" class="hover:text-white transition">Examples</a>
          <a href="index.html#how-it-works" class="hover:text-white transition">How It Works</a>
          <a href="index.html#what-is-proof" class="hover:text-white transition">What Is PROOF?</a>
          <a href="products.html" class="hover:text-white transition">Products</a>
          <a href="development.html" class="hover:text-white transition">PROOF: Dev</a>
          <a href="faq.html" class="hover:text-white transition">FAQ</a>

          <button id="openChecklistPopupFooter" type="button" class="text-left hover:text-white transition">
            Checklist
          </button>
        </div>
      </div>

      <div>
        <p class="text-sm uppercase tracking-[0.25em] text-gray-600 mb-4">
          Legal
        </p>

        <div class="flex flex-col gap-3 text-sm text-gray-400">
          <a href="privacy.html" class="hover:text-white transition">Privacy Policy</a>
          <a href="terms.html" class="hover:text-white transition">Terms</a>

          <a
            href="https://www.instagram.com/needmoreproof/"
            class="hover:text-white transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>
    </div>

    <div class="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-gray-600">
      <p>
        &copy; 2026 ProofLab, LLC. All rights reserved. PROOF and ProofLab, LLC provide creative development, visual storytelling, and proof-of-concept production services intended to support presentation, pitching, audience engagement, and project development efforts. While our materials are designed to help communicate creative vision and project potential, ProofLab, LLC makes no guarantees, representations, or warranties regarding financing, distribution, acquisition, commercial success, audience performance, talent attachment, or the purchase, optioning, licensing, or production of any project. All creative and business outcomes remain dependent on numerous external factors beyond our control.
      </p>
    </div>
  </div>
</footer>
`;

  const toTopHtml = `
<a
  id="proofSharedToTop"
  href="#"
  class="fixed bottom-6 left-6 z-50 w-11 h-11 rounded-full bg-black/70 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition"
  aria-label="Back to top"
>
  &uarr;
</a>
`;

  const popupHtml = `
<div id="emailPopup" class="fixed inset-0 bg-black/80 flex items-center justify-center z-[999] hidden px-4">
  <div class="bg-[#18181B] p-6 md:p-8 rounded-lg border border-white/10 max-w-md w-full text-center relative">
    <button id="closePopup" type="button" class="absolute top-3 right-3 text-gray-400 text-2xl hover:text-white transition" aria-label="Close popup">
      &times;
    </button>

    <h2 class="text-xl md:text-2xl font-semibold text-center leading-tight">
      <span class="text-[#0066FF]">
        Get the Free Pitch Asset Checklist
      </span>
    </h2>

    <p class="text-gray-400 text-sm mb-5 mt-4">
      17 things your film pitch needs before asking for money.
    </p>

    <form
      id="emailForm"
      action="https://app.kit.com/forms/9363800/subscriptions"
      method="post"
      class="flex flex-col gap-3"
    >
      <input
        type="email"
        name="email_address"
        placeholder="Your email"
        required
        class="px-4 py-3 rounded-md bg-black border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#0066FF]"
      />

      <button
        type="submit"
        class="bg-[#0066FF] py-3 rounded-md text-white font-medium hover:bg-blue-600 transition w-full"
      >
        Send Me the Checklist
      </button>
    </form>

    <div id="emailSuccess" class="hidden mt-4">
      <div class="bg-black border border-[#0066FF]/30 rounded-md px-4 py-5 text-center">
        <p class="text-[#0066FF] text-lg font-medium text-center mb-3">
          Your checklist is ready.
        </p>

        <p class="text-gray-400 text-sm mb-5">
          Download it now and use it before your next pitch, investor conversation, or project review.
        </p>

        <a
          id="downloadChecklistBtn"
          href="/pitch-asset-checklist.png"
          download="pitch-asset-checklist.png"
          class="block bg-[#0066FF] py-3 rounded-md text-white font-medium hover:bg-blue-600 transition w-full text-center"
        >
          Download the Checklist
        </a>
      </div>
    </div>
  </div>
</div>
`;

  document.querySelectorAll("header").forEach(element => element.remove());
  document.querySelectorAll("footer").forEach(element => element.remove());
  document.querySelectorAll("#floatingPitchBar, #emailPopup, #proofSharedHeader, #proofSharedFooter, #proofSharedToTop").forEach(element => element.remove());
  document.querySelectorAll('a[aria-label="Back to top"]').forEach(element => element.remove());

  document.body.insertAdjacentHTML("afterbegin", floatingBarHtml);
  document.body.insertAdjacentHTML("afterbegin", headerHtml);
  document.body.insertAdjacentHTML("beforeend", footerHtml + toTopHtml + popupHtml);

  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuIcon = document.getElementById("menuIcon");

  function setMobileMenu(open) {
    if (!menuBtn || !mobileMenu || !menuIcon) return;

    if (open) {
      mobileMenu.classList.remove("hidden");
      menuIcon.innerHTML = "&times;";
      menuBtn.setAttribute("aria-label", "Close menu");
      menuBtn.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-open");
    } else {
      mobileMenu.classList.add("hidden");
      menuIcon.innerHTML = "&#9776;";
      menuBtn.setAttribute("aria-label", "Open menu");
      menuBtn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    }
  }

  if (menuBtn && mobileMenu && menuIcon) {
    menuBtn.addEventListener("click", event => {
      event.stopPropagation();
      const isOpen = !mobileMenu.classList.contains("hidden");
      setMobileMenu(!isOpen);
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        setMobileMenu(false);
      });
    });

    document.addEventListener("click", event => {
      if (!mobileMenu.contains(event.target) && !menuBtn.contains(event.target)) {
        setMobileMenu(false);
      }
    });
  }

  const floatingBar = document.getElementById("floatingPitchBar");

  if (floatingBar) {
    window.addEventListener("scroll", () => {
      const hideAfter = window.innerHeight * 1.25;

      if (window.scrollY > hideAfter) {
        floatingBar.classList.add("opacity-0", "-translate-y-4", "pointer-events-none");
      } else {
        floatingBar.classList.remove("opacity-0", "-translate-y-4", "pointer-events-none");
      }
    });
  }

  const popup = document.getElementById("emailPopup");
  const closePopupBtn = document.getElementById("closePopup");
  const emailForm = document.getElementById("emailForm");
  const emailSuccess = document.getElementById("emailSuccess");
  const downloadChecklistBtn = document.getElementById("downloadChecklistBtn");

  const checklistButtons = [
    document.getElementById("openChecklistPopupFloating"),
    document.getElementById("openChecklistPopupMobileMenu"),
    document.getElementById("openChecklistPopupSection"),
    document.getElementById("openChecklistPopupFooter")
  ];

  let popupShown = false;

  function openChecklistPopup() {
    if (!popup) return;

    popup.classList.remove("hidden");
    popupShown = true;
    document.body.classList.add("modal-open");

    if (emailForm) {
      emailForm.classList.remove("hidden");
      emailForm.reset();
    }

    if (emailSuccess) {
      emailSuccess.classList.add("hidden");
    }

    setMobileMenu(false);
  }

  function closeChecklistPopup(storeClosed = true) {
    if (!popup) return;

    popup.classList.add("hidden");
    document.body.classList.remove("modal-open");

    if (storeClosed) {
      localStorage.setItem("proofPopupClosed", "true");
    }
  }

  checklistButtons.forEach(button => {
    if (!button) return;
    button.addEventListener("click", openChecklistPopup);
  });

  if (closePopupBtn) {
    closePopupBtn.addEventListener("click", () => {
      closeChecklistPopup(true);
    });
  }

  if (popup) {
    popup.addEventListener("click", event => {
      if (event.target === popup) {
        closeChecklistPopup(true);
      }
    });
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      setMobileMenu(false);
      closeChecklistPopup(false);
    }
  });

  const popupClosed = localStorage.getItem("proofPopupClosed");
  const popupSubscribed = localStorage.getItem("proofSubscribed");

  if (!popupClosed && !popupSubscribed) {
    document.addEventListener("mouseleave", event => {
      if (event.clientY < 10 && !popupShown) {
        openChecklistPopup();
      }
    });

    setTimeout(() => {
      if (!popupShown) {
        openChecklistPopup();
      }
    }, 25000);
  }

  if (emailForm) {
    emailForm.addEventListener("submit", event => {
      event.preventDefault();

      const form = event.target;
      const data = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json"
        }
      })
      .then(() => {
        localStorage.setItem("proofSubscribed", "true");
        form.classList.add("hidden");

        if (emailSuccess) {
          emailSuccess.classList.remove("hidden");
        }
      })
      .catch(() => {
        alert("Something went wrong. Try again.");
      });
    });
  }

  if (downloadChecklistBtn) {
    downloadChecklistBtn.addEventListener("click", () => {
      setTimeout(() => {
        closeChecklistPopup(false);
      }, 300);
    });
  }

  if (window.location.hash === "#checklist") {
    setTimeout(() => {
      openChecklistPopup();
      history.replaceState(null, "", window.location.pathname);
    }, 500);
  }
});















// MOBILE MENU WATCH PREVIEW BRIDGE
document.addEventListener("DOMContentLoaded", function () {
  function wireMobileWatchPreview() {
    const menuPreviewButtons = document.querySelectorAll("[data-mobile-watch-preview]");

    if (!menuPreviewButtons.length) return;

    const previewOpeners = [
      document.getElementById("openVideoModalMobile"),
      document.getElementById("openVideoModal"),
      document.getElementById("openSizzleVideo"),
      document.getElementById("openTrailerVideo"),
      document.getElementById("openSceneVideo"),
      document.getElementById("openConceptVideo"),
      document.getElementById("openExamplesVideo")
    ].filter(Boolean);

    menuPreviewButtons.forEach(function (button) {
      if (!previewOpeners.length) {
        button.classList.add("hidden");
        return;
      }

      button.classList.remove("hidden");

      if (button.dataset.previewWired === "true") return;

      button.dataset.previewWired = "true";

      button.addEventListener("click", function () {
        const mobileMenu = document.getElementById("mobileMenu");
        const menuIcon = document.getElementById("menuIcon");

        if (mobileMenu) {
          mobileMenu.classList.add("hidden");
        }

        if (menuIcon) {
          menuIcon.innerHTML = "&#9776;";
        }

        document.body.classList.remove("menu-open");

        previewOpeners[0].click();
      });
    });
  }

  wireMobileWatchPreview();
  window.setTimeout(wireMobileWatchPreview, 300);
});


