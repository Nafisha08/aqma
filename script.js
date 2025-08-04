/**
 * AQMA Website JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Mobile Navigation Toggle
    const createMobileNav = () => {
        const header = document.querySelector('header');
        if (!header) return;

        // Create mobile menu button if it doesn't exist
        if (!document.querySelector('.mobile-menu-toggle')) {
            const menuToggle = document.createElement('button');
            menuToggle.className = 'mobile-menu-toggle';
            menuToggle.innerHTML = '<span></span><span></span><span></span>';
            menuToggle.setAttribute('aria-label', 'Toggle Navigation Menu');
            
            header.querySelector('.logo-container').appendChild(menuToggle);
            
            menuToggle.addEventListener('click', function() {
                const nav = document.querySelector('nav');
                if (nav) {
                    nav.classList.toggle('active');
                    this.classList.toggle('active');
                }
            });
        }
    };

    // Testimonial Slider
    const initTestimonialSlider = () => {
        const testimonials = document.querySelectorAll('.testimonial');
        if (testimonials.length <= 1) return;

        let currentIndex = 0;
        const slider = document.querySelector('.testimonial-slider');
        
        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });

        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        
        testimonials.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = index === 0 ? 'dot active' : 'dot';
            dot.addEventListener('click', () => showTestimonial(index));
            dotsContainer.appendChild(dot);
        });
        
        slider.parentNode.appendChild(dotsContainer);

        // Function to show a specific testimonial
        function showTestimonial(index) {
            testimonials.forEach(testimonial => testimonial.style.display = 'none');
            testimonials[index].style.display = 'block';
            
            // Update active dot
            document.querySelectorAll('.dot').forEach((dot, i) => {
                dot.className = i === index ? 'dot active' : 'dot';
            });
            
            currentIndex = index;
        }

        // Auto-rotate testimonials
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
    };

    // Smooth scrolling for anchor links
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // Add animation on scroll
    const initScrollAnimation = () => {
        const elements = document.querySelectorAll('.feature, .product-card, .testimonial');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };

    // Initialize all functions
    createMobileNav();
    initTestimonialSlider();
    initSmoothScroll();
    initScrollAnimation();

    // Add CSS for mobile menu and animations
    const addDynamicStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            /* Mobile Menu Styles */
            .mobile-menu-toggle {
                display: none;
                background: none;
                border: none;
                cursor: pointer;
                padding: 10px;
                z-index: 1000;
            }
            
            .mobile-menu-toggle span {
                display: block;
                width: 25px;
                height: 3px;
                margin: 5px 0;
                background: #333;
                transition: all 0.3s;
            }
            
            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -7px);
            }
            
            /* Slider Dots */
            .slider-dots {
                display: flex;
                justify-content: center;
                margin-top: 20px;
            }
            
            .dot {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: #ccc;
                margin: 0 5px;
                cursor: pointer;
                transition: background 0.3s;
            }
            
            .dot.active {
                background: #0066cc;
            }
            
            /* Animation Classes */
            .feature, .product-card, .testimonial {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.5s, transform 0.5s;
            }
            
            .feature.animate, .product-card.animate, .testimonial.animate {
                opacity: 1;
                transform: translateY(0);
            }
            
            @media (max-width: 768px) {
                .mobile-menu-toggle {
                    display: block;
                }
                
                nav {
                    position: fixed;
                    top: 0;
                    right: -300px;
                    width: 300px;
                    height: 100vh;
                    background: #fff;
                    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
                    transition: right 0.3s;
                    z-index: 999;
                    padding: 80px 20px 20px;
                }
                
                nav.active {
                    right: 0;
                }
                
                nav ul {
                    flex-direction: column;
                    align-items: flex-start;
                }
                
                nav ul li {
                    width: 100%;
                    margin: 0;
                }
                
                nav ul li a {
                    padding: 15px 0;
                    display: block;
                    width: 100%;
                    border-bottom: 1px solid #eee;
                }
                
                .dropdown {
                    position: static;
                    width: 100%;
                    box-shadow: none;
                    padding-left: 20px;
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    addDynamicStyles();
});