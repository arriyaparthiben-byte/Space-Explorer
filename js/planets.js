/* ==========================================================================
   SPACE EXPLORER - Procedural 2D/3D Sphere Canvas Engine & Planet Data
   ========================================================================== */

// 1. Comprehensive Solar System Dataset
const PLANETS_DATA = {
  mercury: {
    name: 'Mercury',
    tagline: 'The Swift Iron Planet',
    type: 'Terrestrial Planet',
    distance: '57.9 Million km (0.39 AU)',
    diameter: '4,879 km',
    gravity: '3.70 m/s²',
    dayLength: '58.6 Earth days',
    yearLength: '88 Earth days',
    moons: 0,
    temp: '-180°C to 430°C',
    color1: '#8c8c8c',
    color2: '#4a4a4a',
    overview: 'Mercury is the smallest planet in our Solar System and the closest to the Sun. Its surface is covered in cratered terrain similar to Earth\'s Moon. Despite being closest to the Sun, Venus is actually hotter due to its greenhouse atmosphere.',
    atmosphere: 'Extremely thin exosphere consisting of trace oxygen, sodium, hydrogen, helium, and potassium.',
    surface: 'Heavily cratered silicate crust with massive scarps (cliffs) formed as the planet cooled and shrank.',
    weather: 'No atmosphere to retain heat, creating extreme temperature swings between day and night.',
    exploration: 'Visited by NASA Mariner 10, MESSENGER spacecraft, and ESA/JAXA BepiColombo mission.'
  },
  venus: {
    name: 'Venus',
    tagline: 'Earth\'s Toxic Twin',
    type: 'Terrestrial Planet',
    distance: '108.2 Million km (0.72 AU)',
    diameter: '12,104 km',
    gravity: '8.87 m/s²',
    dayLength: '243 Earth days',
    yearLength: '225 Earth days',
    moons: 0,
    temp: '465°C (Average)',
    color1: '#e3bb76',
    color2: '#a87932',
    overview: 'Venus is the second planet from the Sun and Earth\'s closest planetary neighbor. It has a thick, toxic atmosphere filled with carbon dioxide and clouds of sulfuric acid, trapping heat in a runaway greenhouse effect.',
    atmosphere: 'Dense carbon dioxide (96.5%) with clouds of sulfuric acid and surface pressure 92 times Earth\'s.',
    surface: 'Smooth volcanic plains, mountain ranges, and thousands of ancient shield volcanoes.',
    weather: 'Super-rotating hurricane-force winds in upper clouds and crushing heat on the surface.',
    exploration: 'Explored by Soviet Venera probes (which landed on the surface), NASA Magellan, and ESA Venus Express.'
  },
  earth: {
    name: 'Earth',
    tagline: 'Our Vibrant Blue Marble',
    type: 'Terrestrial Planet',
    distance: '149.6 Million km (1.00 AU)',
    diameter: '12,742 km',
    gravity: '9.81 m/s²',
    dayLength: '24.0 hours',
    yearLength: '365.25 days',
    moons: 1,
    temp: '-88°C to 58°C (Avg 15°C)',
    color1: '#2b82c9',
    color2: '#1b4d75',
    overview: 'Earth is our home planet, the third planet from the Sun, and the only world known so far to harbor life. With vast liquid water oceans, a protective magnetic field, and a breathable nitrogen-oxygen atmosphere, Earth is a cosmic oasis.',
    atmosphere: '78% Nitrogen, 21% Oxygen, 0.9% Argon, and trace carbon dioxide and water vapor.',
    surface: '71% covered in liquid water oceans, with continental landmasses, mountains, tectonic plates, and polar ice caps.',
    weather: 'Dynamic weather system driven by solar energy, oceanic currents, and jet streams.',
    exploration: 'Constantly monitored by thousands of Earth-observing satellites and human spaceflight.'
  },
  mars: {
    name: 'Mars',
    tagline: 'The Red Planet',
    type: 'Terrestrial Planet',
    distance: '227.9 Million km (1.52 AU)',
    diameter: '6,779 km',
    gravity: '3.71 m/s²',
    dayLength: '24.6 hours',
    yearLength: '687 Earth days',
    moons: 2,
    temp: '-140°C to 20°C (Avg -60°C)',
    color1: '#c85a32',
    color2: '#7a2d12',
    overview: 'Mars is a dusty, cold, desert world with a very thin atmosphere. It earned its title "The Red Planet" due to iron oxide (rust) in its soil. Ancient riverbeds and ice caps suggest Mars was once warmer and wetter.',
    atmosphere: 'Thin atmosphere dominated by Carbon Dioxide (95%), Nitrogen (2.6%), and Argon (1.9%).',
    surface: 'Home to Olympus Mons (largest volcano) and Valles Marineris (giant canyon system).',
    weather: 'Global dust storms that can obscure the entire planet for weeks, polar freezing, and carbon dioxide frost.',
    exploration: 'Explored by rovers Sojourner, Spirit, Opportunity, Curiosity, Perseverance, and orbiters.'
  },
  jupiter: {
    name: 'Jupiter',
    tagline: 'King of Planets',
    type: 'Gas Giant',
    distance: '778.5 Million km (5.20 AU)',
    diameter: '139,820 km',
    gravity: '24.79 m/s²',
    dayLength: '9.9 hours',
    yearLength: '11.86 Earth years',
    moons: 95,
    temp: '-110°C (Cloud tops)',
    color1: '#d89a64',
    color2: '#8b5428',
    overview: 'Jupiter is by far the largest planet in our Solar System—more than twice as massive as all other planets combined. Its iconic Great Red Spot is a giant storm larger than Earth that has raged for hundreds of years.',
    atmosphere: 'Hydrogen (90%) and Helium (10%) with trace amounts of methane, ammonia, and water vapor.',
    surface: 'No solid surface; transitions gradually from gas to liquid metallic hydrogen deep inside.',
    weather: 'Turbulent jet streams, intense lightning storms, and powerful colorful cloud bands.',
    exploration: 'Visited by Pioneer 10/11, Voyager 1/2, Galileo, Cassini, New Horizons, and NASA Juno.'
  },
  saturn: {
    name: 'Saturn',
    tagline: 'The Ringed Jewel',
    type: 'Gas Giant',
    distance: '1.43 Billion km (9.58 AU)',
    diameter: '116,460 km',
    gravity: '10.44 m/s²',
    dayLength: '10.7 hours',
    yearLength: '29.45 Earth years',
    moons: 146,
    temp: '-140°C (Cloud tops)',
    color1: '#e4d191',
    color2: '#9a854d',
    overview: 'Adorned with thousands of beautiful ice rings, Saturn is unique among the planets. It is a gas giant composed mostly of hydrogen and helium, and is so low in average density it could float in water.',
    atmosphere: 'Hydrogen (96%) and Helium (3%) with ammonium cloud haze.',
    surface: 'Gas giant with no solid boundary; possesses a dense core of rock and ice.',
    weather: 'Hexagonal polar wave pattern at its North Pole and high-velocity equatorial jet streams.',
    exploration: 'Explored by Pioneer 11, Voyager 1/2, and the flagship Cassini-Huygens mission.'
  },
  uranus: {
    name: 'Uranus',
    tagline: 'The Tilted Ice Giant',
    type: 'Ice Giant',
    distance: '2.87 Billion km (19.22 AU)',
    diameter: '50,724 km',
    gravity: '8.69 m/s²',
    dayLength: '17.2 hours',
    yearLength: '84 Earth years',
    moons: 28,
    temp: '-195°C (Cloud tops)',
    color1: '#7de3f4',
    color2: '#358a98',
    overview: 'Uranus is an ice giant with a distinct pale cyan color caused by atmospheric methane absorbing red light. Uniquely, Uranus rotates almost completely on its side with an axial tilt of 98 degrees.',
    atmosphere: 'Hydrogen (83%), Helium (15%), and Methane (2%).',
    surface: 'Fluid layer of water, ammonia, and methane ice surrounding a small rocky core.',
    weather: 'Extreme seasonal variations due to its 98-degree sideways rotation.',
    exploration: 'Flyby conducted by Voyager 2 in January 1986.'
  },
  neptune: {
    name: 'Neptune',
    tagline: 'The Windswept Ice Giant',
    type: 'Ice Giant',
    distance: '4.50 Billion km (30.05 AU)',
    diameter: '49,244 km',
    gravity: '11.15 m/s²',
    dayLength: '16.1 hours',
    yearLength: '164.8 Earth years',
    moons: 16,
    temp: '-200°C (Cloud tops)',
    color1: '#3262d6',
    color2: '#162e6e',
    overview: 'Dark, cold, and whipped by supersonic winds, Neptune is the outermost major planet. It is an ice giant rich in hydrogen, helium, and methane, boasting winds that reach up to 2,100 km/h.',
    atmosphere: 'Hydrogen (80%), Helium (19%), and Methane (1%).',
    surface: 'Icy mantle over a rocky mantle and core.',
    weather: 'Violent storms like the Great Dark Spot and fastest atmospheric winds in the Solar System.',
    exploration: 'Flyby performed by Voyager 2 in August 1989.'
  }
};

// 2. Procedural Canvas Spherical Renderer
class PlanetSphereRenderer {
  constructor(canvas, planetKey) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.planetKey = planetKey || 'earth';
    this.rotationAngle = 0;
    this.isDragging = false;
    this.lastMouseX = 0;
    this.dragSpeed = 0.005;

    this.initControls();
    this.animate();
  }

  setPlanet(planetKey) {
    this.planetKey = planetKey;
  }

  initControls() {
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.lastMouseX = e.clientX;
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        const dx = e.clientX - this.lastMouseX;
        this.rotationAngle += dx * this.dragSpeed;
        this.lastMouseX = e.clientX;
      }
    });

    // Touch support
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.lastMouseX = e.touches[0].clientX;
      }
    });

    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (this.isDragging && e.touches.length === 1) {
        const dx = e.touches[0].clientX - this.lastMouseX;
        this.rotationAngle += dx * this.dragSpeed;
        this.lastMouseX = e.touches[0].clientX;
      }
    });
  }

  draw() {
    const data = PLANETS_DATA[this.planetKey] || PLANETS_DATA.earth;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = (Math.min(w, h) / 2) * 0.75;

    this.ctx.clearRect(0, 0, w, h);

    if (!this.isDragging) {
      this.rotationAngle += 0.004;
    }

    this.ctx.save();

    // Outer Glow / Atmosphere Ring
    const atmosGrad = this.ctx.createRadialGradient(cx, cy, radius * 0.95, cx, cy, radius * 1.15);
    atmosGrad.addColorStop(0, data.color1);
    atmosGrad.addColorStop(1, 'transparent');

    this.ctx.beginPath();
    this.ctx.arc(cx, cy, radius * 1.15, 0, Math.PI * 2);
    this.ctx.fillStyle = atmosGrad;
    this.ctx.globalAlpha = 0.35;
    this.ctx.fill();
    this.ctx.globalAlpha = 1;

    // Saturn Ring Backdrop Draw (Behind planet)
    if (this.planetKey === 'saturn') {
      this.drawSaturnRings(cx, cy, radius, true);
    }

    // Base Sphere Clipping Path
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    this.ctx.clip();

    // Planet Base Fill Gradient
    const baseGrad = this.ctx.createLinearGradient(cx - radius, cy, cx + radius, cy);
    baseGrad.addColorStop(0, data.color2);
    baseGrad.addColorStop(0.5, data.color1);
    baseGrad.addColorStop(1, data.color2);
    this.ctx.fillStyle = baseGrad;
    this.ctx.fill();

    // Procedural Texture Features
    this.drawProceduralFeatures(cx, cy, radius, data);

    // 3D Spherical Lighting Shadow Overlay
    const lightGrad = this.ctx.createRadialGradient(
      cx - radius * 0.35, cy - radius * 0.35, radius * 0.1,
      cx, cy, radius * 1.05
    );
    lightGrad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
    lightGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0)');
    lightGrad.addColorStop(0.8, 'rgba(5, 7, 20, 0.75)');
    lightGrad.addColorStop(1, 'rgba(0, 0, 0, 0.95)');

    this.ctx.fillStyle = lightGrad;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.restore();

    // Saturn Ring Foreground Draw (In front of planet)
    if (this.planetKey === 'saturn') {
      this.drawSaturnRings(cx, cy, radius, false);
    }
  }

  drawSaturnRings(cx, cy, radius, isBehind) {
    this.ctx.save();
    this.ctx.translate(cx, cy);
    this.ctx.scale(1, 0.32); // Tilt oval

    const innerR = radius * 1.35;
    const outerR = radius * 2.2;

    const ringGrad = this.ctx.createRadialGradient(0, 0, innerR, 0, 0, outerR);
    ringGrad.addColorStop(0, 'rgba(228, 209, 145, 0.85)');
    ringGrad.addColorStop(0.4, 'rgba(154, 133, 77, 0.5)');
    ringGrad.addColorStop(0.7, 'rgba(5, 7, 20, 0.9)'); // Cassini division
    ringGrad.addColorStop(0.85, 'rgba(228, 209, 145, 0.7)');
    ringGrad.addColorStop(1, 'rgba(228, 209, 145, 0)');

    this.ctx.beginPath();
    if (isBehind) {
      this.ctx.arc(0, 0, outerR, Math.PI, Math.PI * 2);
    } else {
      this.ctx.arc(0, 0, outerR, 0, Math.PI);
    }
    this.ctx.lineTo(innerR, 0);
    this.ctx.fillStyle = ringGrad;
    this.ctx.fill();

    this.ctx.restore();
  }

  drawProceduralFeatures(cx, cy, radius, data) {
    const shift = (this.rotationAngle % (Math.PI * 2)) * (radius * 0.4);

    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';

    if (this.planetKey === 'jupiter') {
      // Jupiter Cloud Bands & Great Red Spot
      for (let y = -radius; y < radius; y += 12) {
        if (Math.sin(y * 0.15) > 0) {
          this.ctx.fillRect(cx - radius, cy + y, radius * 2, 6);
        }
      }
      // Great Red Spot
      const spotX = cx + Math.sin(this.rotationAngle) * (radius * 0.5);
      const spotY = cy + radius * 0.25;
      this.ctx.fillStyle = '#cc3300';
      this.ctx.beginPath();
      this.ctx.ellipse(spotX, spotY, 22, 14, 0, 0, Math.PI * 2);
      this.ctx.fill();
    } else if (this.planetKey === 'earth') {
      // Continents / Green-Brown patches
      this.ctx.fillStyle = '#408030';
      const offset = (this.rotationAngle * 50) % (radius * 2);
      this.ctx.beginPath();
      this.ctx.arc(cx - radius * 0.4 + (offset % (radius * 1.5)), cy - radius * 0.2, radius * 0.35, 0, Math.PI * 2);
      this.ctx.arc(cx + radius * 0.3 - (offset % (radius * 1.5)), cy + radius * 0.3, radius * 0.25, 0, Math.PI * 2);
      this.ctx.fill();

      // Cloud swirl layers
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      this.ctx.beginPath();
      this.ctx.ellipse(cx, cy - radius * 0.5, radius * 0.7, 8, 0.2, 0, Math.PI * 2);
      this.ctx.ellipse(cx, cy + radius * 0.4, radius * 0.8, 10, -0.1, 0, Math.PI * 2);
      this.ctx.fill();
    } else if (this.planetKey === 'mars') {
      // Craters and dark basaltic regions
      this.ctx.fillStyle = 'rgba(60, 20, 10, 0.3)';
      const spotX = cx + Math.cos(this.rotationAngle * 0.8) * (radius * 0.4);
      this.ctx.beginPath();
      this.ctx.arc(spotX, cy + 10, radius * 0.3, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  animate() {
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

// 3. Planet Explorer Page Handler Setup
document.addEventListener('DOMContentLoaded', () => {
  const planetCanvasLarge = document.getElementById('planet-canvas-large');
  if (!planetCanvasLarge) return;

  // Set canvas dimension resolution
  planetCanvasLarge.width = 400;
  planetCanvasLarge.height = 400;

  const renderer = new PlanetSphereRenderer(planetCanvasLarge, 'mars');

  // Check URL Param for initial planet select
  const urlParams = new URLSearchParams(window.location.search);
  const selectedPlanet = urlParams.get('planet') || 'mars';

  const updatePlanetView = (planetKey) => {
    const data = PLANETS_DATA[planetKey];
    if (!data) return;

    renderer.setPlanet(planetKey);

    // Update Text Elements
    document.getElementById('planet-name').textContent = data.name;
    document.getElementById('planet-tagline').textContent = data.tagline;
    document.getElementById('planet-overview').textContent = data.overview;
    document.getElementById('stat-diameter').textContent = data.diameter;
    document.getElementById('stat-gravity').textContent = data.gravity;
    document.getElementById('stat-day').textContent = data.dayLength;
    document.getElementById('stat-year').textContent = data.yearLength;
    document.getElementById('stat-moons').textContent = data.moons;
    document.getElementById('stat-temp').textContent = data.temp;

    document.getElementById('tab-atmos-text').textContent = data.atmosphere;
    document.getElementById('tab-surface-text').textContent = data.surface;
    document.getElementById('tab-weather-text').textContent = data.weather;
    document.getElementById('tab-exploration-text').textContent = data.exploration;

    // Highlight active planet strip node
    document.querySelectorAll('.planet-node').forEach(node => {
      node.classList.toggle('active', node.dataset.planet === planetKey);
    });
  };

  // Bind strip nodes click
  document.querySelectorAll('.planet-node').forEach(node => {
    node.addEventListener('click', () => {
      updatePlanetView(node.dataset.planet);
    });
  });

  // Tab switching logic
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  // Embedded Planet Weight Calculator
  const weightInput = document.getElementById('planet-weight-input');
  const calcBtn = document.getElementById('calc-weight-btn');
  const calcResult = document.getElementById('calc-weight-result');

  if (weightInput && calcBtn && calcResult) {
    const calculateWeight = () => {
      const val = parseFloat(weightInput.value);
      if (isNaN(val) || val <= 0) return;

      const currentPlanetKey = renderer.planetKey;
      const data = PLANETS_DATA[currentPlanetKey];
      const grav = parseFloat(data.gravity.split(' ')[0]);

      // Weight on target = Earth weight * (Target Gravity / 9.81)
      const res = (val * (grav / 9.81)).toFixed(1);
      calcResult.textContent = `${res} kg`;
    };

    calcBtn.addEventListener('click', calculateWeight);
  }

  // Render initial planet view
  updatePlanetView(selectedPlanet);
});
