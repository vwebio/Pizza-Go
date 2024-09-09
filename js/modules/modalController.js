import { scrollController } from "./scrollController.js";

// Управление модальным окном
export const modalController = ({modal, btnOpen, btnClose, time = 300, cbOpen = () => {}}) => {
  const buttonElems = document.querySelectorAll(btnOpen);
  const modalElem = document.querySelector(modal);

  // Стили для модального окна
  modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity ${time}ms ease-in-out;
  `;

  // Функция для закрытия модального окна
  const closeModal = event => {
    const target = event.target;

    // Закрываем модальное окно, если клик был по модальному окну, событие всплывает к (фону, кнопке закрытия, клавише Escape)
    if (target === modalElem || (btnClose && target.closest(btnClose)) || event.code === 'Escape') {
      modalElem.style.opacity = 0;

      // Через указанное время скрываем модальное окно и разблокируем прокрутку
      setTimeout(() => {
        modalElem.style.visibility = 'hidden';
        scrollController.enabledScroll();
      }, time);
      
      window.removeEventListener('keydown', closeModal);
    }
  }

  // Функция для открытия модального окна
  const openModal = (e) => {
    cbOpen(e.target);    
    modalElem.style.visibility = 'visible';
    modalElem.style.opacity = 1;
    window.addEventListener('keydown', closeModal);
    // Блокируем прокрутку
    scrollController.disabledScroll();
  };

  // Обработчики событий клика для всех кнопок, открывающих модальное окно
  buttonElems.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  // Закрытие модального окна
  modalElem.addEventListener('click', closeModal);
};
