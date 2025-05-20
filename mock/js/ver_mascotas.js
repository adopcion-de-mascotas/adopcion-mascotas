 // Toggle favorite heart icon
        document.querySelectorAll('.heart-icon').forEach(button => {
            button.addEventListener('click', function() {
                const icon = this.querySelector('i');
                icon.classList.toggle('far');
                icon.classList.toggle('fas');
                icon.classList.toggle('active');
            });
        });

        // Simulate loading more pets
        document.getElementById('loadMoreBtn').addEventListener('click', function() {
            const btn = this;
            const spinner = document.getElementById('loadingSpinner');
            
            btn.classList.add('hidden');
            spinner.classList.remove('hidden');
            
            // Simulate API call delay
            setTimeout(() => {
                // In a real app, you would fetch more pets here
                spinner.classList.add('hidden');
                btn.classList.remove('hidden');
                
                // Show a toast notification
                const toast = document.createElement('div');
                toast.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm';
                toast.textContent = '¡No hay más mascotas disponibles por ahora!';
                document.body.appendChild(toast);
                
                setTimeout(() => {
                    toast.remove();
                }, 3000);
            }, 1500);
        });

        // Filter buttons functionality
        document.querySelectorAll('.filter-option').forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                document.querySelectorAll('.filter-option').forEach(btn => {
                    btn.classList.remove('bg-yellow-400', 'text-white');
                    btn.classList.add('bg-white', 'border', 'border-gray-300', 'text-gray-700');
                });
                
                // Add active class to clicked button
                this.classList.remove('bg-white', 'border', 'border-gray-300', 'text-gray-700');
                this.classList.add('bg-yellow-400', 'text-white');
                
                // In a real app, you would filter pets here
            });
        });