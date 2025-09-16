// Hamburger Menu Management with Accessibility
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navRight = document.getElementById('nav-right');
    
    hamburger.addEventListener('click', function() {
        const isActive = hamburger.classList.contains('active');
        hamburger.classList.toggle('active');
        navRight.classList.toggle('active');
        
        // Update ARIA attributes for accessibility
        hamburger.setAttribute('aria-expanded', !isActive);
        hamburger.setAttribute('aria-label', !isActive ? 'Menu sluiten' : 'Menu openen');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navRight.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Menu openen');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navRight.contains(event.target)) {
            hamburger.classList.remove('active');
            navRight.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Menu openen');
        }
    });
    
    // Keyboard navigation support
    hamburger.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            hamburger.click();
        }
    });
}

// Elsloo Premium Story Management
function initElslooGallery() {
    const photoFrames = document.querySelectorAll('.photo-frame');
    const storyElements = {
        intro: document.getElementById('storyIntro'),
        main: document.getElementById('storyMain'),
        ambiance: document.getElementById('storyAmbiance')
    };
    
    // Story variations for each photo
    const storyVariations = {
        maasvallei: {
            intro: '<span class="drop-cap">A</span>an de oevers van de Maas, waar de tijd zijn eigen tempo volgt, ligt een plek die al eeuwenlang verhalen vertelt...',
            main: 'De Maasvallei heeft door de eeuwen heen niet alleen het landschap gevormd, maar ook de cultuur en gastronomie van deze streek beïnvloed. Hier, waar de rivier het leven bepaalt, vindt u onze bistro.',
            ambiance: 'Het geluid van het stromende water en de rust van het Limburgse landschap creëren een unieke sfeer die perfect past bij onze Franse gastronomie.'
        },
        hoofdstraat: {
            intro: '<span class="drop-cap">I</span>n het hart van Oud-Elsloo, waar elke steen een verhaal vertelt, staat een plek die geschiedenis ademt...',
            main: 'Kerkstraat 1, een adres met karakter. Hier, omringd door historische gebouwen en de sfeer van weleer, staat onze bistro op een plek waar al eeuwenlang mensen samenkomen.',
            ambiance: 'De warmte van het oude Elsloo, verrijkt met Franse verfijning, creëert een unieke \'Limbourgeois\' ambiance die de beste van beide werelden verenigt.'
        },
        'franse-traditie': {
            intro: '<span class="drop-cap">W</span>aar culinaire kunst en passie samenkomen, ontstaat een verhaal van smaak en traditie...',
            main: 'Onze keuken combineert de verfijning van de Franse gastronomie met de warmte en gezelligheid van Limburg. Een culinaire reis die de ziel van beide culturen weergeeft.',
            ambiance: 'Elke gerecht vertelt een verhaal, elke smaak roept herinneringen op. Hier, in het hart van Oud-Elsloo, wordt gastronomie tot kunst verheven.'
        }
    };
    
    // Animate text change
    function animateTextChange(element, newText) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.innerHTML = newText;
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Photo frame interactions
    photoFrames.forEach(frame => {
        frame.addEventListener('mouseenter', function() {
            const storyType = this.getAttribute('data-story');
            const story = storyVariations[storyType];
            
            if (story) {
                // Animate text changes with slight delays for smooth effect
                setTimeout(() => animateTextChange(storyElements.intro, story.intro), 100);
                setTimeout(() => animateTextChange(storyElements.main, story.main), 200);
                setTimeout(() => animateTextChange(storyElements.ambiance, story.ambiance), 300);
            }
        });
        
        frame.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add subtle floating animation to frames
    photoFrames.forEach((frame, index) => {
        const delay = index * 0.5;
        frame.style.animationDelay = `${delay}s`;
        frame.style.animation = 'subtleFloat 6s ease-in-out infinite';
    });
    
    // Add CSS animation for floating effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes subtleFloat {
            0%, 100% { transform: translateY(0px) rotate(var(--initial-rotation, 0deg)); }
            50% { transform: translateY(-3px) rotate(var(--initial-rotation, 0deg)); }
        }
        
        .photo-frame.frame-1 { --initial-rotation: -8deg; }
        .photo-frame.frame-2 { --initial-rotation: 12deg; }
        .photo-frame.frame-3 { --initial-rotation: -5deg; }
        
        .story-intro, .story-main, .story-ambiance {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @media (max-width: 768px) {
            .photo-frame.frame-1, 
            .photo-frame.frame-2, 
            .photo-frame.frame-3 { 
                --initial-rotation: 0deg; 
            }
        }
    `;
    document.head.appendChild(style);
}

// Theme Management
function initTheme() {
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the saved theme
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeSwitch.checked = true;
    } else {
        body.setAttribute('data-theme', 'light');
        themeSwitch.checked = false;
    }
    
    // Theme toggle functionality
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Touch/Swipe support for mobile menu navigation
function initTouchNavigation() {
    const menuBook = document.querySelector('.menu-book');
    if (!menuBook) return;
    
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    const minSwipeDistance = 80; // Increased for better scroll/swipe distinction
    const maxVerticalDistance = 30; // Maximum vertical movement to consider it a swipe
    
    menuBook.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    menuBook.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        // Check if it's a horizontal swipe (not vertical scroll)
        // Must be more horizontal than vertical AND have minimum distance
        if (Math.abs(deltaX) > Math.abs(deltaY) && 
            Math.abs(deltaX) > minSwipeDistance && 
            Math.abs(deltaY) < maxVerticalDistance) {
            e.preventDefault();
            
            if (deltaX > 0) {
                // Swipe right - go to previous page
                prevPage();
            } else {
                // Swipe left - go to next page
                nextPage();
            }
        }
    }, { passive: false });
}

// Multilingual support
const translations = {
    nl: {
        'nav.home': 'Home',
        'nav.menu': 'Menu',
        'nav.about': 'Over Ons',
        'nav.contact': 'Contact',
        'nav.reserve': 'Reserveer',
        'hero.title': 'Bistro Auwt Aelse',
        'hero.subtitle': 'De warmte van het oude Elsloo met een vleugje Frankrijk',
        'hero.description': 'Welkom in ons authentieke bistro, waar Franse gastronomie samenkomt met Limburgse gezelligheid in het historische hart van Oud-Elsloo.',
        'hero.cta': 'Ontdek Ons Menu',
        'reservation.title': 'Reserveer Uw Tafel',
        'reservation.subtitle': 'Geniet van een onvergetelijke culinaire ervaring in ons authentieke bistro',
        'reservation.experience': 'Premium Dining Experience',
        'reservation.experience.desc': 'Geniet van onze Franse gastronomie in een sfeervolle omgeving met uitzicht op de Maasvallei.',
        'reservation.timing': 'Flexibele Tijden',
        'reservation.timing.desc': 'Open van dinsdag tot zondag. Reserveer voor lunch of diner, wij passen ons aan uw planning aan.',
        'reservation.special': 'Speciale Gelegenheden',
        'reservation.special.desc': 'Verjaardagen, bedrijfsdiners of romantische avonden - wij maken elke gelegenheid bijzonder.',
        'reservation.form.title': 'Maak Uw Reservering',
        'reservation.form.subtitle': 'Vul het formulier in en wij nemen zo snel mogelijk contact met u op',
        'reservation.form.name': 'Naam',
        'reservation.form.email': 'E-mail',
        'reservation.form.phone': 'Telefoon',
        'reservation.form.guests': 'Aantal Personen',
        'reservation.form.date': 'Datum',
        'reservation.form.time': 'Tijd',
        'reservation.form.message': 'Speciale Wensen',
        'reservation.form.submit': 'Reservering Versturen',
        'reservation.form.note': 'Verplichte velden. Wij bevestigen uw reservering binnen 24 uur per e-mail of telefoon.',
        'reservation.contact.phone': 'Bel Direct',
        'reservation.contact.phone.desc': 'Ma-Vr 10:00-18:00',
        'reservation.contact.email': 'E-mail',
        'reservation.contact.email.desc': 'Reactie binnen 24 uur',
        'reservation.contact.location': 'Locatie',
        'reservation.contact.location.desc': 'Gratis parkeren'
    },
    fr: {
        'nav.home': 'Accueil',
        'nav.menu': 'Menu',
        'nav.about': 'À Propos',
        'nav.contact': 'Contact',
        'nav.reserve': 'Réserver',
        'hero.title': 'Bistro Auwt Aelse',
        'hero.subtitle': 'La chaleur de l\'ancien Elsloo avec une touche française',
        'hero.description': 'Bienvenue dans notre bistro authentique, où la gastronomie française rencontre la convivialité limbourgeoise au cœur historique d\'Oud-Elsloo.',
        'hero.cta': 'Découvrez Notre Menu',
        'reservation.title': 'Réservez Votre Table',
        'reservation.subtitle': 'Profitez d\'une expérience culinaire inoubliable dans notre bistro authentique',
        'reservation.experience': 'Expérience Gastronomique Premium',
        'reservation.experience.desc': 'Savourez notre gastronomie française dans un cadre chaleureux avec vue sur la vallée de la Meuse.',
        'reservation.timing': 'Horaires Flexibles',
        'reservation.timing.desc': 'Ouvert du mardi au dimanche. Réservez pour le déjeuner ou le dîner, nous nous adaptons à votre planning.',
        'reservation.special': 'Occasions Spéciales',
        'reservation.special.desc': 'Anniversaires, dîners d\'entreprise ou soirées romantiques - nous rendons chaque occasion spéciale.',
        'reservation.form.title': 'Faites Votre Réservation',
        'reservation.form.subtitle': 'Remplissez le formulaire et nous vous contacterons dès que possible',
        'reservation.form.name': 'Nom',
        'reservation.form.email': 'E-mail',
        'reservation.form.phone': 'Téléphone',
        'reservation.form.guests': 'Nombre de Personnes',
        'reservation.form.date': 'Date',
        'reservation.form.time': 'Heure',
        'reservation.form.message': 'Souhaits Spéciaux',
        'reservation.form.submit': 'Envoyer la Réservation',
        'reservation.form.note': 'Champs obligatoires. Nous confirmons votre réservation dans les 24 heures par e-mail ou téléphone.',
        'reservation.contact.phone': 'Appelez Directement',
        'reservation.contact.phone.desc': 'Lun-Ven 10:00-18:00',
        'reservation.contact.email': 'E-mail',
        'reservation.contact.email.desc': 'Réponse dans les 24 heures',
        'reservation.contact.location': 'Localisation',
        'reservation.contact.location.desc': 'Parking gratuit'
    },
    en: {
        'nav.home': 'Home',
        'nav.menu': 'Menu',
        'nav.about': 'About Us',
        'nav.contact': 'Contact',
        'nav.reserve': 'Reserve',
        'hero.title': 'Bistro Auwt Aelse',
        'hero.subtitle': 'The warmth of old Elsloo with a French touch',
        'hero.description': 'Welcome to our authentic bistro, where French gastronomy meets Limburg hospitality in the historic heart of Oud-Elsloo.',
        'hero.cta': 'Discover Our Menu',
        'reservation.title': 'Reserve Your Table',
        'reservation.subtitle': 'Enjoy an unforgettable culinary experience in our authentic bistro',
        'reservation.experience': 'Premium Dining Experience',
        'reservation.experience.desc': 'Savor our French gastronomy in a cozy atmosphere with views of the Meuse Valley.',
        'reservation.timing': 'Flexible Hours',
        'reservation.timing.desc': 'Open Tuesday to Sunday. Reserve for lunch or dinner, we adapt to your schedule.',
        'reservation.special': 'Special Occasions',
        'reservation.special.desc': 'Birthdays, business dinners or romantic evenings - we make every occasion special.',
        'reservation.form.title': 'Make Your Reservation',
        'reservation.form.subtitle': 'Fill out the form and we will contact you as soon as possible',
        'reservation.form.name': 'Name',
        'reservation.form.email': 'Email',
        'reservation.form.phone': 'Phone',
        'reservation.form.guests': 'Number of Guests',
        'reservation.form.date': 'Date',
        'reservation.form.time': 'Time',
        'reservation.form.message': 'Special Requests',
        'reservation.form.submit': 'Send Reservation',
        'reservation.form.note': 'Required fields. We confirm your reservation within 24 hours by email or phone.',
        'reservation.contact.phone': 'Call Directly',
        'reservation.contact.phone.desc': 'Mon-Fri 10:00-18:00',
        'reservation.contact.email': 'Email',
        'reservation.contact.email.desc': 'Response within 24 hours',
        'reservation.contact.location': 'Location',
        'reservation.contact.location.desc': 'Free parking'
    },
    de: {
        'nav.home': 'Startseite',
        'nav.menu': 'Speisekarte',
        'nav.about': 'Über Uns',
        'nav.contact': 'Kontakt',
        'nav.reserve': 'Reservieren',
        'hero.title': 'Bistro Auwt Aelse',
        'hero.subtitle': 'Die Wärme des alten Elsloo mit französischem Touch',
        'hero.description': 'Willkommen in unserem authentischen Bistro, wo französische Gastronomie auf limburgische Gemütlichkeit im historischen Herzen von Oud-Elsloo trifft.',
        'hero.cta': 'Entdecken Sie Unsere Speisekarte',
        'reservation.title': 'Reservieren Sie Ihren Tisch',
        'reservation.subtitle': 'Genießen Sie ein unvergessliches kulinarisches Erlebnis in unserem authentischen Bistro',
        'reservation.experience': 'Premium Dining Experience',
        'reservation.experience.desc': 'Genießen Sie unsere französische Gastronomie in einer gemütlichen Atmosphäre mit Blick auf das Maastal.',
        'reservation.timing': 'Flexible Zeiten',
        'reservation.timing.desc': 'Geöffnet von Dienstag bis Sonntag. Reservieren Sie für Mittag- oder Abendessen, wir passen uns Ihrem Zeitplan an.',
        'reservation.special': 'Besondere Anlässe',
        'reservation.special.desc': 'Geburtstage, Geschäftsessen oder romantische Abende - wir machen jeden Anlass besonders.',
        'reservation.form.title': 'Machen Sie Ihre Reservierung',
        'reservation.form.subtitle': 'Füllen Sie das Formular aus und wir werden uns so schnell wie möglich bei Ihnen melden',
        'reservation.form.name': 'Name',
        'reservation.form.email': 'E-Mail',
        'reservation.form.phone': 'Telefon',
        'reservation.form.guests': 'Anzahl der Gäste',
        'reservation.form.date': 'Datum',
        'reservation.form.time': 'Uhrzeit',
        'reservation.form.message': 'Besondere Wünsche',
        'reservation.form.submit': 'Reservierung Senden',
        'reservation.form.note': 'Pflichtfelder. Wir bestätigen Ihre Reservierung innerhalb von 24 Stunden per E-Mail oder Telefon.',
        'reservation.contact.phone': 'Direkt Anrufen',
        'reservation.contact.phone.desc': 'Mo-Fr 10:00-18:00',
        'reservation.contact.email': 'E-Mail',
        'reservation.contact.email.desc': 'Antwort innerhalb von 24 Stunden',
        'reservation.contact.location': 'Standort',
        'reservation.contact.location.desc': 'Kostenlose Parkplätze'
    }
};

function initLanguage() {
    const languageSelect = document.getElementById('language-select');
    const currentLanguage = localStorage.getItem('language') || 'nl';
    
    // Set current language
    languageSelect.value = currentLanguage;
    updateLanguage(currentLanguage);
    
    // Add event listener
    languageSelect.addEventListener('change', function() {
        const selectedLanguage = this.value;
        localStorage.setItem('language', selectedLanguage);
        updateLanguage(selectedLanguage);
    });
}

// Form Validation
function initFormValidation() {
    const reservationForm = document.getElementById('reservationForm');
    if (!reservationForm) return;
    
    // Real-time validation
    const inputs = reservationForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
    
    // Form submission
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show success message
            showFormMessage('Reservering succesvol verzonden! Wij bevestigen uw reservering binnen 24 uur.', 'success');
            reservationForm.reset();
        }
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error
    clearError(e);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Dit veld is verplicht.';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Voer een geldig e-mailadres in.';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value) || value.length < 10) {
            isValid = false;
            errorMessage = 'Voer een geldig telefoonnummer in.';
        }
    }
    
    // Date validation
    if (field.type === 'date' && value) {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            isValid = false;
            errorMessage = 'Selecteer een datum in de toekomst.';
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function clearError(e) {
    const field = e.target;
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.classList.remove('error');
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

function validateForm() {
    const form = document.getElementById('reservationForm');
    const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function showFormMessage(message, type) {
    const form = document.getElementById('reservationForm');
    const existingMessage = form.querySelector('.form-message');
    
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    form.insertBefore(messageElement, form.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.remove();
        }
    }, 5000);
}

function updateLanguage(language) {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });
    
    // Update document language
    document.documentElement.lang = language;
}

// Loading Screen Animation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Initialize hamburger menu
    initHamburgerMenu();
    
    // Initialize Elsloo gallery
    initElslooGallery();
    
    // Initialize touch navigation
    initTouchNavigation();
    
    // Initialize language
    initLanguage();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize loading screen with real loading functionality
    initLoadingScreen();

// Loading Screen with Real Resource Loading
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const progressBar = document.getElementById('loading-progress');
    const loadingText = document.getElementById('loading-text');
    const icons = ['icon1', 'icon2', 'icon3'];
    let currentIcon = 0;
    let loadedResources = 0;
    let totalResources = 0;
    let loadingComplete = false;

    // Critical resources to load - ALL images to prevent scroll lag
    const criticalResources = [
        'styles.css',
        'script.js',
        // Loading icons
        'resoures/icons/1.png',
        'resoures/icons/2.png', 
        'resoures/icons/3.png',
        // Hero section
        'resoures/hero/herobg.png',
        // Gallery images
        'resoures/img/restaurant.png',
        'resoures/img/terras.png',
        'resoures/img/welkometen.png',
        'resoures/img/wijnflessen.png',
        'resoures/img/oudelsloofoto.png',
        // Menu section icons
        'resoures/icons/voorgerecht.png',
        'resoures/icons/hoofdgerecht.png',
        'resoures/icons/desert.png',
        // Krant photos (these cause scroll lag if not preloaded)
        'resoures/krantfoto\'s/manmetvoorgerecht.png',
        'resoures/krantfoto\'s/manmethoofdgerecht.png',
        'resoures/krantfoto\'s/vrouwmetdesert.png',
        // Oud Elsloo photos
        'resoures/oudelsloo/aanrivierdemaas.png',
        'resoures/oudelsloo/oudelsloohoofdstraat.png',
        'resoures/oudelsloo/oudfransechefkok.png',
        // Contact icons
        'resoures/icons/locatie.png',
        'resoures/icons/telefoon.png',
        'resoures/icons/mailen.png',
        'resoures/icons/reserveren.png'
    ];

    // Icon rotation animation
    function rotateIcons() {
        if (loadingComplete) return;
        
        icons.forEach(iconId => {
            const icon = document.getElementById(iconId);
            if (icon) icon.classList.remove('active');
        });
        
        const currentIconElement = document.getElementById(icons[currentIcon]);
        if (currentIconElement) currentIconElement.classList.add('active');
        
        currentIcon = (currentIcon + 1) % icons.length;
    }

    // Start icon rotation
    const iconInterval = setInterval(rotateIcons, 800);

    // Update progress
    function updateProgress() {
        const progress = Math.round((loadedResources / totalResources) * 100);
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
        
        // Update loading text
        if (loadingText) {
            if (progress < 20) {
                loadingText.textContent = 'Initialiseren...';
            } else if (progress < 40) {
                loadingText.textContent = 'Afbeeldingen laden...';
            } else if (progress < 60) {
                loadingText.textContent = 'Menu items laden...';
            } else if (progress < 80) {
                loadingText.textContent = 'Krant foto\'s laden...';
            } else if (progress < 95) {
                loadingText.textContent = 'Bijna klaar...';
            } else {
                loadingText.textContent = 'Welkom bij Auwt Aelse!';
            }
        }
    }

    // Check if resource is loaded
    function checkResourceLoaded(url) {
        return new Promise((resolve) => {
            if (url.endsWith('.css') || url.endsWith('.js')) {
                // For CSS/JS files, check if they're in the DOM
                const link = document.querySelector(`link[href="${url}"]`) || 
                           document.querySelector(`script[src="${url}"]`);
                resolve(!!link);
            } else {
                // For images, create a test image
                const img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                img.src = url;
                
                // Timeout after 5 seconds
                setTimeout(() => resolve(false), 5000);
            }
        });
    }

    // Load all critical resources with optimized parallel loading
    async function loadCriticalResources() {
        totalResources = criticalResources.length;
        updateProgress();

        // Load resources in batches for better performance
        const batchSize = 5;
        const batches = [];
        
        for (let i = 0; i < criticalResources.length; i += batchSize) {
            batches.push(criticalResources.slice(i, i + batchSize));
        }

        for (const batch of batches) {
            // Load batch in parallel
            const batchPromises = batch.map(async (resource) => {
                try {
                    const isLoaded = await checkResourceLoaded(resource);
                    if (isLoaded) {
                        loadedResources++;
                        updateProgress();
                    }
                } catch (error) {
                    console.warn(`Failed to load resource: ${resource}`);
                    loadedResources++;
                    updateProgress();
                }
            });

            // Wait for batch to complete
            await Promise.all(batchPromises);
            
            // Small delay between batches to show progress
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }

    // Complete loading
    function completeLoading() {
        loadingComplete = true;
        clearInterval(iconInterval);
        
        // Ensure progress is 100%
        if (progressBar) {
            progressBar.style.width = '100%';
        }
        
        // Wait a moment to show 100% progress
        setTimeout(() => {
            // Fade out loading screen
            loadingScreen.classList.add('fade-out');
            
            // Show main content after fade out
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                mainContent.classList.remove('hidden');
            }, 500);
        }, 500);
    }

    // Start loading process
    loadCriticalResources().then(() => {
        // Ensure minimum loading time of 3 seconds for better UX (more resources now)
        const minLoadingTime = 3000;
        const elapsedTime = Date.now() - window.performance.timing.navigationStart;
        
        if (elapsedTime < minLoadingTime) {
            setTimeout(completeLoading, minLoadingTime - elapsedTime);
        } else {
            completeLoading();
        }
    });

    // Fallback: complete loading after maximum 8 seconds
    setTimeout(() => {
        if (!loadingComplete) {
            completeLoading();
        }
    }, 8000);
}

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add transition to header
    header.style.transition = 'transform 0.3s ease-in-out';

    // Premium gallery animation
    const welcomeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate gallery items with staggered delay
                const galleryItems = entry.target.querySelectorAll('.gallery-item');
                galleryItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 200);
                });
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe welcome section
    const welcomeSection = document.querySelector('.welcome');
    if (welcomeSection) {
        welcomeObserver.observe(welcomeSection);
    }

    // Intersection Observer for other sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe other sections for fade-in effect
    const otherSections = document.querySelectorAll('.over-oud-elsloo, .opening-hours, .contact');
    otherSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Initialize menu book navigation
    initMenuBook();


    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Preload critical images
function preloadImages() {
    const imageUrls = [
        'resoures/hero/herobg.png',
        'resoures/img/welkometen.png',
        'resoures/img/oudelsloofoto.png',
        'resoures/icons/1.png',
        'resoures/icons/2.png',
        'resoures/icons/3.png'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Start preloading when page loads
window.addEventListener('load', preloadImages);

// Menu Book Navigation System
function initMenuBook() {
    const pages = document.querySelectorAll('.menu-page');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const pageDots = document.querySelectorAll('.page-dot');
    
    if (!pages.length) return;
    
    let currentPage = 1;
    const totalPages = pages.length;
    
    function goToPage(pageNumber) {
        if (pageNumber < 1 || pageNumber > totalPages || pageNumber === currentPage) return;
        
        const currentPageEl = document.querySelector(`.menu-page[data-page="${currentPage}"]`);
        const nextPageEl = document.querySelector(`.menu-page[data-page="${pageNumber}"]`);
        
        if (!currentPageEl || !nextPageEl) return;
        
        // Determine direction
        const isNext = pageNumber > currentPage;
        
        // Start page turning animation
        currentPageEl.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        nextPageEl.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Animate current page out
        currentPageEl.classList.remove('active');
        currentPageEl.classList.add(isNext ? 'prev' : 'next');
        
        // Set up next page and animate it in
        nextPageEl.classList.remove('prev', 'next');
        nextPageEl.classList.add('active');
        
        currentPage = pageNumber;
        updateNavigation();
    }
    
    function nextPage() {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    }
    
    function previousPage() {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    }
    
    function updateNavigation() {
        // Update arrow buttons
        if (prevBtn) prevBtn.disabled = currentPage === 1;
        if (nextBtn) nextBtn.disabled = currentPage === totalPages;
        
        // Update page dots
        pageDots.forEach((dot, index) => {
            dot.classList.toggle('active', index + 1 === currentPage);
        });
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', previousPage);
    if (nextBtn) nextBtn.addEventListener('click', nextPage);
    
    pageDots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToPage(index + 1));
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') previousPage();
        if (e.key === 'ArrowRight') nextPage();
    });
    
    // Touch/swipe support
    addSwipeSupport();
    
    function addSwipeSupport() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        const menuBook = document.querySelector('.menu-book');
        if (!menuBook) return;
        
        menuBook.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        menuBook.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Only trigger if horizontal swipe is more significant than vertical
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    previousPage();
                } else {
                    nextPage();
                }
            }
        });
    }
    
    // Initialize navigation state
    updateNavigation();
}
