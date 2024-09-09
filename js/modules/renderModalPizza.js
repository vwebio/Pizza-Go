import { cartControl } from './cartControl.js';
import { createLabel, createRadioInput, toUpperCaseFirstLetter } from './helper.js';

// Функция для рендеринга модального окна пиццы
export const renderModalPizza = ({id, images, name, price, toppings}) => {
  const modalPizzaMain = document.querySelector('.modal-pizza__main');
  modalPizzaMain.textContent = '';

  // По умолчанию устанавливаем размер пиццы как первый ключ объекта price
  let size = Object.keys(price)[0];

  // Создаем элемент picture для изображения пиццы
  const picture = document.createElement('picture');
  const source = document.createElement('source');
  source.srcset = images[1];
  source.type = 'image/webp';

  // Создаем элемент img для изображения пиццы
  const img = document.createElement('img');
  img.classList.add('modal-pizza__img');
  img.src = images[0];
  img.alt = name.ru;
  img.width = '180';
  img.height = '180';

  // Добавляем source и img в picture
  picture.append(source, img);

  // Создаем заголовок пиццы
  const title = document.createElement('h2');
  title.classList.add('modal-pizza__title');
  title.textContent = toUpperCaseFirstLetter(name.ru);

  // Создаем элемент для описания топпингов пиццы
  const pizzaToppings = document.createElement('p');
  pizzaToppings.classList.add('modal-pizza__toppings');
  pizzaToppings.textContent = toUpperCaseFirstLetter(toppings.ru);

  // Создаем элемент для отображения информации о цене и размере пиццы
  const info = document.createElement('p');
  info.classList.add('modal-pizza__info');

  // Создаем элемент для отображения цены пиццы
  const pizzaPrice = document.createElement('span');
  pizzaPrice.classList.add('modal-pizza__price');
  const separator = document.createElement('span');
  separator.textContent = '/';
  const pizzaSize = document.createElement('span');
  pizzaSize.classList.add('modal-pizza__size');

  // Добавляем элементы цены и размера в информационный элемент
  info.append(pizzaPrice, separator, pizzaSize);

  // Функция для обновления цены и размера пиццы
  const updatePrice = () => {
    const checkedSizeInput = form.querySelector('input[name="size"]:checked');
    size = checkedSizeInput.value;
    pizzaPrice.textContent = `${price[size]} ₽`
    pizzaSize.textContent = `${parseInt(size)} см`
  };

  // Создаем форму для выбора параметров пиццы
  const form = document.createElement('form');
  form.classList.add('modal-pizza__form');
  form.id = id;

  // Создаем fieldset для выбора типа теста
  const crustFieldset = document.createElement('fieldset');
  crustFieldset.classList.add('modal-pizza__fieldset');

  // Создаем радио-кнопки для выбора типа теста
  const thickInput = createRadioInput('modal-pizza__radio', 'thick', 'crust', 'thick');
  const thickLabel = createLabel('modal-pizza__label', 'thick', 'Пышное тесто');

  const thinInput = createRadioInput('modal-pizza__radio', 'thin', 'crust', 'thin');
  const thinLabel = createLabel('modal-pizza__label', 'thin', 'Тонкое тесто');
  thinInput.checked = true;

  // Добавляем радио-кнопки и метки в fieldset
  crustFieldset.append(thickInput, thickLabel, thinInput, thinLabel);

  // Создаем fieldset для выбора размера пиццы
  const sizeFieldset = document.createElement('fieldset');
  sizeFieldset.classList.add('modal-pizza__fieldset');

  // Создаем радио-кнопки для выбора размера пиццы
  const sizeInputs = Object.keys(price).map(size => createRadioInput('modal-pizza__radio', size, 'size', size));
  sizeInputs[0].checked = true;

  // Добавляем радио-кнопки и метки в fieldset и назначаем обработчики событий
  sizeInputs.forEach(input => {
    const label = createLabel('modal-pizza__label', input.id, `${parseInt(input.value)} см`);
    input.addEventListener('change', updatePrice);
    sizeFieldset.append(input, label);
  });

  // Создаем кнопку для добавления пиццы в корзину
  const addToCartBtn = document.createElement('button');
  addToCartBtn.classList.add('modal-pizza__add-cart');
  addToCartBtn.textContent = 'В корзину';

  // Добавляем fieldset и кнопку в форму
  form.append(crustFieldset, sizeFieldset, addToCartBtn);

  // Создаем кнопку для закрытия модального окна
  const closeBtn = document.createElement('button');
  closeBtn.classList.add('modal__close');
  closeBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14.8333" y="4" width="0.851136" height="15.3204" transform="rotate(45 14.8333 4)" fill="currentColor"/>
      <rect x="4" y="4.60184" width="0.851136" height="15.3204" transform="rotate(-45 4 4.60184)" fill="currentColor"/>
    </svg>
  `;

  // Добавляем все элементы в основной элемент модального окна
  modalPizzaMain.append(picture, title, pizzaToppings, info, form, closeBtn);

  // Обновляем цену и размер пиццы при первом рендеринге
  updatePrice();

  let timerId = NaN;
  // Обработчик события отправки формы
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Создаем объект FormData из формы
    const formData = new FormData(form);
    const product = {
      cartId: crypto.randomUUID(),
      id,
      crust: formData.get('crust'),
      size: formData.get('size'),
    }

    // Добавляем продукт в корзину
    cartControl.addCart(product);

    // Отключаем кнопку и изменяем её текст
    addToCartBtn.disabled = true;
    addToCartBtn.textContent = 'Добавлено';

    // Устанавливаем таймер для возврата кнопки в исходное состояние
    timerId = setTimeout(() => {
      addToCartBtn.disabled = false;
      addToCartBtn.textContent = 'В корзину';
    }, 3000);
  });

  // Обработчик события изменения формы
  form.addEventListener('change', () => {
    clearTimeout(timerId);
    addToCartBtn.disabled = false;
    addToCartBtn.textContent = 'В корзину';
  });
};
