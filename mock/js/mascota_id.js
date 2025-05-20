// Change main image when thumbnail is clicked
        function changeMainImage(src) {
            document.getElementById('mainImage').src = src;
            
            // Update active thumbnail
            document.querySelectorAll('.gallery-thumbnail').forEach(thumb => {
                thumb.classList.remove('active');
            });
            event.currentTarget.classList.add('active');
        }

        // Toggle favorite button
        document.getElementById('favoriteBtn').addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            icon.classList.toggle('text-red-500');
            
            // Show toast notification
            const toast = document.createElement('div');
            toast.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm';
            
            if (icon.classList.contains('fas')) {
                toast.textContent = 'Max añadido a tus favoritos';
            } else {
                toast.textContent = 'Max eliminado de tus favoritos';
            }
            
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.remove();
            }, 3000);
        });

        // Change tab content
        function changeTab(tabName) {
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.add('hidden');
            });
            
            // Show selected tab content
            document.getElementById(tabName + 'Tab').classList.remove('hidden');
            
            // Update active tab button
            document.querySelectorAll('.tab-button').forEach(button => {
                button.classList.remove('active');
            });
            event.currentTarget.classList.add('active');
        }

        // Simulate adoption button click
        document.querySelector('button:has(i.fa-home)').addEventListener('click', function() {
            // In a real app, this would open an adoption form
            const toast = document.createElement('div');
            toast.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm';
            toast.textContent = '¡Solicitud de adopción enviada! Nos pondremos en contacto contigo pronto.';
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.remove();
            }, 5000);
        });