/* ==========================================================================
   SPACE EXPLORER - Planet & Moon Comparison Matrix Engine
   ========================================================================== */

const COMPARE_DATA = {
  mercury: { name: 'Mercury', diameterKm: 4879, gravityMs: 3.70, moons: 0, dayHours: 1406, yearDays: 88, tempC: 167, distanceAu: 0.39, color: '#8c8c8c' },
  venus: { name: 'Venus', diameterKm: 12104, gravityMs: 8.87, moons: 0, dayHours: 5832, yearDays: 225, tempC: 465, distanceAu: 0.72, color: '#e3bb76' },
  earth: { name: 'Earth', diameterKm: 12742, gravityMs: 9.81, moons: 1, dayHours: 24.0, yearDays: 365, tempC: 15, distanceAu: 1.00, color: '#2b82c9' },
  mars: { name: 'Mars', diameterKm: 6779, gravityMs: 3.71, moons: 2, dayHours: 24.6, yearDays: 687, tempC: -63, distanceAu: 1.52, color: '#c85a32' },
  jupiter: { name: 'Jupiter', diameterKm: 139820, gravityMs: 24.79, moons: 95, dayHours: 9.9, yearDays: 4333, tempC: -110, distanceAu: 5.20, color: '#d89a64' },
  saturn: { name: 'Saturn', diameterKm: 116460, gravityMs: 10.44, moons: 146, dayHours: 10.7, yearDays: 10759, tempC: -140, distanceAu: 9.58, color: '#e4d191' },
  uranus: { name: 'Uranus', diameterKm: 50724, gravityMs: 8.69, moons: 28, dayHours: 17.2, yearDays: 30687, tempC: -195, distanceAu: 19.22, color: '#7de3f4' },
  neptune: { name: 'Neptune', diameterKm: 49244, gravityMs: 11.15, moons: 16, dayHours: 16.1, yearDays: 60190, tempC: -200, distanceAu: 30.05, color: '#3262d6' },
  moon: { name: 'The Moon', diameterKm: 3474, gravityMs: 1.62, moons: 0, dayHours: 708, yearDays: 27.3, tempC: -20, distanceAu: 1.00, color: '#cccccc' },
  europa: { name: 'Europa', diameterKm: 3122, gravityMs: 1.31, moons: 0, dayHours: 85, yearDays: 3.5, tempC: -160, distanceAu: 5.20, color: '#aaddff' }
};

class CompareEngine {
  constructor() {
    this.selectA = document.getElementById('select-planet-a');
    this.selectB = document.getElementById('select-planet-b');
    this.canvas = document.getElementById('compare-scale-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;

    if (this.selectA && this.selectB) {
      this.init();
    }
  }

  init() {
    this.populateSelectors();
    this.selectA.value = 'earth';
    this.selectB.value = 'mars';

    this.selectA.addEventListener('change', () => this.update());
    this.selectB.addEventListener('change', () => this.update());

    const swapBtn = document.getElementById('swap-compare-btn');
    if (swapBtn) {
      swapBtn.addEventListener('click', () => {
        const tmp = this.selectA.value;
        this.selectA.value = this.selectB.value;
        this.selectB.value = tmp;
        this.update();
      });
    }

    this.update();
  }

  populateSelectors() {
    const keys = Object.keys(COMPARE_DATA);
    [this.selectA, this.selectB].forEach(select => {
      select.innerHTML = '';
      keys.forEach(key => {
        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = COMPARE_DATA[key].name;
        select.appendChild(opt);
      });
    });
  }

  update() {
    const itemA = COMPARE_DATA[this.selectA.value];
    const itemB = COMPARE_DATA[this.selectB.value];

    this.renderCanvasScale(itemA, itemB);
    this.renderTable(itemA, itemB);
  }

  renderCanvasScale(itemA, itemB) {
    if (!this.canvas || !this.ctx) return;

    const w = this.canvas.width;
    const h = this.canvas.height;
    this.ctx.clearRect(0, 0, w, h);

    const maxDiameter = Math.max(itemA.diameterKm, itemB.diameterKm);
    const maxRadiusPx = (h / 2) * 0.75;

    const rA = (itemA.diameterKm / maxDiameter) * maxRadiusPx;
    const rB = (itemB.diameterKm / maxDiameter) * maxRadiusPx;

    const cxA = w * 0.28;
    const cxB = w * 0.72;
    const cy = h / 2;

    // Draw Planet A
    this.ctx.beginPath();
    this.ctx.arc(cxA, cy, rA, 0, Math.PI * 2);
    this.ctx.fillStyle = itemA.color;
    this.ctx.shadowColor = itemA.color;
    this.ctx.shadowBlur = 20;
    this.ctx.fill();
    this.ctx.shadowBlur = 0;

    // Label A
    this.ctx.font = '700 14px Orbitron';
    this.ctx.fillStyle = '#ffffff';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(itemA.name, cxA, cy + rA + 25);
    this.ctx.font = '12px Plus Jakarta Sans';
    this.ctx.fillStyle = '#94a3b8';
    this.ctx.fillText(`${itemA.diameterKm.toLocaleString()} km`, cxA, cy + rA + 42);

    // Draw Planet B
    this.ctx.beginPath();
    this.ctx.arc(cxB, cy, rB, 0, Math.PI * 2);
    this.ctx.fillStyle = itemB.color;
    this.ctx.shadowColor = itemB.color;
    this.ctx.shadowBlur = 20;
    this.ctx.fill();
    this.ctx.shadowBlur = 0;

    // Label B
    this.ctx.font = '700 14px Orbitron';
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillText(itemB.name, cxB, cy + rB + 25);
    this.ctx.font = '12px Plus Jakarta Sans';
    this.ctx.fillStyle = '#94a3b8';
    this.ctx.fillText(`${itemB.diameterKm.toLocaleString()} km`, cxB, cy + rB + 42);
  }

  renderTable(itemA, itemB) {
    const tbody = document.getElementById('compare-table-body');
    if (!tbody) return;

    const metrics = [
      { label: 'Diameter', valA: `${itemA.diameterKm.toLocaleString()} km`, valB: `${itemB.diameterKm.toLocaleString()} km`, diff: itemA.diameterKm > itemB.diameterKm ? 'A > B' : 'B > A' },
      { label: 'Surface Gravity', valA: `${itemA.gravityMs} m/s²`, valB: `${itemB.gravityMs} m/s²`, diff: itemA.gravityMs > itemB.gravityMs ? 'A > B' : 'B > A' },
      { label: 'Moons Count', valA: itemA.moons, valB: itemB.moons, diff: itemA.moons > itemB.moons ? 'A > B' : 'B > A' },
      { label: 'Day Length', valA: `${itemA.dayHours} hrs`, valB: `${itemB.dayHours} hrs`, diff: '-' },
      { label: 'Year Length', valA: `${itemA.yearDays} Earth days`, valB: `${itemB.yearDays} Earth days`, diff: '-' },
      { label: 'Avg Temperature', valA: `${itemA.tempC} °C`, valB: `${itemB.tempC} °C`, diff: '-' },
      { label: 'Distance from Sun', valA: `${itemA.distanceAu} AU`, valB: `${itemB.distanceAu} AU`, diff: '-' }
    ];

    tbody.innerHTML = '';
    metrics.forEach(m => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="padding: 1rem; font-weight: 600; color: var(--primary-cyan);">${m.label}</td>
        <td style="padding: 1rem; text-align: center;">${m.valA}</td>
        <td style="padding: 1rem; text-align: center;">${m.valB}</td>
      `;
      tbody.appendChild(tr);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CompareEngine();
});
