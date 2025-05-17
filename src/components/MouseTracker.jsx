
import { useState, useEffect, useRef } from 'react';

const MouseTracker = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isOverDarkBg, setIsOverDarkBg] = useState(false);
    const [isOverText, setIsOverText] = useState(false);
    const [isOverImage, setIsOverImage] = useState(false);
    const [cursorSize, setCursorSize] = useState({ width: 40, height: 40 });
    const [isMobile, setIsMobile] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    
    const cursorRef = useRef(null);

    // Initialize and handle mouse movement
    useEffect(() => {
        // Check if mobile device
        const checkIsMobile = () => {
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const isSmallScreen = window.innerWidth < 768;
            setIsMobile(isTouchDevice || isSmallScreen);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        // Capture the initial mouse position when the component mounts
        const captureInitialPosition = () => {
            // Only do this on the first mousemove to avoid flickering
            if (!isInitialized) {
                setVisible(true);
                setIsInitialized(true);
                // Force cursor to be visible at initial position
                if (cursorRef.current) {
                    cursorRef.current.style.opacity = '1';
                    cursorRef.current.style.display = 'block';
                }
            }
        };

        const updatePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });

            // Ensure visibility on any mouse movement
            if (!visible) {
                setVisible(true);
                if (cursorRef.current) {
                    cursorRef.current.style.opacity = '1';
                    cursorRef.current.style.display = 'block';
                }
            }

            // Check what's under the cursor
            const elemUnderCursor = document.elementFromPoint(e.clientX, e.clientY);

            if (elemUnderCursor) {
                // Check if over a link or button
                const isOverInteractive =
                    elemUnderCursor.tagName === 'A' ||
                    elemUnderCursor.tagName === 'BUTTON' ||
                    elemUnderCursor.closest('a') ||
                    elemUnderCursor.closest('button') ||
                    elemUnderCursor.classList.contains('cursor-pointer') ||
                    elemUnderCursor.closest('.cursor-pointer');

                setIsHovering(isOverInteractive);

                // Check if over image elements
                const isImageElement = 
                    elemUnderCursor.tagName === 'IMG' ||
                    elemUnderCursor.closest('img') ||
                    elemUnderCursor.classList.contains('project-image') ||
                    elemUnderCursor.closest('.project-image') ||
                    (elemUnderCursor.style && elemUnderCursor.style.backgroundImage && 
                     elemUnderCursor.style.backgroundImage !== 'none');
                
                setIsOverImage(isImageElement && !isOverInteractive);

                // Check if over text elements
                const isTextElement = 
                    elemUnderCursor.tagName === 'P' ||
                    elemUnderCursor.tagName === 'SPAN' ||
                    elemUnderCursor.tagName === 'H1' ||
                    elemUnderCursor.tagName === 'H2' ||
                    elemUnderCursor.tagName === 'H3' ||
                    elemUnderCursor.tagName === 'H4' ||
                    elemUnderCursor.tagName === 'H5' ||
                    elemUnderCursor.tagName === 'H6' ||
                    elemUnderCursor.tagName === 'LI' ||
                    elemUnderCursor.tagName === 'BLOCKQUOTE' ||
                    elemUnderCursor.closest('p') ||
                    elemUnderCursor.closest('span:not(.icon)') ||
                    elemUnderCursor.closest('h1, h2, h3, h4, h5, h6') ||
                    elemUnderCursor.closest('li') ||
                    elemUnderCursor.closest('blockquote');
                
                setIsOverText(isTextElement && !isOverInteractive && !isImageElement);

                // Check if over dark background
                const computedStyle = window.getComputedStyle(elemUnderCursor);
                const elemBgColor = computedStyle.backgroundColor;
                
                // Also check if the document is in dark mode
                const isDarkMode = document.documentElement.classList.contains('dark');
                
                // Determine if background is dark
                const isDark =
                    isDarkMode ||
                    elemBgColor.includes('rgba(0, 0, 0') ||
                    elemBgColor.includes('rgb(0, 0, 0') ||
                    elemUnderCursor.classList.contains('dark') ||
                    elemUnderCursor.classList.contains('dark-bg') ||
                    elemUnderCursor.classList.contains('bg-dark') ||
                    elemUnderCursor.classList.contains('dark:bg-gray-800') ||
                    elemUnderCursor.classList.contains('bg-gray-900') ||
                    elemUnderCursor.classList.contains('bg-primary-600');

                setIsOverDarkBg(isDark);
            }
        };

        const handleMouseEnter = () => {
            setVisible(true);
            captureInitialPosition();
        };

        const handleMouseMove = (e) => {
            updatePosition(e);
            captureInitialPosition();
        };

        const handleMouseLeave = () => {
            setVisible(false);
        };

        if (!isMobile) {
            // Add a specific handler for the initial position
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseenter', handleMouseEnter);
            document.addEventListener('mouseleave', handleMouseLeave);
            
            // Capture the initial mouse position when the page loads
            if (typeof document !== 'undefined') {
                // If the mouse is already in the window when the component loads
                const currentMouseX = typeof window !== 'undefined' ? window.mouseX : 0;
                const currentMouseY = typeof window !== 'undefined' ? window.mouseY : 0;
                
                if (currentMouseX && currentMouseY) {
                    setPosition({ x: currentMouseX, y: currentMouseY });
                    setVisible(true);
                    setIsInitialized(true);
                }
            }
        }

        return () => {
            if (!isMobile) {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseenter', handleMouseEnter);
                document.removeEventListener('mouseleave', handleMouseLeave);
            }
            window.removeEventListener('resize', checkIsMobile);
        };
    }, [isMobile, isInitialized, visible]);

    // Handle hover effects for interactive elements
    useEffect(() => {
        const handleInteractiveEnter = () => {
            setIsHovering(true);
            setCursorSize({ width: 80, height: 80 });
        };

        const handleInteractiveLeave = () => {
            setIsHovering(false);
            setCursorSize({ width: 40, height: 40 });
        };

        if (!isMobile) {
            // Add global event listeners for all links and buttons
            const links = document.querySelectorAll('a, button, .cursor-pointer');

            links.forEach(link => {
                link.addEventListener('mouseenter', handleInteractiveEnter);
                link.addEventListener('mouseleave', handleInteractiveLeave);
            });

            return () => {
                links.forEach(link => {
                    link.removeEventListener('mouseenter', handleInteractiveEnter);
                    link.removeEventListener('mouseleave', handleInteractiveLeave);
                });
            };
        }
    }, [isMobile]);

    // Apply custom cursor styles to body
    useEffect(() => {
        if (!isMobile) {
            // Add 'cursor-none' class to body to hide the default cursor
            document.body.classList.add('custom-cursor');
            
            return () => {
                document.body.classList.remove('custom-cursor');
            };
        }
    }, [isMobile]);

    // Don't render if on mobile
    if (isMobile) {
        return null;
    }

    // Define different cursor styles based on context
    const getCursorSize = () => {
        if (isHovering) return { width: 80, height: 80 };
        if (isOverText) return { width: 30, height: 30 }; // Smaller cursor for text
        if (isOverImage) return { width: 60, height: 60 }; // Larger cursor for images
        return { width: 40, height: 40 }; // Default size
    };
    
    const currentSize = getCursorSize();

    // Define cursor icon content based on context
    const getCursorIcon = () => {
        if (isOverImage) return '🔍'; // Magnifying glass for images
        return '';
    };

    const cursorStyle = {
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'width 0.2s, height 0.2s, background-color 0.3s, mix-blend-mode 0.3s, opacity 0.3s, transform 0.1s, border-radius 0.3s',
        width: `${currentSize.width}px`,
        height: `${currentSize.height}px`,
        borderRadius: isOverText ? '50% 50% 50% 0' : '50%', // Text cursor has a tail
        left: position.x - (currentSize.width / 2),
        top: position.y - (currentSize.height / 2),
        transform: 'translate3d(0, 0, 0)',
        mixBlendMode: isOverDarkBg ? 'difference' : 'normal',
        backgroundColor: isHovering
            ? 'rgba(79, 70, 229, 0.2)'
            : isOverText
                ? 'rgba(79, 70, 229, 0.15)' // More transparent for text
                : isOverImage
                    ? 'rgba(79, 70, 229, 0.25)' // Slightly more opaque for images
                    : isOverDarkBg
                        ? 'rgba(255, 255, 255, 0.5)'
                        : 'rgba(79, 70, 229, 0.3)',
        border: isHovering
            ? '2px solid rgba(79, 70, 229, 0.6)'
            : isOverText
                ? '1px solid rgba(79, 70, 229, 0.8)' // Thinner border for text
                : isOverImage
                    ? '2px dashed rgba(79, 70, 229, 0.8)' // Dashed border for images
                    : isOverDarkBg
                        ? '2px solid rgba(255, 255, 255, 0.8)'
                        : '2px solid rgba(79, 70, 229, 0.6)',
        opacity: visible ? 1 : 0,
        display: visible ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: isOverImage ? '18px' : '0',
        color: isOverDarkBg ? '#fff' : '#4f46e5',
        fontWeight: 'bold',
    };

    const innerDotStyle = {
        position: 'absolute',
        width: isHovering ? '8px' : isOverText ? '4px' : isOverImage ? '0' : '6px', // Hide dot for images
        height: isHovering ? '8px' : isOverText ? '4px' : isOverImage ? '0' : '6px',
        backgroundColor: isOverDarkBg ? '#fff' : '#4f46e5',
        borderRadius: '50%',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.2s, height 0.2s',
    };

    return (
        <>
            <div ref={cursorRef} style={cursorStyle} className="hardware-accelerated">
                {isOverImage ? getCursorIcon() : <div style={innerDotStyle}></div>}
            </div>
            
            {/* Add inline styles to hide default cursor */}
            <style jsx global>{`
                body.custom-cursor, 
                body.custom-cursor a, 
                body.custom-cursor button,
                body.custom-cursor input[type="submit"],
                body.custom-cursor .cursor-pointer {
                    cursor: none !important;
                }
            `}</style>
        </>
    );
};

export default MouseTracker;