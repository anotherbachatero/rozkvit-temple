// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initForms();
    initAnimations();
    initModals();
    initVideoHover();
});

// Video loading and hover-to-play functionality
function initVideoHover() {
    const video = document.getElementById('heroVideo');
    const fallbackImage = document.getElementById('fallbackImage');
    const videoLoading = document.getElementById('videoLoading');
    const heroImage = document.querySelector('.hero-image');
    
    if (video && fallbackImage && heroImage) {
        // Initially hide video and show fallback image
        video.style.display = 'none';
        fallbackImage.style.display = 'block';
        videoLoading.style.display = 'flex';
        
        // Set video to first frame
        video.currentTime = 0;
        video.pause();
        
        // Handle video loading
        video.addEventListener('loadeddata', function() {
            // Video metadata loaded, hide loading indicator
            videoLoading.classList.add('hidden');
        });
        
        video.addEventListener('canplaythrough', function() {
            // Video can play through, show video and hide fallback
            fallbackImage.style.display = 'none';
            video.style.display = 'block';
            videoLoading.classList.add('hidden');
        });
        
        video.addEventListener('error', function() {
            // Video failed to load, keep fallback image
            console.log('Video failed to load, using fallback image');
            fallbackImage.style.display = 'block';
            video.style.display = 'none';
            videoLoading.classList.add('hidden');
        });
        
        // Play on hover (only if video is loaded)
        heroImage.addEventListener('mouseenter', function() {
            if (video.style.display !== 'none') {
                video.play();
            }
        });
        
        // Pause and reset on mouse leave
        heroImage.addEventListener('mouseleave', function() {
            if (video.style.display !== 'none') {
                video.pause();
                video.currentTime = 0;
            }
        });
        
        // Start loading video metadata
        video.load();
    }
}

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
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
}

// Scroll effects and animations
function initScrollEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .event-card, .testimonial-card, .about-content, .contact-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Form handling
function initForms() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm(this);
        });
    }

    // Booking form
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleBookingForm(this);
        });
    }

    // Event form
    const eventForm = document.getElementById('eventForm');
    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleEventForm(this);
        });
    }
}

// Contact form handler
function handleContactForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showNotification('Message sent successfully! Tiana will get back to you soon.', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Booking form handler
function handleBookingForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    if (!data.bookingName || !data.bookingEmail || !data.bookingPhone || !data.bookingService || !data.bookingDate || !data.bookingTime) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        showNotification('Booking request submitted! Tiana will contact you to confirm your session.', 'success');
        form.reset();
        closeModal('bookingModal');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Event form handler
function handleEventForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    if (!data.eventName || !data.eventEmail || !data.eventPhone || !data.eventType) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Registering...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        showNotification('Event registration successful! You will receive a confirmation email shortly.', 'success');
        form.reset();
        closeModal('eventModal');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Modal functionality
function initModals() {
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="block"]');
            if (openModal) {
                openModal.style.display = 'none';
            }
        }
    });
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function openBookingModal(serviceType) {
    const modal = document.getElementById('bookingModal');
    const serviceSelect = document.getElementById('bookingService');
    
    // Pre-select service if specified
    if (serviceType && serviceSelect) {
        serviceSelect.value = serviceType;
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function openEventModal(eventType) {
    const modal = document.getElementById('eventModal');
    const eventSelect = document.getElementById('eventType');
    
    // Pre-select event if specified
    if (eventType && eventSelect) {
        eventSelect.value = eventType;
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 3000;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
    `;
    document.head.appendChild(style);

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Animation initialization
function initAnimations() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Counter animation for statistics (if any)
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Service worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Lazy loading for images (if any are added later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
initLazyLoading();

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// AI Teacher functionality
function initAITeacher() {
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatContainer = document.getElementById('chatContainer');
    const typingIndicator = document.getElementById('typingIndicator');

    if (!messageInput || !sendBtn || !chatContainer) return;

    // Send message on button click
    sendBtn.addEventListener('click', function() {
        sendMessage();
    });

    // Send message on Enter key press
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Enable/disable send button based on input
    messageInput.addEventListener('input', function() {
        sendBtn.disabled = !this.value.trim();
    });

    // Initialize send button state
    sendBtn.disabled = true;
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (!message) return;

    // Add user message to chat
    addMessageToChat(message, 'user');
    
    // Clear input and disable send button
    messageInput.value = '';
    document.getElementById('sendBtn').disabled = true;

    // Show typing indicator
    showTypingIndicator();

    // Simulate AI response delay
    setTimeout(() => {
        hideTypingIndicator();
        const aiResponse = generateAIResponse(message);
        addMessageToChat(aiResponse, 'ai');
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
}

function addMessageToChat(message, sender) {
    const chatContainer = document.getElementById('chatContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    content.textContent = message;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    chatContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    // Add animation
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    setTimeout(() => {
        messageDiv.style.transition = 'all 0.3s ease';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 100);
}

function showTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.classList.add('show');
        typingIndicator.style.opacity = '0';
        typingIndicator.style.transform = 'translateY(20px)';
        setTimeout(() => {
            typingIndicator.style.transition = 'all 0.3s ease';
            typingIndicator.style.opacity = '1';
            typingIndicator.style.transform = 'translateY(0)';
        }, 100);
    }
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.style.transition = 'all 0.3s ease';
        typingIndicator.style.opacity = '0';
        typingIndicator.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            typingIndicator.classList.remove('show');
        }, 300);
    }
}

function generateAIResponse(userMessage) {
    const responses = {
        // Meditation related responses
        'meditation': [
            "Meditation is a beautiful practice that connects you with your inner self. Start with just 5-10 minutes daily, focusing on your breath. Find a quiet space, sit comfortably, and gently observe your thoughts without judgment.",
            "Begin your meditation journey by creating a sacred space in your home. Light a candle or use essential oils. Start with guided meditations - there are many wonderful apps and videos available to help you begin.",
            "Meditation isn't about emptying your mind, but about becoming aware of your thoughts. When your mind wanders, gently bring your attention back to your breath. This is the practice - returning to the present moment."
        ],
        
        // Soul activation responses
        'soul activation': [
            "Soul activation is the process of awakening your true essence and connecting with your higher purpose. It involves clearing energetic blockages and aligning with your authentic self.",
            "Your soul has always known its purpose. Soul activation helps you remember who you truly are beneath the layers of conditioning and limiting beliefs. It's about coming home to yourself.",
            "Through soul activation, you can access your inner wisdom, increase your intuition, and live a life aligned with your highest potential. It's a journey of self-discovery and empowerment."
        ],
        
        // Chakra balancing responses
        'chakra': [
            "Chakras are energy centers in your body that affect your physical, emotional, and spiritual well-being. There are seven main chakras, each associated with different aspects of life.",
            "To balance your chakras, try meditation, yoga, or energy healing. Each chakra responds to different colors, sounds, and affirmations. Start by focusing on one chakra at a time.",
            "Your chakras can become blocked due to stress, trauma, or negative emotions. Regular energy work, meditation, and mindful living can help keep them balanced and flowing freely."
        ],
        
        // Energy healing responses
        'energy healing': [
            "Energy healing works on the subtle energy systems of your body to promote balance and well-being. It can help release emotional blockages and restore your natural energy flow.",
            "There are many forms of energy healing - Reiki, crystal healing, sound therapy, and more. The key is finding a practice that resonates with you and your unique energy.",
            "Energy healing isn't just about fixing problems - it's about creating a deeper connection with yourself and the universal life force energy that flows through all things."
        ],
        
        // Life purpose responses
        'purpose': [
            "Your life purpose is often found in what brings you joy, what you're naturally good at, and what you feel called to do. Pay attention to what lights you up and makes you feel most alive.",
            "Finding your purpose is a journey, not a destination. It often involves trial and error, self-reflection, and being open to new experiences. Trust that your path will unfold naturally.",
            "Your purpose may evolve over time. What matters most is living authentically and making a positive impact in your own unique way. Listen to your heart and follow your intuition."
        ],
        
        // Stress and anxiety responses
        'stress': [
            "Stress and anxiety are signals from your body that something needs attention. Try deep breathing exercises, meditation, or gentle movement to help calm your nervous system.",
            "Remember that you are not your thoughts or emotions. Practice observing them without judgment, like clouds passing through the sky. This awareness can help you find peace.",
            "Creating a daily self-care routine can help manage stress. This might include meditation, journaling, spending time in nature, or doing something creative that brings you joy."
        ],
        
        // General spiritual guidance
        'spiritual': [
            "Spirituality is about connecting with something greater than yourself - whether that's the universe, nature, or your own inner wisdom. It's a deeply personal journey.",
            "Trust your intuition - it's your soul's way of communicating with you. The more you listen to and follow your inner guidance, the stronger it becomes.",
            "Remember that you are a spiritual being having a human experience. Embrace both the light and shadow aspects of yourself - they all serve your growth and evolution."
        ]
    };

    // Convert user message to lowercase for matching
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keywords and return appropriate response
    for (const [keyword, responseArray] of Object.entries(responses)) {
        if (lowerMessage.includes(keyword)) {
            return responseArray[Math.floor(Math.random() * responseArray.length)];
        }
    }
    
    // Default responses for unmatched queries
    const defaultResponses = [
        "That's a wonderful question! I'm here to help guide you on your spiritual journey. Could you tell me more about what specific aspect you'd like to explore?",
        "I sense you're seeking deeper understanding. Trust that the answers you need are already within you. What feels most important to you right now?",
        "Your question touches on something meaningful. Remember, spiritual growth is a journey of self-discovery. What practices or experiences have brought you closer to your authentic self?",
        "I'm here to support your spiritual awakening. Every question is an opportunity for growth. What would you like to explore together today?",
        "Your curiosity is beautiful! The spiritual path is unique for each person. What aspects of your spiritual journey are you most curious about right now?",
        "Thank you for sharing that with me. I believe everyone has their own path to spiritual understanding. What feels like your next step in your journey?",
        "Your question shows wisdom and openness. Remember, there are no wrong questions on the spiritual path. What would help you feel more connected to your authentic self?",
        "I appreciate your openness to learning and growing. Spiritual wisdom often comes through experience and reflection. What practices have you found most helpful so far?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

function askQuickQuestion(question) {
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.value = question;
        messageInput.focus();
        document.getElementById('sendBtn').disabled = false;
    }
}


