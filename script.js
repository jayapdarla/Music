import dogBreeds from './dogData.js';

document.addEventListener('DOMContentLoaded', () => {
    const breedList = document.querySelector('.breed-list');
    const mainContent = document.querySelector('main');
    
    let currentBreedIndex = 0;
    let activeTabId = 'facts';

    // Initialize Sidebar
    function initSidebar() {
        breedList.innerHTML = '';
        dogBreeds.forEach((breed, index) => {
            const li = document.createElement('li');
            li.className = `breed-item ${index === currentBreedIndex ? 'active' : ''}`;
            li.textContent = breed.name;
            li.addEventListener('click', () => {
                currentBreedIndex = index;
                renderBreed();
                updateSidebarActive();
            });
            breedList.appendChild(li);
        });
    }

    function updateSidebarActive() {
        document.querySelectorAll('.breed-item').forEach((item, index) => {
            item.classList.toggle('active', index === currentBreedIndex);
        });
    }

    // Render Breed Details
    function renderBreed() {
        const breed = dogBreeds[currentBreedIndex];
        
        mainContent.innerHTML = `
            <section class="breed-hero">
                <div class="image-container">
                    <img src="${breed.image}" alt="${breed.name}">
                </div>
                <div class="breed-info">
                    <h1 class="breed-title">${breed.name}</h1>
                    <div class="stats-card">
                        <div class="stats-icon">⏳</div>
                        <div>
                            <p style="color: var(--text-secondary); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">Lifespan</p>
                            <p style="font-size: 1.25rem; font-weight: 600;">${breed.lifespan}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="tabs-container">
                <div class="tabs-nav">
                    <button class="tab-btn ${activeTabId === 'facts' ? 'active' : ''}" data-tab="facts">Facts</button>
                    <button class="tab-btn ${activeTabId === 'abilities' ? 'active' : ''}" data-tab="abilities">Abilities</button>
                    <button class="tab-btn ${activeTabId === 'cons' ? 'active' : ''}" data-tab="cons">Challenges</button>
                </div>
                
                <div id="facts" class="tab-content ${activeTabId === 'facts' ? 'active' : ''}">
                    <ul class="content-list">
                        ${breed.facts.map(fact => `<li>${fact}</li>`).join('')}
                    </ul>
                </div>
                
                <div id="abilities" class="tab-content ${activeTabId === 'abilities' ? 'active' : ''}">
                    <ul class="content-list">
                        ${breed.abilities.map(ability => `<li>${ability}</li>`).join('')}
                    </ul>
                </div>
                
                <div id="cons" class="tab-content ${activeTabId === 'cons' ? 'active' : ''}">
                    <ul class="content-list">
                        ${breed.cons.map(con => `<li>${con}</li>`).join('')}
                    </ul>
                </div>
            </section>
        `;

        // Re-attach tab listeners
        attachTabListeners();
    }

    function attachTabListeners() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                activeTabId = e.target.dataset.tab;
                
                // Update buttons
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                // Update content
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                document.getElementById(activeTabId).classList.add('active');
            });
        });
    }

    initSidebar();
    renderBreed();
});
