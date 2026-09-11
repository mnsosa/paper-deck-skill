const slides = Array.from(document.querySelectorAll('.slide'));
const progressBar = document.getElementById('progressBar');
const counter = document.getElementById('counter');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let current = 0;
let sceneAnimation = null;
let touchStartX = null;

function hasAnime() {
  return typeof anime !== 'undefined' && !reducedMotion.matches;
}

function reveal(targets, options = {}) {
  const elements = typeof targets === 'string' ? document.querySelectorAll(targets) : targets;
  if (!hasAnime()) {
    elements.forEach((element) => {
      element.style.opacity = 1;
      element.style.transform = 'none';
    });
    return;
  }
  anime({
    targets: elements,
    opacity: [0, 1],
    translateY: [22, 0],
    easing: 'easeOutExpo',
    duration: 650,
    delay: anime.stagger(90),
    ...options
  });
}

function resetSlide(slide) {
  slide.querySelectorAll('[data-anim]').forEach((element) => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(22px)';
  });
}

function runScene(slide) {
  reveal(slide.querySelectorAll('[data-anim]'));
}

function showSlide(index) {
  if (sceneAnimation) sceneAnimation.pause();
  current = Math.max(0, Math.min(index, slides.length - 1));
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === current);
    slide.setAttribute('aria-hidden', String(slideIndex !== current));
    resetSlide(slide);
  });
  progressBar.style.width = `${((current + 1) / slides.length) * 100}%`;
  counter.textContent = `${current + 1} / ${slides.length}`;
  document.title = `${slides[current].querySelector('h1, h2')?.textContent ?? 'Paper Deck'} · ${current + 1}/${slides.length}`;
  runScene(slides[current]);
}

function next() {
  showSlide(current + 1);
}

function previous() {
  showSlide(current - 1);
}

document.addEventListener('keydown', (event) => {
  if (['ArrowRight', 'PageDown', ' '].includes(event.key)) {
    event.preventDefault();
    next();
  }
  if (['ArrowLeft', 'PageUp', 'Backspace'].includes(event.key)) {
    event.preventDefault();
    previous();
  }
  if (event.key.toLowerCase() === 'f') {
    document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
  }
});

document.addEventListener('click', (event) => {
  if (event.target.closest('a, button, input, textarea, select')) return;
  event.clientX / window.innerWidth > 0.5 ? next() : previous();
});

document.addEventListener('touchstart', (event) => {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });

document.addEventListener('touchend', (event) => {
  if (touchStartX === null) return;
  const distance = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(distance) > 50) distance < 0 ? next() : previous();
  touchStartX = null;
}, { passive: true });

reducedMotion.addEventListener('change', () => showSlide(current));
showSlide(0);
