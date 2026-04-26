import { dogBreeds as featuredBreeds } from './dogData.js';

let allBreeds = [];
let currentView = 'grid'; // 'grid', 'carousel', 'detail'
let selectedBreedId = null;

const displayContainer = document.getElementById('display-container');
const breedList = document.getElementById('breed-list');
const searchInput = document.getElementById('breed-search');
const gridBtn = document.getElementById('grid-view-btn');
const carouselBtn = document.getElementById('carousel-view-btn');
const sidebar = document.getElementById('sidebar');
const mobileToggle = document.getElementById('mobile-toggle');

const positiveTraits = ['Friendly', 'Alert', 'Intelligent', 'Courageous', 'Loyal', 'Energetic', 'Playful', 'Obedient', 'Protective', 'Trainable', 'Active', 'Gentle', 'Confident', 'Brave', 'Responsive', 'Receptive', 'Faithful', 'Composed', 'Reliable', 'Fearless', 'Self-assured', 'Eager', 'Good-natured', 'Affectionate', 'Spirited', 'Even Tempered', 'Joyful', 'Happy', 'Amiable', 'Dutiful', 'Responsible', 'Loving', 'Patient', 'Kind', 'Devoted', 'Sweet-Tempered', 'Companionable', 'Trusting'];

// Initialize
async function init() {
    await loadBreeds();
    renderSidebar();
    renderCurrentView();
    setupEventListeners();
}

async function loadBreeds() {
    try {
        const response = await fetch('breeds_raw.json');
        const rawData = await response.json();
        
        allBreeds = rawData.map(breed => {
            // Check if we have featured data for this breed
            const featured = featuredBreeds.find(fb => fb.name.toLowerCase() === breed.name.toLowerCase());
            
            // Extract abilities and challenges from temperament
            const temperament = breed.temperament ? breed.temperament.split(', ') : [];
            const abilities = temperament.filter(t => positiveTraits.some(p => t.includes(p)));
            const challenges = temperament.filter(t => !positiveTraits.some(p => t.includes(p)));

            // Add some default "bred for" facts
            const facts = [
                breed.bred_for ? `Originally bred for: ${breed.bred_for}` : null,
                breed.breed_group ? `Breed Group: ${breed.breed_group}` : null,
                breed.origin ? `Origin: ${breed.origin}` : null,
                featured ? featured.facts[0] : null
            ].filter(f => f);

            return {
                id: breed.id.toString(),
                name: breed.name,
                image: breed.image.url,
                lifespan: breed.life_span,
                facts: featured ? featured.facts : (facts.length > 0 ? facts : ['A versatile and unique breed.']),
                abilities: featured ? featured.abilities : (abilities.length > 0 ? abilities : ['Alert', 'Intelligent']),
                cons: featured ? featured.cons : (challenges.length > 0 ? challenges : ['Needs regular exercise', 'Requires training'])
            };
        });

        // Ensure featured breeds that might not be in the raw list are included
        featuredBreeds.forEach(fb => {
            if (!allBreeds.find(b => b.name.toLowerCase() === fb.name.toLowerCase())) {
                allBreeds.push({ ...fb, id: `featured-${fb.id}` });
            }
        });

        allBreeds.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
        console.error('Error loading breeds:', error);
        allBreeds = featuredBreeds;
    }
}

// Rendering
function renderSidebar(filteredBreeds = allBreeds) {
    breedList.innerHTML = filteredBreeds.map(breed => `
        <li class="breed-item ${selectedBreedId === breed.id ? 'active' : ''}" data-id="${breed.id}">
            ${breed.name}
        </li>
    `).join('');
}

function renderCurrentView() {
    displayContainer.scrollTo(0, 0);
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
            ${allBreeds.map(breed => `
                <div class="breed-card" data-id="${breed.id}">
                    <div class="card-image">
                        <img src="${breed.image}" alt="${breed.name}" loading="lazy">
                    </div>
                    <div class="card-info">
                        <h3>${breed.name}</h3>
                        <p>${breed.lifespan}</p>
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
            ${allBreeds.map(breed => `
                <div class="carousel-item" data-id="${breed.id}">
                    <div class="image-container">
                        <img src="${breed.image}" alt="${breed.name}" loading="lazy">
                    </div>
                    <div class="info-overlay">
                        <h3>${breed.name}</h3>
                        <p>${breed.lifespan}</p>
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
                    <span class="lifespan-badge"><i class="far fa-clock"></i> Lifespan: ${breed.lifespan}</span>
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
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = allBreeds.filter(b => b.name.toLowerCase().includes(term));
        renderSidebar(filtered);
    });

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
