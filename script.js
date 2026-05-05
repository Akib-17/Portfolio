// ============================================================
// script.js — Md Akib Personal Homepage
// ============================================================

/* ---------- Dark / Light Theme Toggle ---------- */
const themeToggle = document.getElementById('themeToggle');
const toggleIcon  = themeToggle?.querySelector('.toggle-icon');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (toggleIcon) toggleIcon.textContent = theme === 'light' ? '☾' : '☀';
}

// Load saved preference
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'light' ? 'dark' : 'light');
});

/* ---------- Footer: Location & Last Modified Date ---------- */
const footerMeta = document.getElementById('footerMeta');

function updateFooterMeta() {
  const lastModified = new Date(document.lastModified);
  const formattedDate = lastModified.toLocaleString('en-US', {
    weekday: 'short', year: 'numeric', month: 'short',
    day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  let locationLine = 'Dhaka, Bangladesh';

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(3);
        const lon = pos.coords.longitude.toFixed(3);
        locationLine = `Lat: ${lat}, Lon: ${lon}`;
        renderFooter(locationLine, formattedDate);
      },
      () => renderFooter(locationLine, formattedDate)
    );
  } else {
    renderFooter(locationLine, formattedDate);
  }
}

function renderFooter(location, date) {
  if (!footerMeta) return;
  footerMeta.innerHTML =
    `📍 Location: ${location}<br>🕐 Last Modified: ${date}`;
}

updateFooterMeta();

/* ---------- Copyright Year ---------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Contact Form Handler ---------- */
function handleFormSubmit(e) {
  e.preventDefault();
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const btn     = form.querySelector('.form-submit');
  const name    = form.querySelector('#fname').value.trim();
  const email   = form.querySelector('#femail').value.trim();

  if (!name || !email) return;

  // Simulate send (replace with actual mailto or service)
  btn.textContent  = 'Sending…';
  btn.disabled     = true;

  setTimeout(() => {
    form.reset();
    btn.textContent  = 'Send Message ✉';
    btn.disabled     = false;
    success.style.display = 'block';
    setTimeout(() => success.style.display = 'none', 5000);
  }, 1000);
}

/* ---------- Navbar: Add shadow on scroll ---------- */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  if (window.scrollY > 20) {
    nav.style.boxShadow = '0 2px 24px rgba(0,0,0,0.4)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

/* ---------- Animate skill bars on scroll ---------- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar span').forEach(bar => {
        bar.style.width = bar.style.width; // trigger reflow
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-table-wrap').forEach(el => observer.observe(el));
