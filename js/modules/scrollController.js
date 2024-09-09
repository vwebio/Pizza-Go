export const scrollController = {

    scrollPosition: 0,
  
    // Метод для отключения прокрутки
    disabledScroll() {
      // Сохраняем текущую позицию прокрутки
      scrollController.scrollPosition = window.scrollY;
      // Устанавливаем стили для body, чтобы отключить прокрутку
      document.body.style.cssText = `
        overflow: hidden;
        position: fixed;
        top: -${scrollController.scrollPosition}px;
        left: 0;
        height: 100vh;
        width: 100vw;
        padding-right: ${window.innerWidth - document.body.offsetWidth}px
      `;
      // Отменяем поведение прокрутки для documentElement
      document.documentElement.style.scrollBehavior = 'unset';
    },
  
    // Метод для включения прокрутки
    enabledScroll() {
      // Сбрасываем стили для body, чтобы включить прокрутку
      document.body.style.cssText = '';
      // Возвращаем прокрутку на сохраненную позицию
      window.scroll({top: scrollController.scrollPosition});
      document.documentElement.style.scrollBehavior = '';
    },
  };
  