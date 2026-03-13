// Matrix Rain Effect
const canvas = document.getElementById('matrix-rain');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Matrix characters (Katakana + Latin + Numbers +符号)
const matrixChars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?';

// Font settings
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

// Initialize drops
for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
}

// Draw function
function draw() {
    // Semi-transparent black to create trail effect
    ctx.fillStyle = 'rgba(13, 2, 8, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff41';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];

        // Brighter color for head of column
        if (drops[i] < 10) {
            ctx.fillStyle = '#ffffff'; // white for head
        } else if (drops[i] < 30) {
            ctx.fillStyle = '#00ff41'; // green
        } else {
            ctx.fillStyle = '#008f11'; // darker green for tail
        }

        // Draw character
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Reset drop after going off screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Increment Y position
        drops[i]++;
    }
}

// Run the matrix effect
setInterval(draw, 50);

// Typing Animation for Hero Section
const typingElement = document.getElementById('typing-text');
const phrases = [
    '> loading DevOps profile...',
    '> initializing Infrastructure as Code...',
    '> deploying Kubernetes clusters...',
    '> building CI/CD pipelines...',
    '> automating everything...',
    '> ready for challenges'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before next phrase
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing animation
setTimeout(typeEffect, 1000);

// Visitor Counter API Integration
// =================================
const VISITOR_API_ENDPOINT = 'https://ci7nir7pm2.execute-api.us-east-1.amazonaws.com/'; // [PLACEHOLDER: Update this URL]

async function fetchVisitorCount() {
    try {
        const response = await fetch(VISITOR_API_ENDPOINT);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Adjust this based on your API's response structure
        // Common patterns:
        // 1. { "count": 1234 }
        // 2. { "visitors": 1234 }
        // 3. { "data": { "count": 1234 } }

        // For this API, assuming it returns a number directly or in a 'count' field
        const count = data.count || data.visitors || data.total || data;

        return typeof count === 'number' ? count : parseInt(count, 10) || 0;

    } catch (error) {
        console.error('Failed to fetch visitor count:', error);
        return 0; // Return 0 on error, not random number
    }
}

function updateVisitorCounter() {
    const counterElement = document.getElementById('visitor-count');
    if (!counterElement) return;

    fetchVisitorCount().then(count => {
        // Format number with commas
        const formattedCount = typeof count === 'number'
            ? count.toLocaleString('en-US')
            : count;
        counterElement.textContent = formattedCount;
    });
}

// Initialize visitor counter
document.addEventListener('DOMContentLoaded', () => {
    updateVisitorCounter();
    // Removed: setInterval(updateVisitorCounter, 30000);
    // The visitor counter should only be incremented once per page view
});

// Update datetime in footer
function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const datetimeElement = document.getElementById('datetime');
    if (datetimeElement) {
        datetimeElement.textContent = now.toLocaleString('en-US', options);
    }
}

updateDateTime();
setInterval(updateDateTime, 1000);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Glitch effect on hover for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.animation = 'glitch-skew 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite';
    });

    card.addEventListener('mouseleave', function() {
        this.style.animation = 'none';
    });
});

// Add glitch keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch-skew {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(style);

// Terminal window interactive effect
document.querySelectorAll('.terminal-window').forEach(terminal => {
    terminal.addEventListener('click', function() {
        this.style.borderColor = this.style.borderColor === 'rgb(0, 255, 65)' ?
            'rgba(0, 255, 65, 0.3)' : 'rgb(0, 255, 65)';
    });
});

// Easter egg: Konami code for special effect
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        alert('🔓 Secret unlocked: You found the DevOps easter egg!');
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Rainbow animation for easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

console.log('%c TAHA YAĞIZ GÜLER - DevOps Engineer ',
    'background: #000; color: #00ff41; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Matrix Theme Portfolio | Infrastructure as Code | Kubernetes | CI/CD ',
    'color: #00ffff; font-size: 12px;');
