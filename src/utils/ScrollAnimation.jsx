
import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (options = {}) => {
    const {
        threshold = 0.1,
        rootMargin = '0px 0px -100px 0px',
        animationClass = 'animate-fadeInUp',
        delayChildren = false,
        childClassName = '',
        childDelay = 0.1,
        maxDelay = 1, // Maximum delay in seconds for staggered children
    } = options;

    const elementRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const currentRef = elementRef.current;

        if (!currentRef) return;

        // Create observer for main element
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    entry.target.classList.add(animationClass);
                    observer.unobserve(entry.target);

                    // Handle staggered children if needed
                    if (delayChildren && childClassName) {
                        const children = currentRef.querySelectorAll(`.${childClassName}`);
                        children.forEach((child, index) => {
                            // Limit the maximum delay
                            const delay = Math.min(index * childDelay, maxDelay);
                            child.style.animationDelay = `${delay}s`;
                            child.classList.add(animationClass);
                        });
                    }
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(currentRef);

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [animationClass, childClassName, delayChildren, childDelay, maxDelay, threshold, rootMargin]);

    return { elementRef, isVisible };
};

// Animated components for easy implementation
export const ScrollAnimatedSection = ({
    children,
    className = '',
    animationClass = 'animate-fadeInUp',
    threshold = 0.1,
    delayChildren = false,
    childClassName = '',
    ...props
}) => {
    const { elementRef } = useScrollAnimation({
        animationClass,
        threshold,
        delayChildren,
        childClassName
    });

    return (
        <div ref={elementRef} className={`opacity-0 ${className}`} {...props}>
            {children}
        </div>
    );
};

// Different animation types to add variety
export const animationVariants = {
    fadeUp: 'animate-fadeInUp',
    fadeIn: 'animate-fadeIn',
    fadeRight: 'animate-fadeInRight',
    fadeLeft: 'animate-fadeInLeft',
    scaleUp: 'animate-scaleUp',
    zoomIn: 'animate-zoomIn',
    flip: 'animate-flip',
    bounce: 'animate-bounce-slow',
};

// Extra animations for the index.css file
export const cssAnimations = `
/* Additional animations */
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleUp {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes flip {
  from {
    opacity: 0;
    transform: perspective(400px) rotateY(90deg);
  }
  to {
    opacity: 1;
    transform: perspective(400px) rotateY(0deg);
  }
}

/* Apply the new animations */
.animate-fadeInRight {
  animation: fadeInRight 0.7s ease-out forwards;
}

.animate-fadeInLeft {
  animation: fadeInLeft 0.7s ease-out forwards;
}

.animate-scaleUp {
  animation: scaleUp 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

.animate-zoomIn {
  animation: zoomIn 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

.animate-flip {
  animation: flip 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

/* Scroll reveal animations for different directions */
.reveal-up {
  transform: translateY(50px);
  opacity: 0;
  transition: transform 0.8s ease, opacity 0.8s ease;
}

.reveal-left {
  transform: translateX(-50px);
  opacity: 0;
  transition: transform 0.8s ease, opacity 0.8s ease;
}

.reveal-right {
  transform: translateX(50px);
  opacity: 0;
  transition: transform 0.8s ease, opacity 0.8s ease;
}

.reveal-visible {
  transform: translate(0);
  opacity: 1;
}

/* Parallax scrolling animations */
.parallax-slow {
  transform: translateY(var(--parallax-offset, 0));
}

.parallax-medium {
  transform: translateY(calc(var(--parallax-offset, 0) * 1.5));
}

.parallax-fast {
  transform: translateY(calc(var(--parallax-offset, 0) * 2));
}

/* Tilt effect animations on hover */
.tilt-element {
  transition: transform 0.3s ease;
  transform-style: preserve-3d;
}

.tilt-element:hover {
  transform: perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
}

/* Text reveal animation */
.text-reveal {
  position: relative;
}

.text-reveal::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--primary-600);
  transform-origin: right;
  transform: scaleX(1);
  transition: transform 0.5s ease;
}

.text-reveal.revealed::after {
  transform: scaleX(0);
}

/* Stagger delay utility classes */
.stagger-delay-0 { animation-delay: 0s; }
.stagger-delay-1 { animation-delay: 0.1s; }
.stagger-delay-2 { animation-delay: 0.2s; }
.stagger-delay-3 { animation-delay: 0.3s; }
.stagger-delay-4 { animation-delay: 0.4s; }
.stagger-delay-5 { animation-delay: 0.5s; }
.stagger-delay-6 { animation-delay: 0.6s; }
.stagger-delay-7 { animation-delay: 0.7s; }
.stagger-delay-8 { animation-delay: 0.8s; }
.stagger-delay-9 { animation-delay: 0.9s; }
.stagger-delay-10 { animation-delay: 1s; }
`;

// Helper function to set up parallax effect
export const setupParallax = () => {
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const parallaxElements = document.querySelectorAll('.parallax-element');

            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.1;
                const offset = scrollY * speed;
                element.style.setProperty('--parallax-offset', `${offset}px`);
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
};

// Helper function to set up tilt effect
export const useTiltEffect = (elementRef, options = {}) => {
    const {
        max = 10, // Maximum tilt in degrees
        perspective = 1000, // Perspective value
        scale = 1.05, // Scale on hover
        speed = 300, // Speed of the transition
    } = options;

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const handleMouseMove = (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xPercent = x / rect.width;
            const yPercent = y / rect.height;

            const xRotation = (0.5 - yPercent) * max * 2; // Inverted for correct tilt
            const yRotation = (xPercent - 0.5) * max * 2;

            element.style.setProperty('--tilt-x', `${xRotation}deg`);
            element.style.setProperty('--tilt-y', `${yRotation}deg`);
            element.style.transform = `perspective(${perspective}px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(${scale})`;
            element.style.transition = `transform ${speed}ms`;
        };

        const handleMouseLeave = () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [elementRef, max, perspective, scale, speed]);
};

export default useScrollAnimation;
