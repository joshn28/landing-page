const navBar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');

function navMenu() {
    const fragment = document.createDocumentFragment();

    for (const section of sections) {
        const navItem = document.createElement('li');
        navItem.textContent = section.dataset.nav;

        fragment.appendChild(navItem);
    }

    navBar.appendChild(fragment);
}

navMenu();