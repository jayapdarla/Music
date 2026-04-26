import { dogBreeds as featuredBreeds } from './dogData.js';

let allBreeds = [];
let filteredBreeds = [];
let currentView = 'grid'; // 'grid', 'carousel', 'detail'
let selectedBreedId = null;

const displayContainer = document.getElementById('display-container');
const breedList = document.getElementById('breed-list');
const searchInput = document.getElementById('breed-search');
const sortSelect = document.getElementById('sort-select');
const continentFilter = document.getElementById('continent-filter');
const gridBtn = document.getElementById('grid-view-btn');
const carouselBtn = document.getElementById('carousel-view-btn');
const sidebar = document.getElementById('sidebar');
const mobileToggle = document.getElementById('mobile-toggle');

const positiveTraits = ['Friendly', 'Alert', 'Intelligent', 'Courageous', 'Loyal', 'Energetic', 'Playful', 'Obedient', 'Protective', 'Trainable', 'Active', 'Gentle', 'Confident', 'Brave', 'Responsive', 'Receptive', 'Faithful', 'Composed', 'Reliable', 'Fearless', 'Self-assured', 'Eager', 'Good-natured', 'Affectionate', 'Spirited', 'Even Tempered', 'Joyful', 'Happy', 'Amiable', 'Dutiful', 'Responsible', 'Loving', 'Patient', 'Kind', 'Devoted', 'Sweet-Tempered', 'Companionable', 'Trusting'];

const continentMap = {
    'United Kingdom': 'Europe', 'England': 'Europe', 'Scotland': 'Europe', 'Wales': 'Europe', 'Germany': 'Europe', 'France': 'Europe', 'Italy': 'Europe', 'Spain': 'Europe', 'Switzerland': 'Europe', 'Belgium': 'Europe', 'Netherlands': 'Europe', 'Norway': 'Europe', 'Sweden': 'Europe', 'Russia': 'Europe', 'Ireland': 'Europe', 'Hungary': 'Europe', 'Poland': 'Europe', 'Greece': 'Europe', 'Turkey': 'Europe',
    'USA': 'North America', 'United States': 'North America', 'Canada': 'North America', 'Mexico': 'North America',
    'Japan': 'Asia', 'China': 'Asia', 'Tibet': 'Asia', 'India': 'Asia', 'Afghanistan': 'Asia', 'Pakistan': 'Asia', 'Iran': 'Asia', 'Siberia': 'Asia', 'Korea': 'Asia', 'Thailand': 'Asia',
    'Australia': 'Australia',
    'Egypt': 'Africa', 'South Africa': 'Africa', 'Mali': 'Africa', 'Madagascar': 'Africa', 'Rhodesia': 'Africa'
};

// Initialize
async function init() {
    await loadBreeds();
    applyFilters();
    setupEventListeners();
}

async function loadBreeds() {
    try {
        const response = await fetch('breeds_raw.json');
        const rawData = await response.json();
        
        allBreeds = rawData.map(breed => {
            const featured = featuredBreeds.find(fb => fb.name.toLowerCase() === breed.name.toLowerCase());
            const temperament = breed.temperament ? breed.temperament.split(', ') : [];
            const abilities = temperament.filter(t => positiveTraits.some(p => t.includes(p)));
            const challenges = temperament.filter(t => !positiveTraits.some(p => t.includes(p)));

            // Numerical parsing for sorting
            const lifeAvg = parseRange(breed.life_span);
            const weightAvg = parseRange(breed.weight.metric);
            const heightAvg = parseRange(breed.height.metric);

            // Continent Mapping
            const origin = breed.origin || breed.country_code || 'Unknown';
            let continent = 'Other';
            for (const [key, value] of Object.entries(continentMap)) {
                if (origin.includes(key)) {
                    continent = value;
                    break;
                }
            }

            // Size Category
            let size = 'Medium';
            if (heightAvg < 30) size = 'Small';
            else if (heightAvg > 60) size = 'Large';

            // Diet & Price (Heuristic)
            const diet = breed.breed_group === 'Working' || breed.breed_group === 'Herding' ? 'High Performance' : 'Standard Balanced';
            const price = breed.breed_group === 'Toy' || breed.breed_group === 'Non-Sporting' ? '$800 - $1,500' : '$1,500 - $3,500';

            return {
                id: breed.id.toString(),
                name: breed.name,
                image: breed.image.url,
                lifespan: breed.life_span,
                lifeNum: lifeAvg,
                weightNum: weightAvg,
                heightNum: heightAvg,
                continent: continent,
                origin: origin,
                size: size,
                diet: diet,
                price: price,
                facts: featured ? featured.facts : [`Originally bred for: ${breed.bred_for || 'Companionship'}`, `Breed Group: ${breed.breed_group || 'Diverse'}`, `Origin: ${origin}`],
                abilities: featured ? featured.abilities : (abilities.length > 0 ? abilities : ['Alert', 'Intelligent']),
                cons: featured ? featured.cons : (challenges.length > 0 ? challenges : ['Needs regular exercise', 'Requires training'])
            };
        });

        featuredBreeds.forEach(fb => {
            if (!allBreeds.find(b => b.name.toLowerCase() === fb.name.toLowerCase())) {
                allBreeds.push({ ...fb, id: `featured-${fb.id}`, lifeNum: 12, weightNum: 25, heightNum: 50, continent: 'Europe', size: 'Medium', diet: 'Standard Balanced', price: '$1,500' });
            }
        });
    } catch (error) {
        console.error('Error loading breeds:', error);
        allBreeds = featuredBreeds;
    }
}

function parseRange(str) {
    if (!str) return 0;
    const nums = str.match(/\d+/g);
    if (!nums) return 0;
    if (nums.length === 1) return parseInt(nums[0]);
    return (parseInt(nums[0]) + parseInt(nums[1])) / 2;
}

function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedContinent = continentFilter.value;
    const selectedSizes = Array.from(document.querySelectorAll('.size-filter:checked')).map(cb => cb.value);

    filteredBreeds = allBreeds.filter(breed => {
        const matchesSearch = breed.name.toLowerCase().includes(searchTerm);
        const matchesContinent = selectedContinent === 'all' || breed.continent.toLowerCase().replace(' ', '-') === selectedContinent;
        const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(breed.size.toLowerCase());
        return matchesSearch && matchesContinent && matchesSize;
    });

    sortBreeds();
    renderSidebar(filteredBreeds);
    renderCurrentView();
}

function sortBreeds() {
    const sortVal = sortSelect.value;
    filteredBreeds.sort((a, b) => {
        if (sortVal === 'name-asc') return a.name.localeCompare(b.name);
        if (sortVal === 'life-desc') return b.lifeNum - a.lifeNum;
        if (sortVal === 'weight-desc') return b.weightNum - a.weightNum;
        if (sortVal === 'height-desc') return b.heightNum - a.heightNum;
        return 0;
    });
}

// Rendering
function renderSidebar(breeds = filteredBreeds) {
    breedList.innerHTML = breeds.map(breed => `
        <li class="breed-item ${selectedBreedId === breed.id ? 'active' : ''}" data-id="${breed.id}">
            ${breed.name}
        </li>
    `).join('');
}

function renderCurrentView() {
    if (currentView === 'grid') {
        renderGrid();
    } else if (currentView === 'carousel') {
        renderCarousel();
    } else if (currentView === 'detail') {
        renderDetail();
    }
}

function renderGrid() {
    displayContainer.innerHTML = `
        <div class="grid-container">
            ${filteredBreeds.map(breed => `
                <div class="breed-card" data-id="${breed.id}">
                    <div class="card-image">
                        <img src="${breed.image}" alt="${breed.name}" loading="lazy">
                    </div>
                    <div class="card-info">
                        <h3>${breed.name}</h3>
                        <p>${breed.continent} | ${breed.size}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    attachItemListeners('.breed-card');
}

function renderCarousel() {
    displayContainer.innerHTML = `
        <div class="carousel-wrapper">
            ${filteredBreeds.map(breed => `
                <div class="carousel-item" data-id="${breed.id}">
                    <div class="image-container">
                        <img src="${breed.image}" alt="${breed.name}" loading="lazy">
                    </div>
                    <div class="info-overlay">
                        <h3>${breed.name}</h3>
                        <p>${breed.continent} | ${breed.lifespan}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    attachItemListeners('.carousel-item');
}

function renderDetail() {
    const breed = allBreeds.find(b => b.id === selectedBreedId);
    if (!breed) return;

    displayContainer.innerHTML = `
        <div class="detail-view">
            <button class="back-btn" id="back-to-list">
                <i class="fas fa-arrow-left"></i> Back to ${gridBtn.classList.contains('active') ? 'Grid' : 'Carousel'}
            </button>
            <div class="hero-section">
                <div class="hero-image">
                    <img src="${breed.image}" alt="${breed.name}">
                </div>
                <div class="hero-content">
                    <h1>${breed.name}</h1>
                    <div class="stats-grid">
                        <span class="stat-badge"><i class="fas fa-history"></i> ${breed.lifespan}</span>
                        <span class="stat-badge"><i class="fas fa-globe"></i> ${breed.continent}</span>
                        <span class="stat-badge"><i class="fas fa-tag"></i> ${breed.price}</span>
                        <span class="stat-badge"><i class="fas fa-utensils"></i> ${breed.diet}</span>
                    </div>
                    <div class="tabs">
                        <button class="tab-btn active" data-tab="facts">Facts</button>
                        <button class="tab-btn" data-tab="abilities">Abilities</button>
                        <button class="tab-btn" data-tab="cons">Challenges</button>
                    </div>
                    <div class="tab-container">
                        <div id="facts" class="tab-content active">
                            <ul class="info-list">
                                ${breed.facts.map(fact => `<li>${fact}</li>`).join('')}
                            </ul>
                        </div>
                        <div id="abilities" class="tab-content">
                            <ul class="info-list">
                                ${breed.abilities.map(ability => `<li>${ability}</li>`).join('')}
                            </ul>
                        </div>
                        <div id="cons" class="tab-content">
                            <ul class="info-list">
                                ${breed.cons.map(con => `<li>${con}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('back-to-list').addEventListener('click', () => {
        currentView = gridBtn.classList.contains('active') ? 'grid' : 'carousel';
        renderCurrentView();
    });

    const tabBtns = displayContainer.querySelectorAll('.tab-btn');
    const tabContents = displayContainer.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });
}

// Event Listeners
function setupEventListeners() {
    searchInput.addEventListener('input', applyFilters);
    sortSelect.addEventListener('change', applyFilters);
    continentFilter.addEventListener('change', applyFilters);
    document.querySelectorAll('.size-filter').forEach(cb => cb.addEventListener('change', applyFilters));

    gridBtn.addEventListener('click', () => {
        currentView = 'grid';
        gridBtn.classList.add('active');
        carouselBtn.classList.remove('active');
        renderCurrentView();
    });

    carouselBtn.addEventListener('click', () => {
        currentView = 'carousel';
        carouselBtn.classList.add('active');
        gridBtn.classList.remove('active');
        renderCurrentView();
    });

    mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    breedList.addEventListener('click', (e) => {
        const item = e.target.closest('.breed-item');
        if (item) {
            selectedBreedId = item.dataset.id;
            currentView = 'detail';
            renderCurrentView();
            renderSidebar();
            if (window.innerWidth <= 1024) sidebar.classList.remove('open');
        }
    });
}

function attachItemListeners(selector) {
    const items = displayContainer.querySelectorAll(selector);
    items.forEach(item => {
        item.addEventListener('click', () => {
            selectedBreedId = item.dataset.id;
            currentView = 'detail';
            renderCurrentView();
            renderSidebar();
        });
    });
}

init();
