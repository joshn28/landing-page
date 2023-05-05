const navBar = document.querySelector('.navbar');

/**
* @description Set an active state to the navigation item relative to the section in the viewport
* @param {Element} section - A section element
*/
const setActiveLink = section => {
    // Remove the active class from the current nav item
    const notActiveLink = document.querySelector('.active');
    notActiveLink.classList.remove('active');

    // Get the nav item that corresponds to the active section
    const linkId = section.dataset.nav.split(' ').join('').toLowerCase();
    const link = document.querySelector(`a[href='#${linkId}']`);

    link.classList.add('active');
};

/**
* @description Dynamically build the navigation menu
*/
const navMenu = () => {
    const sections = document.querySelectorAll('section');
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const link = document.createElement('a');
        const navItem = document.createElement('li');

        link.innerHTML = section.dataset.nav;
        link.setAttribute('href', `#section${i+1}`);

        navItem.appendChild(link);
        fragment.appendChild(navItem);
    }

    // Highlight the first item as active in the navbar
    const firstLink = fragment.childNodes[0].firstChild;
    firstLink.classList.add('active');

    navBar.appendChild(fragment);
};

/**
* @description Add an event listener to the DOM for the functionality to distinguish the section in view
*/
document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    
    for (const section of sections) {
        const rect = section.getBoundingClientRect();

        // Check if the section is being viewed
        if (rect.top >= -700) {
            const notActive = document.querySelector('.active-sec');
            notActive.classList.remove('active-sec');

            section.classList.add('active-sec');
            setActiveLink(section);
            break;
        }
    }
});

/**
* @description Add an event listener to the DOM for the functionality to show the scroll to the top button
*/
document.addEventListener('scroll', () => {
    const firstSection = document.querySelector('section');
    const scrollBtn = document.querySelector('.scroll-btn');
    const rect = firstSection.getBoundingClientRect();

    // Check if the user scrolls below the fold of the page
    if (rect.top <= 0) {
        scrollBtn.classList.remove('hidden');
    } else {
        scrollBtn.classList.add('hidden');
    }
});

/**
* @description Add an event listener to the DOM for the functionality to scroll to top of the page
*/
document.addEventListener('click', (evt) => {
    if (evt.target.nodeName === 'BUTTON') {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }
});

/**
* @description Add an event listener to the navigation menu to add the functionality to scroll to sections
*/
navBar.addEventListener('click', evt => {
    if (evt.target.nodeName === 'A') {
        evt.preventDefault();

        // Get the appropriate section element for the item that was clicked from the navigation menu
        const sectionId = evt.target.textContent.split(' ').join('').toLowerCase();
        const section = document.querySelector(`#${sectionId}`);

        section.scrollIntoView({
            behavior: "smooth",
        });
    }
});

navMenu();