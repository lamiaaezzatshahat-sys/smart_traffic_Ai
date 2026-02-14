// Header scroll effect
window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        mobileMenuBtn.innerHTML = mainNav.classList.contains('active')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Set active nav link based on scroll position
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Video modal functionality
const videoModal = document.getElementById('videoModal');
const playVideoBtn = document.getElementById('playVideoBtn');
const closeModal = document.getElementById('closeModal');
const demoVideo = document.getElementById('demoVideo');

// Function to open modal
function openVideoModal() {
    videoModal.style.display = 'flex';
    setTimeout(() => {
        demoVideo.play();
    }, 100);
    document.body.style.overflow = 'hidden';
}

// Function to close modal
function closeVideoModal() {
    videoModal.style.display = 'none';
    demoVideo.pause();
    demoVideo.currentTime = 0;
    document.body.style.overflow = 'auto';
}

// Open modal when clicking play button
if (playVideoBtn) {
    playVideoBtn.addEventListener('click', openVideoModal);
}

// Open modal when clicking "Try Live Demo" button
if (document.getElementById('heroTrialBtn')) {
    document.getElementById('heroTrialBtn').addEventListener('click', openVideoModal);
}

// Close modal functionality
closeModal.addEventListener('click', closeVideoModal);

// Close modal when clicking outside the video
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        closeVideoModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.style.display === 'flex') {
        closeVideoModal();
    }
});

// CTA buttons functionality
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function () {
        if (this.textContent.includes('Trial') || this.textContent.includes('Start Free')) {
            alert('Thank you for your interest! Your 14-day free trial has been activated. Check your email for login instructions.');
        } else if (this.textContent.includes('Demo') || this.textContent.includes('Book')) {
            alert('Demo scheduled! Our team will contact you within 24 hours to arrange a personalized demonstration.');
        } else if (this.textContent.includes('Sign In')) {
            alert('Redirecting to login page...');
        }
    });
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Add staggered animation for feature cards
            if (entry.target.id === 'feature1') {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 100);
            } else if (entry.target.id === 'feature2') {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 300);
            } else if (entry.target.id === 'feature3') {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 500);
            }

            // Add staggered animation for class items
            if (entry.target.id.startsWith('class')) {
                const delay = parseInt(entry.target.id.replace('class', '')) * 100;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }

            // Add staggered animation for steps
            if (entry.target.id.startsWith('step')) {
                const delay = parseInt(entry.target.id.replace('step', '')) * 200;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .class-item, .step').forEach(el => {
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.backgroundPosition = `0px ${rate}px`;
    }
});

// Initialize with header scrolled if page is not at top
if (window.scrollY > 50) {
    document.getElementById('header').classList.add('scrolled');
}

// Add floating particles effect
function createParticles() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 5 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(99, 102, 241, 0.2)';
        particle.style.borderRadius = '50%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.zIndex = '0';
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        heroSection.appendChild(particle);
    }
}

// Create particles after page load
window.addEventListener('load', createParticles);
