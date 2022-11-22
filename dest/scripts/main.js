
//
// Mobile menu
//

const header = document.querySelector('.header'),
    headerBody = document.querySelector('.header__body'),
    headerBurger = document.querySelector('.header__burger'),
    menuCover = document.querySelector('.menu-cover');

function toggleMobileMenu(e) {
    e.stopPropagation();
    headerBurger.classList.toggle('btn--cross');
    header.classList.toggle('header--mobile-menu');
    document.body.classList.toggle('overflow-hidden');

    menuCover.style.display = menuCover.style.display === 'block' ? '' : 'block';
}

headerBurger.addEventListener('click', toggleMobileMenu);
menuCover.addEventListener('click', toggleMobileMenu);

//
// Accordion
//

let accordionButton = document.getElementsByClassName("accordion__item-toggle");

for(let i = 0; i < accordionButton.length; i++) {
    accordionButton[i].addEventListener("click", toggleItems, false);
}

function toggleItems() {
    this.classList.toggle("is-active");

    let accordionContent = this.nextElementSibling;

    if (accordionContent.style.maxHeight){
        accordionContent.style.maxHeight = null;
    } else {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
    } 
}

//
// Tabs
//


let tabTriggerBtns = document.querySelectorAll('.tabs__nav-item');

tabTriggerBtns.forEach(function(tabTriggerBtn, index){
    tabTriggerBtn.addEventListener('click', function(){
        let currentTabData = document.querySelector('.tabs__content[data-tab="' + this.dataset.activeTab + '"]');

        document.querySelector('.tabs__content--open').classList.remove('tabs__content--open');
        document.querySelector('.tabs__nav-item--active').classList.remove('tabs__nav-item--active');

        currentTabData.classList.add('tabs__content--open');
        this.classList.add('tabs__nav-item--active');
    });
});

//
// Modals
//

let modal = document.querySelectorAll('.modal'),
    modalBtn = document.querySelectorAll('[data-modal]'),
    modalBtnClose = document.querySelectorAll('[data-close-modal]');

function openModal() {
    let modalId = this.getAttribute('data-modal');

    if(document.querySelector('.modal--open')) {
        document.querySelector('.modal--open').classList.remove('modal--open');

        setTimeout(function () {
            document.querySelector('.modal--fadeIn').classList.remove('modal--fadeIn');
        }, 50);
    }

    document.querySelector('#' + modalId).classList.add('modal--open');
    document.body.style.overflow = 'hidden';

    setTimeout(function () {
        document.querySelector('#' + modalId).classList.add('modal--fadeIn');
    }, 50);
}

function closeModal() {
    let openModal = document.querySelector('.modal--open');
    openModal.classList.remove('modal--fadeIn');

    setTimeout(function () {
        openModal.classList.remove('modal--open')
        document.body.style.overflow = '';
    }, 200);
}

for(let a = 0; a < modalBtn.length; a++) {
    modalBtn[a].addEventListener("click", openModal, false);
}

modalBtn.forEach(function(elem) {
    elem.addEventListener("click", openModal);
});

modal.forEach(function(elem) {
    elem.addEventListener("click", closeModal);

    elem.querySelector('[data-close-modal]').addEventListener("click", closeModal);
    
    elem.querySelector('*').addEventListener("click", function() {
        event.stopPropagation();
    });
});

//
// Marquee
//

function handleMarquee() {
    const marquee = document.querySelectorAll('.marquee');
    let speed = 2;

    marquee.forEach(function(el) {
        const container = el.querySelector('.marquee__body');
        const content = el.querySelector('.marquee__body-desc');
        const elWidth = content.offsetWidth;

        let clone = content.cloneNode(true);
        container.appendChild(clone);
        let progress = 1;

        function loop() {
            progress = progress - speed;

            if(progress <= elWidth * -1) {
                progress = 0;
            }

            container.style.transform = 'translateX(' + progress + 'px)';
            container.style.transform += 'skewX(' + speed * 0.4 + 'deg)';
            window.requestAnimationFrame(loop);
        }

        loop();
    });
  };

  handleMarquee();