export const cartControl = {
    // Получаем данные корзины из localStorage или создаем пустой массив
    cartData: JSON.parse(localStorage.getItem('cart') || '[]'),
  
    // Метод для добавления товара в корзину
    addCart(product) {
      this.cartData.push(product);
      // Сохраняем в localStorage
      localStorage.setItem('cart', JSON.stringify(this.cartData));
    },
  
    // Метод для удаления товара из корзины по его ID
    removeCart(id) {
      // Фильтруем массив данных корзины, удаляя товар с указанным ID
      this.cartData = this.cartData.filter(item => item.cartId !== id);
      // Сохраняем в localStorage
      localStorage.setItem('cart', JSON.stringify(this.cartData));
    },
  
    // Метод для очистки корзины
    clearCart() {
      this.cartData = [];
      // Сохраняем в localStorage
      localStorage.setItem('cart', JSON.stringify(this.cartData));
    }
  };
  