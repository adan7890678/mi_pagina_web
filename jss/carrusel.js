 document.addEventListener('DOMContentLoaded', function() {
            const carousel = document.getElementById('carousel');
            const track = document.getElementById('track');
            const cards = document.querySelectorAll('.card-container');
            
            // Clonar las tarjetas para el efecto infinito
            const cloneCards = () => {
                const cardCount = cards.length;
                for (let i = 0; i < cardCount; i++) {
                    const clone = cards[i].cloneNode(true);
                    track.appendChild(clone);
                }
            };
            
            cloneCards();
            
            // Configuración de la animación
            let animationId;
            let speed = 0.5; // px por frame
            let position = 0;
            let lastTime;
            let isPaused = false;
            
            // Calcular el ancho total de una tarjeta incluyendo el gap
            const cardStyle = getComputedStyle(cards[0]);
            const cardWidth = cards[0].offsetWidth + parseFloat(getComputedStyle(track).gap);
            
            // Función de animación optimizada
            const animate = (currentTime) => {
                if (!lastTime) lastTime = currentTime;
                const deltaTime = currentTime - lastTime;
                lastTime = currentTime;
                
                if (!isPaused) {
                    position -= speed * (deltaTime / 16); // Normalizar a 60fps
                    
                    // Reinicio suave cuando se desplaza el equivalente al ancho de las tarjetas originales
                    if (position < -cardWidth * cards.length) {
                        position += cardWidth * cards.length;
                    }
                    
                    track.style.transform = `translateX(${position}px)`;
                }
                
                animationId = requestAnimationFrame(animate);
            };
            
            // Iniciar animación
            animationId = requestAnimationFrame(animate);
            
            // Control de pausa al hacer hover
            carousel.addEventListener('mouseenter', () => {
                isPaused = true;
            });
            
            carousel.addEventListener('mouseleave', () => {
                isPaused = false;
                lastTime = performance.now(); // Resetear el tiempo para evitar saltos
            });
            
            // Ajustar velocidad según el tamaño de pantalla
            const adjustSpeed = () => {
                if (window.innerWidth < 768) {
                    speed = 0.6;
                } else if (window.innerWidth < 1200) {
                    speed = 1;
                } else {
                    speed = 1;
                }
            };
            
            window.addEventListener('resize', adjustSpeed);
            adjustSpeed();
            
            // Limpiar al desmontar
            window.addEventListener('beforeunload', () => {
                cancelAnimationFrame(animationId);
            });
        });