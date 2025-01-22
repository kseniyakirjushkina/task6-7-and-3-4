const menuElements = {
    button: document.querySelector('.menu-button'),
    dropdown: document.querySelector('.drop'),
    tabs: {
        women: document.querySelector('.tab-women'),
        men: document.querySelector('.tab-men')
    },
    content: {
        women: document.querySelector('.women-content'),
        men: document.querySelector('.men-content')
    }
};

function handleMenuClick(event) {
    event.stopPropagation();
    menuElements.dropdown.classList.toggle('active');
}

function handleOutsideClick(event) {
    if (!menuElements.dropdown.contains(event.target) && !menuElements.button.contains(event.target)) {
        menuElements.dropdown.classList.remove('active');
    }
}

function switchTab(gender) {
    const isWomen = gender === 'women';
    menuElements.content.women.classList.toggle('active', isWomen);
    menuElements.content.men.classList.toggle('active', !isWomen);
    menuElements.tabs.women.classList.toggle('active', isWomen);
    menuElements.tabs.men.classList.toggle('active', !isWomen);
}

function handleCategoryClick(button, event) {
    event.stopPropagation();
    event.preventDefault();
    
    const container = button.closest('.submenu-container');
    const submenu = container.querySelector('.submenu');
    const isActive = button.classList.contains('active');
    const currentContent = button.closest('.women-content, .men-content');

    const activeButtons = currentContent.querySelectorAll('.category-button.active');
    for (let i = 0; i < activeButtons.length; i++) {
        const activeButton = activeButtons[i];
        if (activeButton !== button) {
            activeButton.classList.remove('active');
            const activeSubmenu = activeButton.closest('.submenu-container').querySelector('.submenu');
            if (activeSubmenu) {
                activeSubmenu.classList.remove('active');
            }
        }
    }

    button.classList.toggle('active', !isActive);
    if (submenu) {
        submenu.classList.toggle('active', !isActive);
    }
}

function initializeEventListeners() {
    menuElements.button.addEventListener('click', handleMenuClick);
    document.addEventListener('click', handleOutsideClick);

    menuElements.tabs.women.addEventListener('click', () => switchTab('women'));
    menuElements.tabs.men.addEventListener('click', () => switchTab('men'));

    const categoryButtons = document.querySelectorAll('.category-button');
    for (let i = 0; i < categoryButtons.length; i++) {
        const button = categoryButtons[i];
        button.addEventListener('click', (e) => handleCategoryClick(button, e));
    }
}

initializeEventListeners(); 