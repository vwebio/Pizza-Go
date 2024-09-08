export const toppingsToggle = () => {
    const toppingsButton = document.querySelector(".toppings__btn");
    const toppingsList = document.querySelector(".toppings__list");
  
    // Добавляем обработчик клика по кнопке выбора топпинга
    toppingsButton.addEventListener("click", () => {
      // Проверяем, открыт ли список
      if (!toppingsList.classList.contains("toppings__list_show")) {
        // Если список не открыт, открываем его
        toppingsList.classList.add("toppings__list_show");
        toppingsButton.classList.add("toppings__btn_active");
  
        // Устанавливаем высоту списка, чтобы он плавно открылся
        toppingsList.style.maxHeight = toppingsList.scrollHeight + "px";
      } else {
        // Если список открыт, закрываем его
        toppingsButton.classList.remove("toppings__btn_active");
        toppingsList.style.maxHeight = null;
  
        // Ждём завершения анимации и скрываем список
        setTimeout(() => {
          toppingsList.classList.remove("toppings__list_show");
        }, 300);
      }
    });
  };