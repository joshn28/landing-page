const navBar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');

function setActiveSection(sec) {
    const notActiveLink = document.querySelector('.active');
    notActiveLink.classList.remove('active');

    for (const link of navBar.childNodes) {
        if (link.innerHTML === sec.dataset.nav) {
            link.classList.add('active');
            break;
        }
    }
}

function navMenu() {
    const fragment = document.createDocumentFragment();

    for (const section of sections) {
        const navItem = document.createElement('li');
        navItem.innerHTML = section.dataset.nav;

        fragment.appendChild(navItem);
    }

    // highlight the first section as active in the navbar
    fragment.childNodes[0].classList.add('active');

    navBar.appendChild(fragment);
}

document.addEventListener('scroll', () => {
    
    for (const section of sections) {
        const rect = section.getBoundingClientRect();

        if (rect.top >= -700) {
            const notActive = document.querySelector('.active-sec');
            notActive.classList.remove('active-sec');

            section.classList.add('active-sec');
            setActiveSection(section);
            break;
        }
    }
});

navMenu();