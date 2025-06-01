document.addEventListener('DOMContentLoaded', function() {
    initImageZoom();
    
    // Handle window resize events to recalculate zoom parameters
    window.addEventListener('resize', debounce(function() {
        initImageZoom();
    }, 250));
});

function initImageZoom() {
    // Get all product image containers
    const imageContainers = document.querySelectorAll('.product-image-container');
    
    // Initialize zoom for each container
    imageContainers.forEach(container => {
        const img = container.querySelector('.product-image');
        const lens = container.querySelector('.zoom-lens');
        const result = container.querySelector('.zoom-result');
        
        // Clean up previous event listeners if any
        const newImg = img.cloneNode(true);
        img.parentNode.replaceChild(newImg, img);
        
        // Set up new image with fresh event listeners
        setupZoom(container, newImg, lens, result);
    });
}

function setupZoom(container, img, lens, result) {
    // Load high-res image in advance for smooth zooming
    const zoomImageUrl = img.getAttribute('data-zoom-image');
    const highResImage = new Image();
    highResImage.src = zoomImageUrl;
    
    // Hide lens and result initially
    lens.style.display = 'none';
    result.style.display = 'none';
    
    // Set up events once image is loaded
    img.onload = function() {
        initEvents();
    };
    
    if (img.complete) {
        initEvents();
    }
    
    function initEvents() {
        // Set background image for zoom result
        result.style.backgroundImage = `url('${zoomImageUrl}')`;
        
        // Add touch capability for mobile
        let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
        
        if (isTouchDevice) {
            img.addEventListener('touchmove', handleTouch);
            img.addEventListener('touchstart', function() {
                lens.style.display = 'block';
                result.style.display = 'block';
            });
            img.addEventListener('touchend', function() {
                lens.style.display = 'none';
                result.style.display = 'none';
            });
        } else {
            // Mouse events for desktop
            img.addEventListener('mousemove', handleMouse);
            img.addEventListener('mouseenter', function() {
                lens.style.display = 'block';
                result.style.display = 'block';
                updateZoom(img, lens, result);
            });
            img.addEventListener('mouseleave', function() {
                lens.style.display = 'none';
                result.style.display = 'none';
            });
        }
    }
    
    function handleMouse(e) {
        e.preventDefault();
        updateZoomPosition(e, img, lens, result);
    }
    
    function handleTouch(e) {
        e.preventDefault();
        let touch = e.touches[0];
        let mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        updateZoomPosition(mouseEvent, img, lens, result);
    }
}

function updateZoomPosition(e, img, lens, result) {
    // Get cursor position
    const pos = getCursorPos(e, img);
    
    // Calculate position of lens
    let x = pos.x - (lens.offsetWidth / 2);
    let y = pos.y - (lens.offsetHeight / 2);
    
    // Prevent lens from being positioned outside the image
    if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
    if (x < 0) {x = 0;}
    if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
    if (y < 0) {y = 0;}
    
    // Set lens position
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    
    // Calculate the ratio between the zoom result div and lens
    const cx = result.offsetWidth / lens.offsetWidth;
    const cy = result.offsetHeight / lens.offsetHeight;
    
    // Update background size and position
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
    result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
}

function updateZoom(img, lens, result) {
    // Calculate the ratio between result div and lens
    const cx = result.offsetWidth / lens.offsetWidth;
    const cy = result.offsetHeight / lens.offsetHeight;
    
    // Update the background size
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
}

function getCursorPos(e, img) {
    let a, x = 0, y = 0;
    e = e || window.event;
    
    // Get the image's position relative to the viewport
    a = img.getBoundingClientRect();
    
    // Calculate the cursor's x and y coordinates relative to the image
    x = e.pageX - a.left - window.pageXOffset;
    y = e.pageY - a.top - window.pageYOffset;
    
    return {x: x, y: y};
}

// Debounce function to limit rapid function calls
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}