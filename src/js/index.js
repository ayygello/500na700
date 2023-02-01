import '../styles/main.scss';
import UIkit from 'uikit';
import IMask from 'imask';

const arrows = {
  prev: {
    id: 'prev',
    where: 'previous',
  },
  next: {
    id: 'next',
    where: 'next',
  },
};

const initSlider = () => {
  const slider = document.querySelector('#slider');

  UIkit.slider(slider, {
    center: true,
    autoplay: true,
  });
};

const moveSlider = (id, whereSlide) => {
  const itemById = document.getElementById(`${id}`);
  const slidenav = document.querySelector(`a[uk-slidenav-${whereSlide}]`);

  itemById.addEventListener('click', () => {
    slidenav.click();
  });
};

const toggleAccordion = () => {
  const accordionItems = document.querySelectorAll('.accordion__item');
  const accordion = document.getElementById('accordion');
  const activeItem = 'accordion__item-body--active';

  accordion.addEventListener('click', (event) => {
    const description = event.target.nextElementSibling.classList;

    if (description.contains(activeItem)) {
      description.toggle(activeItem);
      return;
    }

    accordionItems.forEach((item) => {
      item = item.lastElementChild.classList;
      item.contains(activeItem) && item.remove(activeItem);
    });

    description.add(activeItem);
  });
};

const phoneMask = () => {
  const phoneInput = document.getElementById('phone');
  const phoneMask = new IMask(phoneInput, {
    mask: '+{7} 000 000-00-00',
  });
};

const setCurrentDate = () => {
  const dateInput = document.getElementById('date');
  const timeInput = document.getElementById('time');
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = date.getMonth();
  const day = date.getDate().toString();
  const hour = date.getHours();
  const minute = date.getMinutes();

  dateInput.value = `${year}-${getMonth(month)}-${getDate(day)}`;
  timeInput.value = `${getDate(hour)}:${getDate(minute)}`;
};

const getDate = (time) => (time < 10 ? `0${time}` : time);

const getMonth = (month) => {
  return month > 9 ? month++ : `0${month + 1}`;
};

initSlider();
moveSlider(arrows.prev.id, arrows.prev.where);
moveSlider(arrows.next.id, arrows.next.where);
toggleAccordion();
phoneMask();
setCurrentDate();
