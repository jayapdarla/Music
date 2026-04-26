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

// Initialize
async function init() {
    await fetchAllBreeds();
    renderSidebar();
    renderCurrentView();
    setupEventListeners();
}

// Fetch all breeds from API
async function fetchAllBreeds() {
    try {
        const response = await fetch('https://dogapi.dog/api/v2/breeds');
        const data = await response.json();
        
        // Merge API data with featured data
        allBreeds = await Promise.all(data.data.map(async breed => {
            const featured = featuredBreeds.find(fb => fb.name.toLowerCase() === breed.attributes.name.toLowerCase());
            if (featured) return featured;

            // Fetch dynamic image from Dog CEO API
            let breedImg = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800';
            try {
                const apiName = breed.attributes.name.toLowerCase().replace(' ', '/');
                const imgRes = await fetch(`https://dog.ceo/api/breed/${apiName}/images/random`);
                const imgData = await imgRes.json();
                if (imgData.status === 'success') breedImg = imgData.message;
            } catch (e) {
                console.warn('Image fetch failed for:', breed.attributes.name);
            }

            return {
                id: breed.id,
                name: breed.attributes.name,
                image: breedImg,
                lifespan: `${breed.attributes.life.min}-${breed.attributes.life.max} years`,
                facts: [breed.attributes.description],
                abilities: ['Agility', 'Intelligence'],
                cons: ['High energy', 'Needs exercise']
            };
        }));

        // Add any featured breeds not in the API list
        featuredBreeds.forEach(fb => {
            if (!allBreeds.find(b => b.name === fb.name)) {
                allBreeds.push(fb);
            }
        });

        allBreeds.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
        console.error('Error fetching breeds:', error);
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
                        <img src="${breed.image}" alt="${breed.name}">
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
                        <img src="${breed.image}" alt="${breed.name}">
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
                <i class="fas fa-arrow-left"></i> Back to ${currentView === 'carousel' ? 'Carousel' : 'Grid'}
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
