// ============ EFFETTO PARTICELLE MAGICHE ============
function createSparkles(e) {
    const sparkle = document.createElement('span');
    sparkle.classList.add('sparkle');
    sparkle.style.left = e.pageX + 'px';
    sparkle.style.top = e.pageY + 'px';
    sparkle.innerHTML = ['✨', '💫', '⭐', '🌟'][Math.floor(Math.random() * 4)];
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 600);
}

document.addEventListener('click', createSparkles);

// ============ PARALLAX EFFECT ============
document.addEventListener('mousemove', (e) => {
    const background = document.querySelector('.background-magic');
    const x = (e.clientX / window.innerWidth) * 20;
    const y = (e.clientY / window.innerHeight) * 20;
    background.style.transform = `translate(${x}px, ${y}px)`;
});

// ============ CONFETTI EFFECT ============
function createConfetti() {
    const colors = ['#dc143c', '#ffd700', '#8b0000', '#c41e3a', '#ff69b4'];
    const confettiPieces = 30;
    
    for (let i = 0; i < confettiPieces; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.delay = Math.random() * 0.5 + 's';
        confetti.innerHTML = ['💕', '💖', '💝', '🎉'][Math.floor(Math.random() * 4)];
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}

// ============ FALLING IMAGES EFFECT ============
function createFallingImages() {
    const images = ['Ari1.png', 'Ari2.png'];
    const imageCount = 20;
    
    for (let i = 0; i < imageCount; i++) {
        setTimeout(() => {
            const img = document.createElement('img');
            img.classList.add('falling-image');
            img.src = images[i % 2]; // Alterna tra Ari1.png e Ari2.png
            img.style.left = Math.random() * 100 + '%';
            img.style.animationDelay = Math.random() * 0.5 + 's';
            img.style.animationDuration = (2 + Math.random() * 2) + 's';
            document.body.appendChild(img);
            
            setTimeout(() => img.remove(), 5000);
        }, i * 150);
    }
}

// ============ GESTIONE BOTTONI SI E NO ============
let yesButtonScale = 1;

document.addEventListener('DOMContentLoaded', () => {
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    
    if (yesButton) {
        yesButton.addEventListener('click', () => {
            createFallingImages();
            playMagicSound();
            showNotification('💕 MI FRA non te ne pentirai 💕', '#dc143c');
        });
    }
    
    if (noButton) {
        noButton.addEventListener('click', (e) => {
            // Ingrandisci il bottone SI
            yesButtonScale += 0.3;
            yesButton.style.transform = `scale(${yesButtonScale})`;
            yesButton.style.transition = 'transform 0.3s ease';
            
            // Mostra faccina arrabbiata
            showAngryFace(e.pageX, e.pageY);
            
            // Shake del bottone NO
            noButton.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                noButton.style.animation = '';
            }, 500);
        });
    }
});

function showAngryFace(x, y) {
    const angryFace = document.createElement('div');
    angryFace.classList.add('angry-face');
    angryFace.innerHTML = '😠<br><span class="ncsp-text">NCSP</span>';
    angryFace.style.left = x + 'px';
    angryFace.style.top = y + 'px';
    document.body.appendChild(angryFace);
    
    setTimeout(() => angryFace.remove(), 2000);
}

// ============ SELEZIONE CASE DI HOGWARTS ============
const houses = {
    'gryffindor': { name: 'Grifondoro', color: '#dc143c', emoji: '🦁' },
    'slytherin': { name: 'Serpeverde', color: '#1a7a1a', emoji: '🐍' },
    'ravenclaw': { name: 'Corvonero', color: '#0066cc', emoji: '🦅' },
    'hufflepuff': { name: 'Tassorosso', color: '#ffd700', emoji: '🦡' }
};

document.querySelectorAll('.house').forEach(houseElement => {
    houseElement.addEventListener('click', function(e) {
        const houseClass = Array.from(this.classList).find(cls => Object.keys(houses).includes(cls));
        
        if (houseClass) {
            const house = houses[houseClass];
            selectHouse(house);
        }
    });
    
    houseElement.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(2deg)';
    });
    
    houseElement.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

function selectHouse(house) {
    const header = document.querySelector('.header-magic h1');
    const prevSelected = document.querySelector('.house.selected');
    
    if (prevSelected) {
        prevSelected.classList.remove('selected');
    }
    
    event.target.closest('.house').classList.add('selected');
    
    // Cambio colore del titolo
    header.style.color = house.color;
    header.style.textShadow = `0 0 20px ${house.color}50`;
    
    // Animazione quando si seleziona una casa
    createHouseSparkles(house.emoji);
    
    showNotification(`Hai scelto: ${house.emoji} ${house.name}!`, house.color);
}

function createHouseSparkles(emoji) {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.classList.add('house-sparkle');
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.innerHTML = emoji;
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1500);
        }, i * 100);
    }
}

// ============ NOTIFICHE ============
function showNotification(message, color = '#dc143c') {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    notification.style.borderColor = color;
    notification.style.color = color;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============ EFFETTI HOVER SUI DETTAGLI ============
document.querySelectorAll('.detail-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px)';
        this.style.color = '#dc143c';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
        this.style.color = '#333';
    });
});

// ============ ANIMAZIONE DI TESTO MAGICA ============
function createMagicText(element, text) {
    element.innerHTML = '';
    const words = text.split(' ');
    
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.opacity = '0';
        span.style.animation = `magicAppear 0.5s ease forwards`;
        span.style.animationDelay = (index * 0.1) + 's';
        element.appendChild(span);
    });
}

// ============ SUONI INTERATTIVI ============
function playMagicSound() {
    // Creiamo un suono di magia usando Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    
    // Nota 1
    const osc1 = audioContext.createOscillator();
    osc1.frequency.setValueAtTime(800, now);
    osc1.frequency.exponentialRampToValueAtTime(1200, now + 0.3);
    
    const gain1 = audioContext.createGain();
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    
    osc1.connect(gain1);
    gain1.connect(audioContext.destination);
    
    osc1.start(now);
    osc1.stop(now + 0.3);
    
    // Nota 2
    const osc2 = audioContext.createOscillator();
    osc2.frequency.setValueAtTime(1200, now + 0.1);
    osc2.frequency.exponentialRampToValueAtTime(1600, now + 0.4);
    
    const gain2 = audioContext.createGain();
    gain2.gain.setValueAtTime(0.2, now + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    
    osc2.connect(gain2);
    gain2.connect(audioContext.destination);
    
    osc2.start(now + 0.1);
    osc2.stop(now + 0.4);
}

// ============ EASTER EGG - SPELL ============
let spellSequence = [];
const spellTrigger = ['L', 'I', 'N', 'C', 'A', 'N', 'T', 'E', 'S', 'I', 'M', 'O'];

document.addEventListener('keydown', (e) => {
    spellSequence.push(e.key.toUpperCase());
    spellSequence = spellSequence.slice(-spellTrigger.length);
    
    if (spellSequence.join('') === spellTrigger.join('')) {
        castMagicSpell();
        spellSequence = [];
    }
});

function castMagicSpell() {
    showNotification('✨ INCANTESIMO LANCIATO! ✨', '#ffd700');
    
    // Effetto schermo
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = 'rgba(255, 215, 0, 0.3)';
    flash.style.zIndex = '9999';
    flash.style.animation = 'flashScreen 0.6s ease';
    document.body.appendChild(flash);
    
    playMagicSound();
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createSparkles({
                pageX: Math.random() * window.innerWidth,
                pageY: Math.random() * window.innerHeight
            });
        }, i * 50);
    }
    
    setTimeout(() => flash.remove(), 600);
}

// ============ RESPONS IVITÀ ============
function adjustForDevice() {
    if (window.innerWidth < 768) {
        document.querySelectorAll('.house').forEach(house => {
            house.style.fontSize = '12px';
            house.style.padding = '6px 8px';
        });
    }
}

window.addEventListener('resize', adjustForDevice);
window.addEventListener('load', adjustForDevice);

// ============ ANIMAZIONE PAGINA AL CARICAMENTO ============
window.addEventListener('load', () => {
    const envelope = document.getElementById('envelope');
    envelope.style.animation = 'pageLoadAnimation 1s ease-out forwards';
    
    showNotification('💕 MI FRA ✨', '#dc143c');
});
