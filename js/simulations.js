/* ==========================================================================
   SPACE EXPLORER - Interactive Simulations Engine
   ========================================================================== */

// 1. Multi-Planet Weight Calculator Data
const CELESTIAL_GRAVITY = [
  { name: 'Mercury', gravity: 3.70, icon: '☿' },
  { name: 'Venus', gravity: 8.87, icon: '♀' },
  { name: 'The Moon', gravity: 1.62, icon: '🌙' },
  { name: 'Earth', gravity: 9.81, icon: '🌍' },
  { name: 'Mars', gravity: 3.71, icon: '♂' },
  { name: 'Jupiter', gravity: 24.79, icon: '♃' },
  { name: 'Saturn', gravity: 10.44, icon: '♄' },
  { name: 'Uranus', gravity: 8.69, icon: '♅' },
  { name: 'Neptune', gravity: 11.15, icon: '♆' },
  { name: 'The Sun', gravity: 274.0, icon: '☀️' }
];

// 2. Cosmic Scale Zoom Dataset
const COSMIC_SCALES = [
  { level: 1, name: 'Human', scale: '1.7 meters (10^0 m)', desc: 'Human being standing on planet Earth.' },
  { level: 2, name: 'Mount Everest', scale: '8.8 km (10^4 m)', desc: 'Tallest mountain peak above sea level on Earth.' },
  { level: 3, name: 'Planet Earth', scale: '12,742 km (10^7 m)', desc: 'Our blue marble home world in space.' },
  { level: 4, name: 'Earth-Moon Distance', scale: '384,400 km (10^8 m)', desc: 'Average orbital distance between Earth and Luna.' },
  { level: 5, name: 'Solar System', scale: '9 Billion km (10^13 m)', desc: 'Sun, 8 major planets, moons, and Kuiper Belt.' },
  { level: 6, name: 'Milky Way Galaxy', scale: '100,000 Light Years (10^21 m)', desc: 'Spiral galaxy containing 200+ billion stars.' },
  { level: 7, name: 'Local Group', scale: '10 Million Light Years (10^23 m)', desc: 'Galaxy cluster including Milky Way, Andromeda, and Triangulum.' },
  { level: 8, name: 'Observable Universe', scale: '93 Billion Light Years (10^26 m)', desc: 'The entire sphere of space visible from Earth.' }
];

// 3. Orbit Simulation Canvas Engine
class OrbitSimulator {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.speedSlider = document.getElementById('orbit-speed-slider');
    this.distSlider = document.getElementById('orbit-dist-slider');
    this.pauseBtn = document.getElementById('orbit-pause-btn');

    this.angle = 0;
    this.isPaused = false;
    this.trail = [];

    this.init();
  }

  init() {
    if (this.pauseBtn) {
      this.pauseBtn.addEventListener('click', () => {
        this.isPaused = !this.isPaused;
        this.pauseBtn.textContent = this.isPaused ? 'RESUME ▶' : 'PAUSE ⏸';
      });
    }

    this.animate();
  }

  animate() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    this.ctx.clearRect(0, 0, w, h);

    const dist = this.distSlider ? parseFloat(this.distSlider.value) : 120;
    const speed = this.speedSlider ? parseFloat(this.speedSlider.value) : 0.02;

    if (!this.isPaused) {
      this.angle += speed;
    }

    // Draw Orbit Path Ellipse
    this.ctx.beginPath();
    this.ctx.ellipse(cx, cy, dist, dist * 0.75, 0, 0, Math.PI * 2);
    this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([5, 5]);
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    // Draw Central Sun
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, 22, 0, Math.PI * 2);
    this.ctx.fillStyle = '#ffaa00';
    this.ctx.shadowColor = '#ffaa00';
    this.ctx.shadowBlur = 25;
    this.ctx.fill();
    this.ctx.shadowBlur = 0;

    // Calculate Orbiting Planet Position
    const px = cx + Math.cos(this.angle) * dist;
    const py = cy + Math.sin(this.angle) * (dist * 0.75);

    // Record trail
    this.trail.push({ x: px, y: py });
    if (this.trail.length > 25) this.trail.shift();

    // Draw Trail
    this.trail.forEach((pt, i) => {
      this.ctx.beginPath();
      this.ctx.arc(pt.x, pt.y, 3 * (i / 25), 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(0, 240, 255, ${i / 25})`;
      this.ctx.fill();
    });

    // Draw Orbiting Planet
    this.ctx.beginPath();
    this.ctx.arc(px, py, 10, 0, Math.PI * 2);
    this.ctx.fillStyle = '#00f0ff';
    this.ctx.shadowColor = '#00f0ff';
    this.ctx.shadowBlur = 15;
    this.ctx.fill();
    this.ctx.shadowBlur = 0;

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Weight Calculator Engine Setup
  const weightInput = document.getElementById('calc-earth-weight');
  const weightResultsGrid = document.getElementById('weight-results-grid');

  if (weightInput && weightResultsGrid) {
    const updateWeightResults = () => {
      const kg = parseFloat(weightInput.value);
      if (isNaN(kg) || kg <= 0) return;

      weightResultsGrid.innerHTML = '';
      CELESTIAL_GRAVITY.forEach(body => {
        const w = (kg * (body.gravity / 9.81)).toFixed(1);
        const card = document.createElement('div');
        card.className = 'glass-panel';
        card.style.padding = '1rem';
        card.style.textAlign = 'center';
        card.innerHTML = `
          <div style="font-size: 1.8rem; margin-bottom: 0.3rem;">${body.icon}</div>
          <div style="font-family: var(--font-display); font-size: 0.85rem; color: var(--text-muted);">${body.name}</div>
          <div style="font-family: var(--font-display); font-size: 1.4rem; font-weight: 700; color: var(--primary-cyan); margin-top: 0.4rem;">${w} kg</div>
        `;
        weightResultsGrid.appendChild(card);
      });
    };

    weightInput.addEventListener('input', updateWeightResults);
    updateWeightResults();
  }

  // 2. Space Scale Zoom Engine Setup
  const scaleSlider = document.getElementById('cosmic-scale-slider');
  const scaleName = document.getElementById('cosmic-scale-name');
  const scaleValue = document.getElementById('cosmic-scale-value');
  const scaleDesc = document.getElementById('cosmic-scale-desc');

  if (scaleSlider && scaleName && scaleValue && scaleDesc) {
    const updateScaleView = () => {
      const idx = parseInt(scaleSlider.value) - 1;
      const data = COSMIC_SCALES[idx];
      if (data) {
        scaleName.textContent = data.name;
        scaleValue.textContent = data.scale;
        scaleDesc.textContent = data.desc;
      }
    };

    scaleSlider.addEventListener('input', updateScaleView);
    updateScaleView();
  }

  // 3. Orbit Simulator Canvas Setup
  const orbitCanvas = document.getElementById('orbit-canvas');
  if (orbitCanvas) {
    orbitCanvas.width = 600;
    orbitCanvas.height = 360;
    new OrbitSimulator('orbit-canvas');
  }
});
