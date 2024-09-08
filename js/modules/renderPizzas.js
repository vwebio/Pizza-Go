import { toUpperCaseFirstLetter } from "./helper.js";
import { renderToppings } from "./renderToppings.js";
import { getData } from "./serviceApi.js";

const btnReset = document.createElement('button');
btnReset.classList.add('pizza__reset-toppings');
btnReset.textContent = 'Сбросить фильтр';
btnReset.type = 'reset';
btnReset.setAttribute('form', 'toppings');

// Функция для создания карточки пиццы
const createCard = (data) => {
  const card = document.createElement('article');
  card.classList.add('pizza__card', 'card');
  card.insertAdjacentHTML('beforeend', `
    <picture>
      <source srcset="${data.images[1]}" type="image/webp">
      <img class="card__img" src="${data.images[0]}" alt="${data.name.ru}">            
    </picture>
    <div class="card__content">
      <h3 class="card__title">${toUpperCaseFirstLetter(data.name.ru)}</h3>
      <p class="card__info">
        <span class="card__price">${data.price['25cm']} ₽</span>
        <span>/</span>
        <span class="card__weight">25 см</span></p>
      <button class="card__btn btn" data-id="${data.id}">Выбрать</button>
    </div>
  `);

  return card;
};


// Функция для рендеринга списка пицц
export const renderPizzas = async (toppings) => {

  // Получаем данные о пиццах
  const pizzas = await getData(`products${toppings ? `?toppings=${toppings}` : ''}`);

  const pizzaTitle = document.querySelector('.pizza__title');
  const pizzaList = document.querySelector('.pizza__list');
  pizzaList.textContent = '';

  // Создаем массив элементов списка для каждой пиццы
  if (pizzas.length) {
    pizzaTitle.textContent = 'Пицца';
    btnReset.remove();
    const items = pizzas.map(data => {
      // Создаем элемент li для каждой пиццы
      const item = document.createElement('li');
      item.classList.add('pizza__item');
    
      // Создаем карточку пиццы и добавляем её в элемент li
      const card = createCard(data);
      item.append(card);
      return item;
    });
  
      // Вставляем все элементы списка в элемент с классом "pizza__list"
    pizzaList.append(...items);
    
  } else {
    pizzaTitle.textContent = 'Такой пиццы у нас нет :(';
    pizzaTitle.after(btnReset);
  }
};

// Кнопка сброса
btnReset.addEventListener('click', () => {
  document.querySelector('.toppings__reset').remove();
  renderPizzas();
  renderToppings();
});