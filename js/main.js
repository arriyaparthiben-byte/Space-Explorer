/* ==========================================================================
   SPACE EXPLORER - Core Logic, Starfield, Audio & Global Search
   ========================================================================== */

// 1. Web Audio API Sci-Fi Sound Engine
class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.enabled = true;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.08);
    } catch (e) {
      // Audio context fallbacks
    }
  }

  playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.1, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.25);
      });
    } catch (e) {}
  }
}

const spaceSound = new SoundEngine();

// 2. Dynamic Canvas Starfield Background
class Starfield {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.shootingStars = [];
    this.numStars = 200;
    this.mouseX = 0;
    this.mouseY = 0;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Create stars
    for (let i = 0; i < this.numStars; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.5 + 0.3,
        alpha: Math.random(),
        twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
        color: ['#ffffff', '#80d4ff', '#ffdf80', '#e0b0ff'][Math.floor(Math.random() * 4)]
      });
    }

    // Parallax mouse listener
    window.addEventListener('mousemove', (e) => {
      this.mouseX = (e.clientX - this.width / 2) * 0.02;
      this.mouseY = (e.clientY - this.height / 2) * 0.02;
    });

    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  spawnShootingStar() {
    if (Math.random() < 0.015 && this.shootingStars.length < 2) {
      this.shootingStars.push({
        x: Math.random() * this.width * 0.8,
        y: Math.random() * this.height * 0.4,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 10 + 12,
        alpha: 1,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw twinkling stars
    this.stars.forEach(star => {
      star.alpha += star.twinkleSpeed;
      if (star.alpha >= 1 || star.alpha <= 0.1) {
        star.twinkleSpeed = -star.twinkleSpeed;
      }

      const px = star.x + this.mouseX * (star.radius * 0.5);
      const py = star.y + this.mouseY * (star.radius * 0.5);

      this.ctx.beginPath();
      this.ctx.arc(px, py, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = star.color;
      this.ctx.globalAlpha = star.alpha;
      this.ctx.fill();
    });

    // Handle shooting stars
    this.spawnShootingStar();
    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const ss = this.shootingStars[i];
      const endX = ss.x + Math.cos(ss.angle) * ss.length;
      const endY = ss.y + Math.sin(ss.angle) * ss.length;

      const grad = this.ctx.createLinearGradient(ss.x, ss.y, endX, endY);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      grad.addColorStop(1, `rgba(0, 240, 255, ${ss.alpha})`);

      this.ctx.beginPath();
      this.ctx.moveTo(ss.x, ss.y);
      this.ctx.lineTo(endX, endY);
      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      ss.x += Math.cos(ss.angle) * ss.speed;
      ss.y += Math.sin(ss.angle) * ss.speed;
      ss.alpha -= 0.015;

      if (ss.alpha <= 0 || ss.x > this.width || ss.y > this.height) {
        this.shootingStars.splice(i, 1);
      }
    }

    this.ctx.globalAlpha = 1;
    requestAnimationFrame(() => this.animate());
  }
}

// 3. Universal Search Registry Data
const GLOBAL_SEARCH_DATA = [
  { name: 'Mercury', category: 'Planet', url: 'planets.html?planet=mercury' },
  { name: 'Venus', category: 'Planet', url: 'planets.html?planet=venus' },
  { name: 'Earth', category: 'Planet', url: 'planets.html?planet=earth' },
  { name: 'Mars', category: 'Planet', url: 'planets.html?planet=mars' },
  { name: 'Jupiter', category: 'Planet', url: 'planets.html?planet=jupiter' },
  { name: 'Saturn', category: 'Planet', url: 'planets.html?planet=saturn' },
  { name: 'Uranus', category: 'Planet', url: 'planets.html?planet=uranus' },
  { name: 'Neptune', category: 'Planet', url: 'planets.html?planet=neptune' },
  { name: 'Moon (Luna)', category: 'Moon', url: 'moons.html?moon=moon' },
  { name: 'Europa', category: 'Moon (Ocean World)', url: 'moons.html?moon=europa' },
  { name: 'Titan', category: 'Moon (Ocean World)', url: 'moons.html?moon=titan' },
  { name: 'Ganymede', category: 'Moon', url: 'moons.html?moon=ganymede' },
  { name: 'Enceladus', category: 'Moon (Ocean World)', url: 'moons.html?moon=enceladus' },
  { name: 'Apollo 11', category: 'Space Mission', url: 'missions.html?mission=apollo11' },
  { name: 'Hubble Space Telescope', category: 'Spacecraft', url: 'spacecraft.html?craft=hubble' },
  { name: 'James Webb (JWST)', category: 'Spacecraft', url: 'spacecraft.html?craft=jwst' },
  { name: 'Voyager 1', category: 'Spacecraft', url: 'spacecraft.html?craft=voyager1' },
  { name: 'Black Holes', category: 'Deep Space', url: 'deep-space.html#black-holes' },
  { name: 'Neutron Stars', category: 'Deep Space', url: 'deep-space.html#stars' },
  { name: 'Exoplanets & Habitable Zone', category: 'Deep Space', url: 'deep-space.html#exoplanets' },
  { name: 'Weight Calculator', category: 'Simulation', url: 'simulations.html#weight-calc' },
  { name: 'Cosmic Scale Zoom', category: 'Simulation', url: 'simulations.html#cosmic-scale' },
  { name: 'Orbit Visualizer', category: 'Simulation', url: 'simulations.html#orbit-sim' },
  { name: 'Astronomy Quiz', category: 'Gamification', url: 'quiz.html' }
];

// 4. Random Space Facts Database & Widget Logic
const SPACE_FACTS = [
  "One day on Venus is longer than one year on Venus! Venus takes 243 Earth days to rotate once on its axis, but only 225 Earth days to travel around the Sun.",
  "Neutron stars are so dense that a single teaspoon of neutron star material would weigh over 6 billion tons on Earth!",
  "Jupiter's Great Red Spot is a giant storm larger than Earth itself that has been raging for at least 350 years.",
  "Olympus Mons on Mars is the largest volcano in the Solar System. It is three times higher than Mount Everest and about the size of Arizona!",
  "There are more trees on Earth (about 3 trillion) than there are stars in the Milky Way galaxy (approx. 100 to 400 billion).",
  "Saturn's rings aren't solid; they are composed of billions of individual chunks of ice, rock, and dust ranging from microscopic specs to house-sized boulders.",
  "Space is completely silent because there is no atmosphere or medium for sound waves to travel through.",
  "Footprints left on the Moon by Apollo astronauts will remain visible for millions of years because there is no wind or water erosion on the lunar surface.",
  "Sunlight takes approximately 8 minutes and 20 seconds to travel 93 million miles to reach Earth."
];

// 5. Global Document Ready Setup
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Starfield Canvas
  if (document.getElementById('starfield-canvas')) {
    new Starfield('starfield-canvas');
  }

  // Audio Click Binding
  document.querySelectorAll('button, a, .planet-node, .option-btn').forEach(btn => {
    btn.addEventListener('click', () => spaceSound.playClick());
  });

  // Mobile Menu Drawer Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });
  }

  // Active Link Highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Global Search Modal Handlers
  const searchBtn = document.getElementById('search-btn');
  const searchOverlay = document.getElementById('search-modal-overlay');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  const openSearch = () => {
    if (searchOverlay) {
      searchOverlay.classList.add('active');
      if (searchInput) searchInput.focus();
    }
  };

  const closeSearch = () => {
    if (searchOverlay) {
      searchOverlay.classList.remove('active');
    }
  };

  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);

  // Keyboard shortcut Ctrl+K or / to open search
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && document.activeElement.tagName !== 'INPUT')) {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape') closeSearch();
  });

  // Live Search Filtering
  if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      searchResults.innerHTML = '';

      if (!query) return;

      const filtered = GLOBAL_SEARCH_DATA.filter(item => 
        item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
      );

      if (filtered.length === 0) {
        searchResults.innerHTML = `<div style="text-align:center; padding: 1.5rem; color: var(--text-muted);">No cosmic discoveries matched "${query}"</div>`;
        return;
      }

      filtered.forEach(item => {
        const el = document.createElement('a');
        el.className = 'search-result-item';
        el.href = item.url;
        el.innerHTML = `
          <span class="search-result-title">${item.name}</span>
          <span class="search-result-cat badge">${item.category}</span>
        `;
        searchResults.appendChild(el);
      });
    });
  }

  // Random Fact Generator Binding
  const factTextEl = document.getElementById('fact-text-display');
  const newFactBtn = document.getElementById('new-fact-btn');

  if (factTextEl && newFactBtn) {
    const setRandomFact = () => {
      const idx = Math.floor(Math.random() * SPACE_FACTS.length);
      factTextEl.style.opacity = '0';
      setTimeout(() => {
        factTextEl.textContent = SPACE_FACTS[idx];
        factTextEl.style.opacity = '1';
      }, 200);
    };

    newFactBtn.addEventListener('click', () => {
      spaceSound.playClick();
      setRandomFact();
    });
    setRandomFact();
  }

  // Back to Top Button
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
