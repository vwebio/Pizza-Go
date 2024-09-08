import { toUpperCaseFirstLetter } from "./helper.js";
import { renderPizzas } from "./renderPizzas.js";
import { getData } from "./serviceApi.js";

// Экспортируем функцию для рендеринга топпингов
export const renderToppings = async () => {
  // Получаем данные о топпингах на английском и русском языках
  const {en: enToppings, ru: ruToppings} = await getData('toppings');
  const toppingsList = document.querySelector('.toppings__list');  
  toppingsList.textContent = '';

  // Создаем массив элементов списка топпингов
  const items = enToppings.map((data, i) => {    
    const item = document.createElement('li');
    item.classList.add('toppings__item');

    // Вставляем HTML-код для чекбокса и метки
    item.insertAdjacentHTML('beforeend', `
      <input class="toppings__checkbox" type="checkbox" name="topping" id="${data}" value="${data}">
      <label class="toppings__label" for="${data}">${toUpperCaseFirstLetter(ruToppings[i])}</label>
    `);
    return item;
  });
  
  toppingsList.append(...items);

  // Создаем элемент кнопки сброса
  const itemReset = document.createElement('li');
  itemReset.classList.add('toppings__item');
  
  const btnReset = document.createElement('button');
  btnReset.classList.add('toppings__reset');
  btnReset.textContent = 'Сбросить';
  btnReset.type = 'reset';
  
  itemReset.append(btnReset);

  // Находим форму топпингов в DOM
  const toppingsForm = document.querySelector('.toppings__form');

  // Выделяем выбранные топпинги по клику чекбокса
  toppingsForm.addEventListener('change', e => {    
    const formData = new FormData(toppingsForm);
    const checkedToppings = [];
    
    for (const [, value] of formData.entries()) {
      checkedToppings.push(value);
    }

    // Если есть выбранные топпинги, добавляем кнопку сброса к ним
    if (checkedToppings.length) {
      toppingsList.append(itemReset);
    } else {      
      itemReset.remove();
    }

    // Рендерим пиццы с выбранными топпингами
    renderPizzas(checkedToppings);
  });

  // Добавляем обработчик события клика по кнопке сброса
  btnReset.addEventListener('click', () => {
    toppingsForm.reset();
    itemReset.remove();
    // Рендерим пиццы без выбранных топпингов
    renderPizzas();
  });
};
