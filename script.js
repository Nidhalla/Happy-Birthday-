document.addEventListener('DOMContentLoaded', function() {
    const cake = document.getElementById('birthdayCake');
    const audio = document.getElementById('birthdaySong');
    const particlesContainer = document.getElementById('particles-container');
    const cakeContainer = document.getElementById('cakeContainer');
    const swiperSection = document.getElementById('swiperSection');
    const ucapanSection = document.getElementById('ucapanSection');
    
    
    let isExploded = false;
    let vibrationInterval;
    let vibrationCount = 0;
    const maxVibrations = 40;
    let currentUcapanIndex = 0;
    const ucapanData = [];
    
    
    // Inisialisasi Swiper
    let swiper = null;
    
    cake.addEventListener('click', function() {
        if (isExploded) return;
        
        isExploded = true;
        vibrationCount = 0;
        
        // Mulai getaran cepat
        startVibration();
        
        // Mulai lagu
        audio.volume = 0.7;
        audio.play().catch(e => {
            console.log("Autoplay diblokir, klik kue sekali lagi untuk memulai musik");
            isExploded = false;
        });
    });


    
    function startVibration() {
        // Getaran cepat
        cake.style.animation = 'vibrate 0.03s infinite';
        
        vibrationInterval = setInterval(() => {
            vibrationCount++;
            
            if (vibrationCount > maxVibrations) {
                clearInterval(vibrationInterval);
                startSlowVibration();
            }
        }, 30);
    }
    
    function startSlowVibration() {
        // Getaran melambat
        cake.style.animation = 'slowVibrate 0.15s infinite';
        
        setTimeout(() => {
            explodeCake();
        }, 800);
    }
    
    function explodeCake() {
    // Animasi ledakan pada kue
    cake.style.animation = 'explode 0.8s forwards';
    
    // Buat partikel konfeti
    createConfetti();
    
    // Setelah ledakan, remove cake dari DOM
    setTimeout(() => {
        // Remove cake element
        if (cake.parentNode) {
            cake.parentNode.removeChild(cake);
        }
        
        // Juga remove cake container
        if (cakeContainer.parentNode) {
            cakeContainer.parentNode.removeChild(cakeContainer);
        }
        
        showSwiperSection();
        initializeSwiper();
        
        // Setelah beberapa detik, tampilkan ucapan
        setTimeout(() => {
            showUcapanSection();
        }, 3000);
    }, 800);
}
    
    function showSwiperSection() {
        // Tampilkan swiper section dengan animasi
        swiperSection.classList.remove('d-none');
        swiperSection.classList.add('fade-in-up');
        
        // Smooth scroll ke swiper
        setTimeout(() => {
            swiperSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
    
    function showUcapanSection() {
        // Tampilkan ucapan section dengan animasi
        ucapanSection.classList.remove('d-none');
        ucapanSection.classList.add('fade-in-up');
        
        // Smooth scroll ke ucapan
        setTimeout(() => {
            ucapanSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
    
    
    
    function initializeSwiper() {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML = '';
    
    // Buat array nama file foto PNG Anda
    const fotoFiles = [
        'foto1.jpeg',
        'foto2.jpeg', 
        'foto3.jpeg',
        'foto4.jpeg',
        'foto5.jpeg',
        'foto6.jpeg',
        'foto7.jpeg',
        'foto8.jpeg',
        'foto9.jpeg',
        'foto10.jpeg'
    ];
    
    fotoFiles.forEach((filename, index) => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        
        const imageUrl = filename;
        const number = index + 1;
        
        slide.innerHTML = `
            <img src="${imageUrl}" class="img-fluid" loading="lazy">
        `;
        
        swiperWrapper.appendChild(slide);
    });
    
    
    // Inisialisasi Swiper dengan auto slide - TANPA TOMBOL NAVIGASI
    swiper = new Swiper('.swiper-container', {
        slidesPerView: 3, // Pakai auto untuk responsive
        spaceBetween: 15,
        centeredSlides: false,
        loop: true,
        loopAdditionalSlides: 5,
        speed: 800,
        grabCursor: true,
        freeMode: true, // Biar bisa scroll bebas
        mousewheel: {
            forceToAxis: true, // Hanya scroll horizontal
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        // HAPUS navigation section (tombol)
        // HAPUS pagination section (dots)
        breakpoints: {
            320: {
                slidesPerView: 2, // Mobile: 2 slide
                spaceBetween: 10,
            },
            576: {
                slidesPerView: 3, // Small mobile: 3 slide
                spaceBetween: 15,
            },
            768: {
                slidesPerView: 4, // Tablet: 4 slide
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 5, // Desktop: 5 slide
                spaceBetween: 25,
            },
            1200: {
                slidesPerView: 6, // Large desktop: 6 slide
                spaceBetween: 30,
            },
        },
        // Enable touch/swipe
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,
        
        on: {
            init: function() {
                console.log('Swiper initialized');
            },
        },
    });
    
    // Enable mousewheel navigation
    swiper.mousewheel.enable();
    
    // Enable keyboard navigation (optional)
    swiper.keyboard.enable();
}



    function updateSlideOpacity(swiperInstance) {
        // Beri opacity pada slide yang tidak aktif (efek Netflix)
        swiperInstance.slides.forEach((slide, index) => {
            const slideOffset = slide.swiperSlideOffset;
            const centerOffset = swiperInstance.width / 2;
            const distanceFromCenter = Math.abs(slideOffset + slide.offsetWidth / 2 - centerOffset);
            const maxDistance = swiperInstance.width / 2;
            const opacity = 1 - (distanceFromCenter / maxDistance) * 0.7; // Slide samping redup 70%
            
            slide.style.opacity = opacity;
            slide.style.transform = `scale(${0.8 + opacity * 0.2})`; // Sedikit scaling
        });
    }
    
    function createConfetti() {
        const colors = ['#ff6b6b', '#ffd166', '#06d6a0', '#118ab2', '#ef476f', '#7209b7', '#f72585', '#4cc9f0'];
        const shapes = ['circle', 'rect'];
        const particleCount = 150;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            
            if (shape === 'circle') {
                particle.style.borderRadius = '50%';
                const size = Math.random() * 15 + 8;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
            } else {
                particle.style.borderRadius = '2px';
                particle.style.width = Math.random() * 20 + 10 + 'px';
                particle.style.height = Math.random() * 8 + 4 + 'px';
                particle.style.transform = `rotate(${Math.random() * 360}deg)`;
            }
            
            particle.style.backgroundColor = color;
            
            const cakeRect = cake.getBoundingClientRect();
            const containerRect = particlesContainer.getBoundingClientRect();
            
            const startX = cakeRect.left + cakeRect.width / 2 - containerRect.left;
            const startY = cakeRect.top + cakeRect.height / 2 - containerRect.top;
            
            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            
            particlesContainer.appendChild(particle);
            
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 4 + 2;
            const distance = Math.random() * 300 + 150;
            
            const targetX = Math.cos(angle) * distance;
            const targetY = Math.sin(angle) * distance;
            const rotation = Math.random() * 720 - 360;
            const duration = Math.random() * 2000 + 1500;
            
            particle.animate([
                {
                    transform: 'translate(0, 0) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translate(${targetX}px, ${targetY}px) rotate(${rotation}deg)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
            });
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, duration + 1000);
        }
    }
    
    // Handle autoplay blocked
    cake.addEventListener('click', function handleSecondClick() {
        if (audio.paused && isExploded) {
            audio.play().then(() => {
                cake.removeEventListener('click', handleSecondClick);
            });
        }
    });
});