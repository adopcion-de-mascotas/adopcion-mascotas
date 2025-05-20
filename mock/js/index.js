// Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Modal Handling
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const closeLoginModal = document.getElementById('closeLoginModal');
        const closeRegisterModal = document.getElementById('closeRegisterModal');
        const switchToRegister = document.getElementById('switchToRegister');
        const switchToLogin = document.getElementById('switchToLogin');
        const loginModal = document.getElementById('loginModal');
        const registerModal = document.getElementById('registerModal');
        
        loginBtn.addEventListener('click', () => {
            loginModal.classList.add('active');
            loginModal.classList.remove('opacity-0', 'invisible');
        });
        
        registerBtn.addEventListener('click', () => {
            registerModal.classList.add('active');
            registerModal.classList.remove('opacity-0', 'invisible');
        });
        
        closeLoginModal.addEventListener('click', () => {
            loginModal.classList.remove('active');
            loginModal.classList.add('opacity-0', 'invisible');
        });
        
        closeRegisterModal.addEventListener('click', () => {
            registerModal.classList.remove('active');
            registerModal.classList.add('opacity-0', 'invisible');
        });
        
        switchToRegister.addEventListener('click', () => {
            loginModal.classList.remove('active');
            loginModal.classList.add('opacity-0', 'invisible');
            registerModal.classList.add('active');
            registerModal.classList.remove('opacity-0', 'invisible');
        });
        
        switchToLogin.addEventListener('click', () => {
            registerModal.classList.remove('active');
            registerModal.classList.add('opacity-0', 'invisible');
            loginModal.classList.add('active');
            loginModal.classList.remove('opacity-0', 'invisible');
        });
        
        // Pet Details Modal
        const petDetailsModal = document.getElementById('petDetailsModal');
        const closePetDetailsModal = document.getElementById('closePetDetailsModal');
        const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
        
        viewDetailsBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // In a real app, you would fetch pet details based on data-pet-id
                // Here we're just showing the modal with sample data
                petDetailsModal.classList.add('active');
                petDetailsModal.classList.remove('opacity-0', 'invisible');
            });
        });
        
        closePetDetailsModal.addEventListener('click', () => {
            petDetailsModal.classList.remove('active');
            petDetailsModal.classList.add('opacity-0', 'invisible');
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (!mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                }
            });
        });