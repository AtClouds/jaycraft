const primaryNav = document.querySelector('.primary-nav');
const navToggle = document.querySelector('.mobile-nav-toggle');
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');
const navLinks = document.querySelectorAll('.nav-link'); // all links inside nav

// Toggle open/close when clicking hamburger
navToggle.addEventListener('click', () => {
    const visibility = primaryNav.getAttribute('data-visible');

    if (visibility === "false") {
        primaryNav.setAttribute("data-visible", true);
        navToggle.setAttribute('aria-expanded', true);
        menuIcon.classList.add('sr-only');
        closeIcon.classList.remove('sr-only');
    } else {
        primaryNav.setAttribute("data-visible", false);
        navToggle.setAttribute('aria-expanded', false);
        menuIcon.classList.remove('sr-only');
        closeIcon.classList.add('sr-only');
    }
});

// Close menu + smooth scroll when a nav-link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault(); // stop default jump

        const targetId = link.getAttribute('data-target'); // custom data-target
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Close nav
        primaryNav.setAttribute('data-visible', false);
        navToggle.setAttribute('aria-expanded', false);
        menuIcon.classList.remove('sr-only');
        closeIcon.classList.add('sr-only');
    });
});



 tippy('.nav-link', {
    arrow: true,
    animation: 'fade',
    theme: 'custom',
    interactive: true,
    delay: 500,
    followCursor: true,
  });

  document.getElementById("hireMeBtn").addEventListener("click", function(){
  document.getElementById("contact-container").scrollIntoView({behavior: "smooth"});

  setTimeout(() => {
    if (confirm("Do you want to open Gmail to send me a message?")) {
      window.open("https://mail.google.com/mail/?view=cm&fs=1&to=joshuahon7@gmail.com", "_blank");
    }
  }, 1000);
});


window.addEventListener("DOMContentLoaded", () => {
    const greetingEl = document.getElementById("greeting-message");

    const hours = new Date().getHours();
    let greeting = "";

    if(hours < 12){
        greeting = "🌅 Good morning, Joshua here — welcome!";
    } else if (hours < 18){
        greeting = "☀️ Good afternoon, Joshua here — welcome!";
    } else{
        greeting = "🌙 Good evening, Joshua here — welcome!";
    }

    greetingEl.textContent = greeting;
    greetingEl.classList.remove("hidden")

    setTimeout(() => {
        greetingEl.classList.add("show")
    }, 100);

    setTimeout(() => {
        greetingEl.classList.remove("show");
        setTimeout(() => greetingEl.classList.add("hidden"), 400)
    }, 20000);
});


const toggleSwitch = document.querySelector('.switch input');

// Load saved theme
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('dark-mode');
  toggleSwitch.checked = true;
}

toggleSwitch.addEventListener('change', function() {
  if (this.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'dark');
  }
});


// Open modal when order button is clicked
document.querySelectorAll(".order-btn").forEach(btn => {
    btn.addEventListener("click", function() {
        document.getElementById("order-modal").style.display = "block";
        document.getElementById("order-plan").value = this.dataset.plan; 
    });
});

// Close modal when X is clicked
document.querySelector("#order-modal .close").addEventListener("click", function() {
    document.getElementById("order-modal").style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", function(event) {
    if (event.target.id === "order-modal") {
        document.getElementById("order-modal").style.display = "none";
    }
});



document.getElementById("order-form").addEventListener("submit", async function(e) {
    e.preventDefault(); // Prevent reload

    let form = e.target;
    let status = document.getElementById("form-status");
    let data = new FormData(form);

    fetch("https://formspree.io/f/xdkdjpjq", {
        method: "POST",
        body: data,
        headers: { "Accept": "application/json" }
    })
    .then(response => {
        if (response.ok) {
            status.style.display = "block";
            status.style.color = "green";
            status.innerHTML = "✅ Thank you! Your order has been sent.";
            form.reset();

            // Hide message after 5s
            setTimeout(() => {
                status.style.display = "none";
            }, 5000);
        } else {
            status.style.display = "block";
            status.style.color = "red";
            status.innerHTML = "❌ Oops! There was a problem sending your order.";
        }
    })
    .catch(() => {
        status.style.display = "block";
        status.style.color = "red";
        status.innerHTML = "❌ Network error. Please try again later.";
    });
});



window.addEventListener("load", () => {
  const track = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.slide');
  const slider = document.getElementById('slider-bar');
  const containerWidth = document.querySelector('.slider-container').offsetWidth;

  const slideWidth = slides[0].offsetWidth;
  const gap = parseInt(getComputedStyle(track).gap) || 0;
  const totalWidth = slides.length * slideWidth + (slides.length - 1) * gap;

  const maxTranslate = totalWidth - containerWidth;

  slider.addEventListener('input', () => {
    const percent = slider.value / 100;
    const move = percent * maxTranslate;
    track.style.transform = `translateX(-${move}px)`;
  });
});








// Run swipe only on mobile
if (/Mobile|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
  const sliderTrack = document.querySelector(".slider-track");
  let startX = 0;
  let scrollLeft = 0;
  let isDown = false;

  sliderTrack.addEventListener("touchstart", (e) => {
    isDown = true;
    startX = e.touches[0].pageX;
    scrollLeft = sliderTrack.scrollLeft;
  });

  sliderTrack.addEventListener("touchmove", (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX;
    const walk = (startX - x); // swipe distance
    sliderTrack.scrollLeft = scrollLeft + walk;
  });

  sliderTrack.addEventListener("touchend", () => {
    isDown = false;
  });
}



// Portfolio-layout

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".Portfolio-tabs h6");
  const grid = document.querySelector(".Portfolio-grid");
  const allImages = Array.from(grid.querySelectorAll("img"));
  let expanded = false;

  const collapsedCount = () => (window.innerWidth >= 768 ? 8 : 4);

  function wrapIfNeeded(img) {
    const parent = img.parentElement;
    if (parent && parent.classList.contains("image-wrapper")) return parent;
    const wrapper = document.createElement("div");
    wrapper.className = "image-wrapper";
    img.replaceWith(wrapper);
    wrapper.appendChild(img);
    return wrapper;
  }

  function renderGrid(categoryId) {
    grid.innerHTML = ""; // clear grid

    // filter
    let filtered = allImages;
    if (categoryId !== "1") {
      filtered = allImages.filter(img => img.dataset.categoryId === categoryId);
    }

    // overlay element (reuse or create once)
    let overlay = document.createElement("div");
    overlay.className = "more-overlay";

    function applyState() {
      const n = collapsedCount();
      const total = filtered.length;

      if (!expanded) {
        // collapsed mode
        filtered.forEach((img, i) => {
          img.style.display = i < n ? "" : "none";
          grid.appendChild(img);
        });

        const hidden = Math.max(total - n, 0);
        if (hidden > 0) {
          overlay.textContent = `+${hidden}`;
          overlay.classList.remove("tile");
          overlay.classList.add("overlay-on-image");
          overlay.style.display = "flex";

          const lastVisible = filtered[Math.min(n - 1, total - 1)];
          const wrapper = wrapIfNeeded(lastVisible);
          wrapper.style.position = "relative";
          wrapper.appendChild(overlay);
        }
      } else {
        // expanded mode
        filtered.forEach(img => {
          img.style.display = "";
          grid.appendChild(img);
        });

        overlay.textContent = "See less";
        overlay.classList.remove("overlay-on-image");
        overlay.classList.add("tile");
        overlay.style.display = "flex";
        grid.appendChild(overlay);
      }
    }

    overlay.onclick = () => {
      expanded = !expanded;
      renderGrid(categoryId);
    };

    applyState();
  }

  // tabs click
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      expanded = false; // reset when switching category
      renderGrid(tab.dataset.categoryId);
    });
  });

  // initial load
  renderGrid("1");

  window.addEventListener("resize", () => {
    const activeTab = document.querySelector(".Portfolio-tabs .active");
    renderGrid(activeTab ? activeTab.dataset.categoryId : "1");
  });
});


//-------Lucide Icons CDN ------>
  document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
  });





document.addEventListener("DOMContentLoaded", () => {
 const divs = document.querySelectorAll("div:not(.no-anim)");



  const animations = ["fade-up", "fade-left", "fade-right", "fade-in"];

  // Assign random animation direction to each div
  divs.forEach(div => {
    const randomAnim = animations[Math.floor(Math.random() * animations.length)];
    div.classList.add("intersectional", randomAnim);
  });

  // Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  }, {
    threshold: 0.2
  });

  divs.forEach(div => observer.observe(div));
});





// Select all icons with data-target
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // stop href="#" from resetting scroll

    const targetId = link.getAttribute("data-target");
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});




