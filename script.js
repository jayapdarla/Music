import { dogBreeds as featuredBreeds } from './dogData.js';

let allBreeds = [];
let filteredBreeds = [];
let currentView = 'grid'; // 'grid' or 'detail'
let selectedBreedId = null;

const displayContainer = document.getElementById('display-container');
const breedList = document.getElementById('breed-list');
const searchInput = document.getElementById('breed-search');
const sortSelect = document.getElementById('sort-select');
const groupSelect = document.getElementById('group-select');
const continentFilter = document.getElementById('continent-filter');
const awardFilter = document.getElementById('award-filter');
const colorFilter = document.getElementById('color-filter');
const sidebar = document.getElementById('sidebar');

const positiveTraits = ['Friendly', 'Alert', 'Intelligent', 'Courageous', 'Loyal', 'Energetic', 'Playful', 'Obedient', 'Protective', 'Trainable', 'Active', 'Gentle', 'Confident', 'Brave', 'Responsive', 'Receptive', 'Faithful', 'Composed', 'Reliable', 'Fearless', 'Self-assured', 'Eager', 'Good-natured', 'Affectionate', 'Spirited', 'Even Tempered', 'Joyful', 'Happy', 'Amiable', 'Dutiful', 'Responsible', 'Loving', 'Patient', 'Kind', 'Devoted', 'Sweet-Tempered', 'Companionable', 'Trusting'];

const continentMap = {
    'United Kingdom': 'Europe', 'England': 'Europe', 'Scotland': 'Europe', 'Wales': 'Europe', 'Germany': 'Europe', 'France': 'Europe', 'Italy': 'Europe', 'Spain': 'Europe', 'Switzerland': 'Europe', 'Belgium': 'Europe', 'Netherlands': 'Europe', 'Norway': 'Europe', 'Sweden': 'Europe', 'Russia': 'Europe', 'Ireland': 'Europe', 'Hungary': 'Europe', 'Poland': 'Europe', 'Greece': 'Europe', 'Turkey': 'Europe',
    'USA': 'North America', 'United States': 'North America', 'Canada': 'North America', 'Mexico': 'North America',
    'Japan': 'Asia', 'China': 'Asia', 'Tibet': 'Asia', 'India': 'Asia', 'Afghanistan': 'Asia', 'Pakistan': 'Asia', 'Iran': 'Asia', 'Siberia': 'Asia', 'Korea': 'Asia', 'Thailand': 'Asia',
    'Australia': 'Australia',
    'Egypt': 'Africa', 'South Africa': 'Africa', 'Mali': 'Africa', 'Madagascar': 'Africa', 'Rhodesia': 'Africa'
};

const awardWinners = {
    'Wire Fox Terrier': '15x Westminster Best in Show',
    'Scottish Terrier': '8x Westminster Best in Show',
    'English Springer Spaniel': '6x Westminster Best in Show',
    'Airedale Terrier': '4x Westminster Best in Show',
    'Boxer': '4x Westminster Best in Show',
    'Doberman Pinscher': '4x Westminster Best in Show',
    'Pekingese': '4x Westminster Best in Show',
    'Sealyham Terrier': '4x Westminster Best in Show',
    'Poodle (Standard)': '4x Westminster Best in Show',
    'Golden Retriever': 'AKC Top Popularity Award',
    'Labrador Retriever': 'AKC #1 Registered Breed (30+ Years)',
    'German Shepherd Dog': 'AKC Most Intelligent Working Dog'
};

const traitMapping = {
    'Hound': { likes: ['Scent tracking', 'Long walks', 'Open fields'], dislikes: ['Being confined', 'Loud baths'], caution: 'May follow a scent and wander off. High baying/howling potential.' },
    'Retrieving': { likes: ['Swimming', 'Fetching', 'Treats'], dislikes: ['Isolation', 'Hot weather'], caution: 'Needs significant exercise. Can be prone to obesity if not active.' },
    'Terrier': { likes: ['Digging', 'Chasing toys', 'Mental puzzles'], dislikes: ['Other small pets', 'Being ignored'], caution: 'High prey drive. Can be feisty and vocal.' },
    'Working': { likes: ['Having a job', 'Cold weather', 'Protection training'], dislikes: ['Inactivity', 'Strangers'], caution: 'Large and powerful. Requires strict training and socialization.' },
    'Toy': { likes: ['Laps', 'Soft toys', 'Indoor warmth'], dislikes: ['Rough handling', 'Cold drafts'], caution: 'Fragile and can be prone to "small dog syndrome" if pampered.' },
    'Herding': { likes: ['Running', 'Agility', 'Chasing'], dislikes: ['Stagnation', 'Chaotic environments'], caution: 'May try to herd children or other pets by nipping at heels.' }
};

const breedColorMap = {
    'Labrador Retriever': 'golden', 'German Shepherd': 'black', 'Golden Retriever': 'golden', 'French Bulldog': 'white', 'Beagle': 'tan',
    'Poodle': 'white', 'Rottweiler': 'black', 'Dachshund': 'brown', 'Siberian Husky': 'grey', 'Chihuahua': 'tan',
    'Great Dane': 'grey', 'Doberman Pinscher': 'black', 'Boxer': 'brown', 'Shih Tzu': 'white', 'Pug': 'tan'
};

const professionsMap = {
    'Hound': ['Search and Rescue', 'Detective (Scent Tracking)', 'Hunter', 'Customs Agent'],
    'Retrieving': ['Guide Dog', 'Search and Rescue', 'Hunter', 'Therapy Dog', 'Athlete'],
    'Sporting': ['Guide Dog', 'Search and Rescue', 'Hunter', 'Therapy Dog', 'Athlete'],
    'Terrier': ['Exterminator (Pest Control)', 'Farmer', 'Security/Watchdog', 'Athlete (Agility)'],
    'Working': ['Police Officer', 'Security Guard', 'Military Dog', 'Search and Rescue', 'Farmer (Guarding)'],
    'Toy': ['Therapy Dog', 'Companion', 'Elderly Caregiver', 'Work-from-Home Assistant'],
    'Herding': ['Farmer (Herding)', 'Shepherd', 'Active Outdoor Guide', 'Search and Rescue'],
    'Non-Sporting': ['Therapy Dog', 'Companion', 'Performer/Actor'],
    'Mixed': ['Therapy Dog', 'Companion', 'Search and Rescue']
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

            const lifeAvg = parseRange(breed.life_span);
            const weightAvg = parseRange(breed.weight.metric);
            const heightAvg = parseRange(breed.height.metric);

            const origin = breed.origin || breed.country_code || 'Unknown';
            let continent = 'Other';
            for (const [key, value] of Object.entries(continentMap)) {
                if (origin.includes(key)) { continent = value; break; }
            }

            let size = 'Medium';
            if (heightAvg < 30) size = 'Small';
            else if (heightAvg > 60) size = 'Large';

            const diet = breed.breed_group === 'Working' || breed.breed_group === 'Herding' ? 'High Protein' : 'Standard Balanced';
            const priceRangeStr = breed.breed_group === 'Toy' || breed.breed_group === 'Non-Sporting' ? '$1,000 - $1,500' : '$1,500 - $3,000';
            const priceAvg = parseRange(priceRangeStr);
            
            let color = breedColorMap[breed.name] || 'various';
            if (color === 'various' && breed.name.toLowerCase().includes('white')) color = 'white';
            if (color === 'various' && breed.name.toLowerCase().includes('black')) color = 'black';
            if (color === 'various' && breed.name.toLowerCase().includes('golden')) color = 'golden';

            const award = awardWinners[breed.name] || (featured ? 'Multiple Performance Titles' : 'Breed Championship Lineage');
            const traitInfo = traitMapping[breed.breed_group] || traitMapping['Working'];
            const professions = professionsMap[breed.breed_group] || professionsMap['Mixed'];

            return {
                id: breed.id.toString(),
                name: breed.name || 'Unknown Breed',
                image: breed.image.url,
                lifespan: breed.life_span,
                lifeNum: lifeAvg,
                weightNum: weightAvg,
                heightNum: heightAvg,
                continent: continent,
                origin: origin,
                size: size,
                diet: diet,
                price: priceRangeStr,
                priceNum: priceAvg,
                color: color,
                award: award,
                likes: traitInfo.likes,
                dislikes: traitInfo.dislikes,
                caution: traitInfo.caution,
                professions: professions,
                facts: featured ? featured.facts : [`Originally bred for: ${breed.bred_for || 'Companionship'}`, `Breed Group: ${breed.breed_group || 'Diverse'}`, `Origin: ${origin}`],
                abilities: featured ? featured.abilities : (abilities.length > 0 ? abilities : ['Alert', 'Intelligent']),
                cons: featured ? featured.cons : (challenges.length > 0 ? challenges : ['Needs regular exercise', 'Requires training'])
            };
        });

        featuredBreeds.forEach(fb => {
            if (!allBreeds.find(b => b.name.toLowerCase() === fb.name.toLowerCase())) {
                allBreeds.push({ ...fb, id: `featured-${fb.id}`, lifeNum: 12, weightNum: 25, heightNum: 50, continent: 'Europe', size: 'Medium', diet: 'Standard Balanced', price: '$1,500', priceNum: 1500, color: 'tan', award: 'Featured Breed', likes: ['Play', 'Family'], dislikes: ['Isolation'], caution: 'General breed care required.', professions: ['Companion', 'Therapy Dog'] });
            }
        });

        const uniqueAwards = [...new Set(allBreeds.map(b => b.award))].filter(Boolean).sort();
        awardFilter.innerHTML = '<option value="all">All Awards</option>' + uniqueAwards.map(a => `<option value="${a}">${a}</option>`).join('');

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
    const selectedAward = awardFilter.value;
    const selectedColor = colorFilter.value;
    const selectedSizes = Array.from(document.querySelectorAll('.size-filter:checked')).map(cb => cb.value);
    const selectedLifeRanges = Array.from(document.querySelectorAll('.life-filter:checked')).map(cb => cb.value);

    filteredBreeds = allBreeds.filter(breed => {
        const matchesSearch = breed.name.toLowerCase().includes(searchTerm);
        const matchesContinent = selectedContinent === 'all' || breed.continent.toLowerCase().replace(' ', '-') === selectedContinent;
        const matchesColor = selectedColor === 'all' || breed.color === selectedColor;
        const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(breed.size.toLowerCase());
        
        let matchesLife = true;
        if (selectedLifeRanges.length > 0) {
            matchesLife = false;
            if (selectedLifeRanges.includes('short') && breed.lifeNum < 10) matchesLife = true;
            if (selectedLifeRanges.includes('medium') && breed.lifeNum >= 10 && breed.lifeNum <= 15) matchesLife = true;
            if (selectedLifeRanges.includes('long') && breed.lifeNum > 15) matchesLife = true;
        }

        const matchesAward = selectedAward === 'all' || breed.award === selectedAward;

        return matchesSearch && matchesContinent && matchesColor && matchesSize && matchesLife && matchesAward;
    });

    sortBreeds();
    renderSidebar(filteredBreeds);
    renderCurrentView();
}

function sortBreeds() {
    const sortVal = sortSelect.value;
    filteredBreeds.sort((a, b) => {
        if (sortVal === 'name-asc') return a.name.localeCompare(b.name);
        if (sortVal === 'price-desc') return b.priceNum - a.priceNum;
        if (sortVal === 'price-asc') return a.priceNum - b.priceNum;
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
    displayContainer.scrollTo(0, 0);
    if (currentView === 'grid') renderGrid();
    else if (currentView === 'detail') renderDetail();
}

function renderGrid() {
    const groupBy = groupSelect.value;
    if (groupBy === 'none') {
        displayContainer.innerHTML = `<div class="grid-container">${filteredBreeds.map(breed => renderCard(breed)).join('')}</div>`;
    } else {
        const groups = groupBreeds(groupBy);
        displayContainer.innerHTML = `<div class="grid-container">${Object.keys(groups).sort().map(groupKey => `<div class="group-header">${groupKey}</div>${groups[groupKey].map(breed => renderCard(breed)).join('')}`).join('')}</div>`;
    }
    attachItemListeners('.breed-card');
}

function groupBreeds(key) {
    const groups = {};
    filteredBreeds.forEach(breed => {
        const groupKey = breed[key] || 'Other';
        if (!groups[groupKey]) groups[groupKey] = [];
        groups[groupKey].push(breed);
    });
    return groups;
}

function renderCard(breed) {
    const awardBadge = breed.award && !breed.award.includes('Lineage') ? `<div class="award-badge"><i class="fas fa-trophy"></i> ${breed.award}</div>` : '';
    return `
        <div class="breed-card" data-id="${breed.id}">
            ${awardBadge}
            <div class="card-image">
                <img src="${breed.image}" alt="${breed.name}" loading="lazy">
            </div>
            <div class="card-info">
                <h3>${breed.name}</h3>
                <p>${breed.continent} | ${breed.size}</p>
            </div>
        </div>
    `;
}

function renderDetail() {
    const breed = allBreeds.find(b => b.id === selectedBreedId);
    if (!breed) return;

    displayContainer.innerHTML = `
        <div class="detail-view">
            <button class="back-btn" id="back-to-list">
                <i class="fas fa-arrow-left"></i> Back to Gallery
            </button>
            <div class="hero-section">
                <div class="hero-image">
                    <img src="${breed.image}" alt="${breed.name}">
                </div>
                <div class="hero-content">
                    <h1>${breed.name}</h1>
                    ${breed.award ? `<div class="detail-award"><i class="fas fa-trophy"></i> ${breed.award}</div>` : ''}
                    <div class="stats-grid">
                        <span class="stat-badge"><i class="fas fa-history"></i> ${breed.lifespan}</span>
                        <span class="stat-badge"><i class="fas fa-globe"></i> ${breed.continent}</span>
                        <span class="stat-badge"><i class="fas fa-tag"></i> ${breed.price}</span>
                        <span class="stat-badge"><i class="fas fa-utensils"></i> ${breed.diet}</span>
                        <span class="stat-badge"><i class="fas fa-palette"></i> ${breed.color}</span>
                    </div>
                </div>
            </div>
            
            <div class="details-bottom-section">
                <div class="tabs">
                    <button class="tab-btn active" data-tab="facts">Facts</button>
                    <button class="tab-btn" data-tab="personality">Likes & Dislikes</button>
                    <button class="tab-btn danger" data-tab="caution">Buyer's Caution</button>
                    <button class="tab-btn" data-tab="professions">Suits Profession</button>
                </div>
                <div class="tab-container">
                    <div id="facts" class="tab-content active">
                        <ul class="info-list">
                            ${breed.facts.map(fact => `<li>${fact}</li>`).join('')}
                            <li><strong>Abilities:</strong> ${breed.abilities.join(', ')}</li>
                        </ul>
                    </div>
                    <div id="personality" class="tab-content">
                        <div class="personality-split">
                            <div class="likes">
                                <h4><i class="fas fa-heart"></i> Likes</h4>
                                <ul>${breed.likes.map(l => `<li>${l}</li>`).join('')}</ul>
                            </div>
                            <div class="dislikes">
                                <h4><i class="fas fa-thumbs-down"></i> Dislikes</h4>
                                <ul>${breed.dislikes.map(d => `<li>${d}</li>`).join('')}</ul>
                            </div>
                        </div>
                    </div>
                    <div id="caution" class="tab-content">
                        <div class="caution-box">
                            <i class="fas fa-exclamation-triangle"></i>
                            <p>${breed.caution}</p>
                            <ul class="info-list">
                                ${breed.cons.map(con => `<li>${con}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    <div id="professions" class="tab-content">
                        <div class="professions-list">
                            <h4><i class="fas fa-briefcase"></i> Ideal Professions for ${breed.name}</h4>
                            <ul class="info-list">
                                ${breed.professions.map(prof => `<li>${prof}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('back-to-list').addEventListener('click', () => {
        currentView = 'grid';
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
    groupSelect.addEventListener('change', applyFilters);
    continentFilter.addEventListener('change', applyFilters);
    awardFilter.addEventListener('change', applyFilters);
    colorFilter.addEventListener('change', applyFilters);
    document.querySelectorAll('.size-filter').forEach(cb => cb.addEventListener('change', applyFilters));
    document.querySelectorAll('.life-filter').forEach(cb => cb.addEventListener('change', applyFilters));

    document.addEventListener('click', (e) => {
        const toggle = e.target.closest('#mobile-toggle');
        if (toggle) sidebar.classList.toggle('open');
        else if (!e.target.closest('#sidebar') && sidebar.classList.contains('open')) sidebar.classList.remove('open');
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
