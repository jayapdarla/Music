document.addEventListener('DOMContentLoaded', () => {
    // Particle effect
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }

    // Button interaction
    const btn = document.getElementById('interact-btn');
    const greeting = document.getElementById('greeting');
    const subtitle = document.getElementById('subtitle');

    const messages = [
        " Hello Music World",
        "Bonjour le monde",
        "Hola Mundo",
        "Hallo Welt",
        "Ciao Mondo",
        "こんにちは世界"
    ];

    let currentIndex = 0;

    btn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % messages.length;
        
        // Remove animation to re-trigger
        greeting.style.animation = 'none';
        greeting.offsetHeight; // trigger reflow
        
        greeting.textContent = messages[currentIndex];
        
        // Add a subtle pop animation to the card
        const card = document.querySelector('.glass-card');
        card.classList.remove('celebrate');
        void card.offsetWidth; // trigger reflow
        card.classList.add('celebrate');

        // Change subtitle slightly
        subtitle.textContent = `Displaying greeting ${currentIndex + 1} of ${messages.length}`;
        
        // Restore pulse animation
        greeting.style.animation = 'pulse 3s infinite ease-in-out';
        
        // Add a burst of particles on click
        createBurst();
    });
});

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size between 2px and 10px
    const size = Math.random() * 8 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    
    // Random animation duration
    const duration = Math.random() * 20 + 10;
    particle.style.animationDuration = `${duration}s`;
    
    // Random animation delay
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    container.appendChild(particle);
}

function createBurst() {
    const container = document.getElementById('particles-container');
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 6 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Start near center
        particle.style.left = `calc(50vw + ${(Math.random() - 0.5) * 100}px)`;
        particle.style.top = `calc(50vh + ${(Math.random() - 0.5) * 100}px)`;
        
        // Faster animation
        particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
        
        // Special color for burst
        particle.style.background = `hsl(${Math.random() * 360}, 100%, 70%)`;
        
        container.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => {
            if (container.contains(particle)) {
                container.removeChild(particle);
            }
        }, 5000);
    }
}
