/* ==========================================================================
   SPACE EXPLORER - Moons Dataset & Moons Explorer Page Logic
   ========================================================================== */

const MOONS_DATA = [
  {
    id: 'moon',
    name: 'The Moon (Luna)',
    planet: 'Earth',
    diameter: '3,474 km',
    oceanWorld: false,
    fact: 'Earth\'s only natural satellite. It is in synchronous rotation with Earth, always showing the same side.',
    desc: 'The Moon is Earth\'s constant companion. It regulates Earth\'s axial wobble, creates tides, and was the destination of humanity\'s first interplanetary footprint during Apollo 11 in 1969.'
  },
  {
    id: 'europa',
    name: 'Europa',
    planet: 'Jupiter',
    diameter: '3,122 km',
    oceanWorld: true,
    fact: 'Hides a massive subsurface saltwater ocean underneath a 15-25 km thick icy crust, holding twice as much water as Earth!',
    desc: 'Europa is one of the top targets in the search for extraterrestrial life in our Solar System. Its icy surface is crisscrossed by dark reddish cracks caused by tidal flexing from Jupiter.'
  },
  {
    id: 'ganymede',
    name: 'Ganymede',
    planet: 'Jupiter',
    diameter: '5,268 km',
    oceanWorld: true,
    fact: 'The largest moon in the Solar System—larger than Mercury and Pluto! It is the only moon known to possess its own magnetic field.',
    desc: 'Ganymede has a complex geological history with dark cratered terrain juxtaposed with light grooved bands, driven by ancient internal heat and ice tectonic movement.'
  },
  {
    id: 'io',
    name: 'Io',
    planet: 'Jupiter',
    diameter: '3,643 km',
    oceanWorld: false,
    fact: 'The most volcanically active body in the Solar System, with hundreds of erupting sulfur volcanoes spewing plumes 300 km high.',
    desc: 'Io is caught in a gravitational tug-of-war between Jupiter and nearby moons. The resulting tidal flexing heats its interior, driving endless volcanic eruptions.'
  },
  {
    id: 'titan',
    name: 'Titan',
    planet: 'Saturn',
    diameter: '5,150 km',
    oceanWorld: true,
    fact: 'The only moon with a dense atmosphere and liquid rivers, lakes, and seas on its surface (made of liquid methane and ethane!).',
    desc: 'Titan has weather cycles with methane rain, cloud systems, sand dunes, and an underground liquid water ocean beneath its crust.'
  },
  {
    id: 'enceladus',
    name: 'Enceladus',
    planet: 'Saturn',
    diameter: '504 km',
    oceanWorld: true,
    fact: 'Active cryovolcanoes at its South Pole blast plumes of icy water vapor and organic compounds directly into space.',
    desc: 'Data from NASA\'s Cassini spacecraft revealed that Enceladus has a global underground ocean with hydrothermal vents, providing heat and chemicals for potential habitability.'
  },
  {
    id: 'callisto',
    name: 'Callisto',
    planet: 'Jupiter',
    diameter: '4,821 km',
    oceanWorld: false,
    fact: 'The most heavily cratered object in the Solar System. Its ancient surface has remained largely unchanged for 4 billion years.',
    desc: 'Callisto is Jupiter\'s second-largest moon and shows little sign of internal activity. It is composed of roughly equal parts rock and ice.'
  },
  {
    id: 'triton',
    name: 'Triton',
    planet: 'Neptune',
    diameter: '2,706 km',
    oceanWorld: true,
    fact: 'The only large moon in the Solar System that orbits in retrograde (opposite to its planet\'s rotation), indicating it was a captured Kuiper Belt object.',
    desc: 'Triton has active nitrogen ice geysers and a very thin atmosphere, making it one of the coldest known places in the Solar System (-235°C).'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const moonsGrid = document.getElementById('moons-grid');
  const filterBtns = document.querySelectorAll('.moon-filter-btn');

  if (!moonsGrid) return;

  const renderMoons = (filter = 'all') => {
    moonsGrid.innerHTML = '';

    const list = filter === 'ocean' ? MOONS_DATA.filter(m => m.oceanWorld) : MOONS_DATA;

    list.forEach(moon => {
      const card = document.createElement('div');
      card.className = 'glass-panel moon-card';
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.8rem;">
          <span class="badge">${moon.planet} Moon</span>
          ${moon.oceanWorld ? '<span class="badge badge-ocean">🌊 OCEAN WORLD</span>' : ''}
        </div>
        <h3 style="font-size: 1.4rem; margin-bottom: 0.4rem;">${moon.name}</h3>
        <p style="color: var(--primary-cyan); font-family: var(--font-display); font-size: 0.85rem; margin-bottom: 1rem;">
          Diameter: ${moon.diameter}
        </p>
        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
          ${moon.fact}
        </p>
        <button class="btn-secondary explore-moon-btn" data-moon="${moon.id}" style="width: 100%; justify-content: center;">
          EXPLORE MOON 🌙
        </button>
      `;
      moonsGrid.appendChild(card);
    });

    // Bind explore modal triggers
    document.querySelectorAll('.explore-moon-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.moon;
        const moonObj = MOONS_DATA.find(m => m.id === id);
        if (moonObj) alert(`${moonObj.name} Details:\n\nParent Planet: ${moonObj.planet}\nDiameter: ${moonObj.diameter}\n\n${moonObj.desc}`);
      });
    });
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMoons(btn.dataset.filter);
    });
  });

  renderMoons();
});
