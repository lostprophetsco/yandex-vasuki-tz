/**
 * Слайдер секции More
 * @class MoreSlider
 * @description Обеспечивает функциональность слайдера для секции More с адаптивностью и навигацией
 */
const moreSlider = {
  grid: null as HTMLElement | null,
  items: [] as HTMLElement[],
  pagination: null as HTMLElement | null,
  prevBtn: null as HTMLButtonElement | null,
  nextBtn: null as HTMLButtonElement | null,
  dots: [] as HTMLButtonElement[],
  dotsContainer: null as HTMLElement | null,
  currentIndex: 0,
  totalSlides: 0,
  breakpoint: null as number | null,
  isEnabled: false,

  /**
   * Инициализация слайдера
   * @param {number} [breakpoint=1280] - Брейкпоинт для адаптивности
   */
  init(breakpoint = 1280) {
    this.breakpoint = breakpoint;
    this.grid = document.querySelector('.more__grid');
    this.pagination = document.querySelector('.more__grid-pagination');

    if (!this.grid || !this.pagination) return;

    this.items = Array.from(this.grid.querySelectorAll('.more__grid-item'));
    this.prevBtn = this.pagination.querySelector('.button--navigation:first-of-type');
    this.nextBtn = this.pagination.querySelector('.button--navigation:last-of-type');
    this.dotsContainer = this.pagination.querySelector('.more__grid-pagination-list');

    this.totalSlides = this.items.length;

    if (this.totalSlides === 0) return;

    this.createDots();
    this.checkBreakpoint();
    window.addEventListener('resize', () => this.checkBreakpoint());
  },

  /**
   * Создание точек пагинации
   * @returns {void}
   */
  createDots() {
    for (let i = 0; i < this.totalSlides; i += 1) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'button--pagination';
      dot.dataset.slide = i.toString();
      if (i === 0) dot.classList.add('button--pagination-active');
      this.dots.push(dot);
      this.dotsContainer?.appendChild(dot);
    }

    this.items.forEach((item, i) => {
      const currentItem = item as HTMLElement;
      currentItem.style.opacity = i === 0 ? '1' : '0';
      currentItem.style.visibility = i === 0 ? 'visible' : 'hidden';
    });

    this.prevBtn?.addEventListener('click', () => this.prev());
    this.nextBtn?.addEventListener('click', () => this.next());
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
  },

  /**
   * Проверка брейкпоинта и включение/отключение слайдера
   * @returns {void}
   */
  checkBreakpoint() {
    if (!this.breakpoint) return;
    const isDesktop = window.innerWidth >= this.breakpoint;

    if (isDesktop) {
      this.disable();
    } else {
      this.enable();
    }
  },

  /**
   * Расчет максимальной высоты слайдов
   * @returns {number} Максимальная высота в пикселях
   */
  calculateMaxHeight() {
    let maxHeight = 0;

    if (!this.grid) return maxHeight;

    const tempContainer = document.createElement('div');
    tempContainer.style.cssText = `
      position: absolute;
      visibility: hidden;
      top: -9999px;
      left: -9999px;
      width: ${this.grid.offsetWidth}px;
    `;

    this.items.forEach((item) => {
      const clone = item.cloneNode(true) as HTMLElement;
      clone.style.cssText = `
        position: relative;
        opacity: 1;
        visibility: visible;
        width: 100%;
      `;
      tempContainer.appendChild(clone);
    });

    document.body.appendChild(tempContainer);

    const clones = tempContainer.children;
    for (let i = 0; i < clones.length; i += 1) {
      const height = (clones[i] as HTMLElement).offsetHeight;
      if (height > maxHeight) {
        maxHeight = height;
      }
    }

    document.body.removeChild(tempContainer);

    return maxHeight;
  },

  /**
   * Включение слайдера
   * @returns {void}
   */
  enable() {
    this.isEnabled = true;
    this.pagination?.classList.add('more__grid-pagination--active');
    this.grid?.classList.add('more__grid--slider');

    const maxHeight = this.calculateMaxHeight();
    this.grid!.style.height = `${maxHeight}px`;

    this.goToSlide(0);
    this.updateNavigationButtons();
  },

  /**
   * Отключение слайдера
   * @returns {void}
   */
  disable() {
    this.isEnabled = false;
    this.pagination?.classList.remove('more__grid-pagination--active');
    this.grid?.classList.remove('more__grid--slider');

    this.grid?.style.removeProperty('height');

    this.items.forEach((item) => {
      const currentItem = item as HTMLElement;
      currentItem.style.removeProperty('opacity');
      currentItem.style.removeProperty('visibility');
    });
  },

  /**
   * Обновление состояния кнопок навигации
   * @returns {void}
   */
  updateNavigationButtons() {
    if (this.currentIndex === 0) {
      this.prevBtn?.classList.add('button--disabled');
      this.prevBtn!.disabled = true;
    } else {
      this.prevBtn?.classList.remove('button--disabled');
      this.prevBtn!.disabled = false;
    }

    if (this.currentIndex === this.totalSlides - 1) {
      this.nextBtn?.classList.add('button--disabled');
      this.nextBtn!.disabled = true;
    } else {
      this.nextBtn?.classList.remove('button--disabled');
      this.nextBtn!.disabled = false;
    }
  },

  /**
   * Переход к указанному слайду
   * @param {number} index - Индекс слайда
   * @returns {void}
   */
  goToSlide(index: number) {
    if (index < 0 || index >= this.totalSlides) return;

    this.items.forEach((item, i) => {
      const currentItem = item as HTMLElement;
      currentItem.style.opacity = i === index ? '1' : '0';
      currentItem.style.visibility = i === index ? 'visible' : 'hidden';
    });

    this.dots.forEach((dot, i) => {
      dot.classList.toggle('button--pagination-active', i === index);
    });

    this.currentIndex = index;
    this.updateNavigationButtons();
  },

  /**
   * Переход к следующему слайду
   * @returns {void}
   */
  next() {
    this.goToSlide(this.currentIndex + 1);
  },

  /**
   * Переход к предыдущему слайду
   * @returns {void}
   */
  prev() {
    this.goToSlide(this.currentIndex - 1);
  },
};

export default moreSlider;
