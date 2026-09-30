/* ==========================================================================
   SPACE EXPLORER - Missions & Spacecraft Gallery Data & Interactivity
   ========================================================================== */

const MISSIONS_DATA = [
  {
    year: '1969',
    name: 'Apollo 11',
    agency: 'NASA',
    destination: 'The Moon',
    spacecraft: 'Saturn V / Command & Lunar Module',
    objective: 'Land humans on the Moon and safely return them to Earth.',
    achievements: 'Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon on July 20, 1969.',
    fact: 'Neil Armstrong\'s famous quote: "That\'s one small step for man, one giant leap for mankind."'
  },
  {
    year: '1977',
    name: 'Voyager 1 & 2',
    agency: 'NASA',
    destination: 'Outer Solar System & Interstellar Space',
    spacecraft: 'Twin Voyager Probes',
    objective: 'Grand tour of Jupiter, Saturn, Uranus, Neptune, and interstellar boundary.',
    achievements: 'First probe to reach interstellar space (Voyager 1 in 2012). Still transmitting data over 24 billion km away!',
    fact: 'Carries the Golden Record—a phonograph record containing sounds, images, and greetings from Earth for alien civilizations.'
  },
  {
    year: '1990',
    name: 'Hubble Space Telescope',
    agency: 'NASA / ESA',
    destination: 'Low Earth Orbit (540 km)',
    spacecraft: 'Space Telescope',
    objective: 'Observe deep universe in ultraviolet, visible, and near-infrared light without atmospheric distortion.',
    achievements: 'Pinpointed the age of the Universe (13.8 billion years), imaged distant nebulae, and discovered accelerating cosmic expansion.',
    fact: 'Hubble has made over 1.5 million observations since its launch aboard Space Shuttle Discovery.'
  },
  {
    year: '1997',
    name: 'Mars Pathfinder & Sojourner',
    agency: 'NASA',
    destination: 'Mars (Ares Vallis)',
    spacecraft: 'Lander & Rover',
    objective: 'Demonstrate low-cost technology landing system and robotic roving on the Martian surface.',
    achievements: 'First successful robotic rover on Mars, opening the era of continuous Martian robotic exploration.',
    fact: 'Sojourner rover was about the size of a microwave oven and operated for 83 Martian days.'
  },
  {
    year: '1997',
    name: 'Cassini-Huygens',
    agency: 'NASA / ESA / ASI',
    destination: 'Saturn System',
    spacecraft: 'Cassini Orbiter & Huygens Probe',
    objective: 'Explore Saturn, its iconic rings, and complex moon system.',
    achievements: 'Landed Huygens probe on Titan, discovered water plumes erupting from Enceladus, and mapped Saturn\'s rings.',
    fact: 'Ended in 2017 with a intentional "Grand Finale" plunge into Saturn\'s atmosphere to protect pristine moons.'
  },
  {
    year: '2015',
    name: 'New Horizons',
    agency: 'NASA',
    destination: 'Pluto & Kuiper Belt',
    spacecraft: 'Interplanetary Probe',
    objective: 'First close-up reconnaissance of Pluto, Charon, and Kuiper Belt Object Arrokoth.',
    achievements: 'Captured legendary heart-shaped nitrogen ice plain (Sputnik Planitia) on Pluto.',
    fact: 'Travelled at over 58,000 km/h—the fastest spacecraft launch speed in history at the time.'
  },
  {
    year: '2021',
    name: 'James Webb Space Telescope (JWST)',
    agency: 'NASA / ESA / CSA',
    destination: 'Sun-Earth L2 Lagrange Point (1.5M km)',
    spacecraft: 'Infrared Space Observatory',
    objective: 'Observe the first galaxies formed after the Big Bang and analyze atmospheres of exoplanets.',
    achievements: 'Revealed oldest galaxies ever detected, star nurseries in unprecedented infrared detail, and water vapor on exoplanets.',
    fact: 'Equipped with a giant 6.5-meter gold-coated primary mirror and tennis-court-sized sunshield.'
  }
];

const SPACECRAFT_GALLERY = [
  {
    name: 'Voyager 1',
    agency: 'NASA',
    launched: 'Sept 5, 1977',
    destination: 'Interstellar Space',
    desc: 'Humanity\'s farthest artificial outpost. Currently travelling through interstellar space carrying the Golden Record.',
    color: '#00f0ff'
  },
  {
    name: 'James Webb Space Telescope',
    agency: 'NASA / ESA / CSA',
    launched: 'Dec 25, 2021',
    destination: 'Lagrange Point 2',
    desc: 'The premier space science observatory, unravelling cosmic mysteries with high-resolution infrared eyes.',
    color: '#ffaa00'
  },
  {
    name: 'Perseverance Mars Rover',
    agency: 'NASA JPL',
    launched: 'July 30, 2020',
    destination: 'Jezero Crater, Mars',
    desc: 'Searching for signs of ancient microbial life and collecting pristine rock samples for future return to Earth.',
    color: '#ff007f'
  },
  {
    name: 'Parker Solar Probe',
    agency: 'NASA',
    launched: 'Aug 12, 2018',
    destination: 'Outer Solar Corona',
    desc: 'The fastest human object ever created, "touching the Sun" at speeds up to 690,000 km/h.',
    color: '#8a2be2'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // Timeline Renderer
  const timelineWrap = document.getElementById('timeline-wrap');
  if (timelineWrap) {
    MISSIONS_DATA.forEach((mission, idx) => {
      const isLeft = idx % 2 === 0;
      const item = document.createElement('div');
      item.className = `timeline-item ${isLeft ? 'left' : 'right'}`;
      item.innerHTML = `
        <div class="timeline-node"></div>
        <div class="glass-panel timeline-card">
          <div class="timeline-year">${mission.year} • ${mission.agency}</div>
          <h3 class="timeline-title">${mission.name}</h3>
          <p class="timeline-desc"><strong>Destination:</strong> ${mission.destination}</p>
          <p class="timeline-desc" style="margin-top: 0.5rem;">${mission.objective}</p>
          <div style="margin-top: 1rem;">
            <span class="badge">Acheivement</span>
            <p style="font-size: 0.85rem; color: var(--text-main); margin-top: 0.4rem;">${mission.achievements}</p>
          </div>
        </div>
      `;
      timelineWrap.appendChild(item);
    });
  }

  // Spacecraft Gallery Renderer
  const spacecraftGrid = document.getElementById('spacecraft-grid');
  if (spacecraftGrid) {
    SPACECRAFT_GALLERY.forEach(craft => {
      const card = document.createElement('div');
      card.className = 'glass-panel spacecraft-card';
      card.innerHTML = `
        <div class="spacecraft-visual" style="background: radial-gradient(circle at 50% 50%, ${craft.color}22 0%, #080c24 80%); border: 1px solid ${craft.color}44;">
          <span class="badge spacecraft-badge">${craft.agency}</span>
        </div>
        <h3>${craft.name}</h3>
        <div class="spacecraft-specs">
          <div class="spacecraft-spec-row">
            <span>Launch Date:</span>
            <span class="spacecraft-spec-val">${craft.launched}</span>
          </div>
          <div class="spacecraft-spec-row">
            <span>Destination:</span>
            <span class="spacecraft-spec-val">${craft.destination}</span>
          </div>
        </div>
        <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; margin-bottom: 1.2rem;">${craft.desc}</p>
        <button class="btn-primary" style="margin-top: auto; font-size: 0.8rem; padding: 0.6rem 1.2rem;" onclick="alert('${craft.name}: ${craft.desc}')">
          LEARN MORE 🚀
        </button>
      `;
      spacecraftGrid.appendChild(card);
    });
  }
});
