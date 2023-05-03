const navBar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');

function setActiveSection(sec) {
    const notActiveLink = document.querySelector('.active');
    notActiveLink.classList.remove('active');

    for (const item of navBar.childNodes) {
        const link = item.firstChild;
        
        if (link.innerHTML === sec.dataset.nav) {
            link.classList.add('active');
            break;
        }
    }
}

const scrollToSection = anchor => {
    anchor.addEventListener('click', (evt) => {
        evt.preventDefault();

        for (const section of sections) {
            if (anchor.innerHTML === section.dataset.nav) {
                section.scrollIntoView({
                    behavior: "smooth",
                });
            }
        }
    });
};

function navMenu() {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const link = document.createElement('a');
        const navItem = document.createElement('li');

        link.innerHTML = section.dataset.nav;
        link.setAttribute('href', `#section${i}`);
        scrollToSection(link);

        navItem.appendChild(link);
        fragment.appendChild(navItem);
    }

    // highlight the first section as active in the navbar
    const firstLink = fragment.childNodes[0].firstChild;
    firstLink.classList.add('active');

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