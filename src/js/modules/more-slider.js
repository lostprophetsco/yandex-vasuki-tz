/**
 * Слайдер секции More
 */
export const moreSlider = {
  grid: null,
  items: [],
  pagination: null,
  prevBtn: null,
  nextBtn: null,
  dots: [],
  dotsContainer: null,
  currentIndex: 0,
  totalSlides: 0,
  breakpoint: null,
  isEnabled: false,

  /**
   * Инициализация слайдера
   * @param {number} breakpoint - Брейкпоинт для адаптивности
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

  createDots() {
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'button--pagination';
      dot.dataset.slide = i;
      if (i === 0) dot.classList.add('button--pagination-active');
      this.dots.push(dot);
      this.dotsContainer.appendChild(dot);
    }

    this.items.forEach((item, i) => {
      item.style.opacity = i === 0 ? '1' : '0';
      item.style.visibility = i === 0 ? 'visible' : 'hidden';
    });

    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
  },

  checkBreakpoint() {
    const isDesktop = window.innerWidth >= this.breakpoint;

    if (isDesktop) {
      this.disable();
    } else {
      this.enable();
    }
  },

  calculateMaxHeight() {
    let maxHeight = 0;

    const tempContainer = document.createElement('div');
    tempContainer.style.cssText = `
      position: absolute;
      visibility: hidden;
      top: -9999px;
      left: -9999px;
      width: ${this.grid.offsetWidth}px;
    `;

    this.items.forEach((item) => {
      const clone = item.cloneNode(true);
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
    for (let i = 0; i < clones.length; i++) {
      const height = clones[i].offsetHeight;
      if (height > maxHeight) {
        maxHeight = height;
      }
    }

    document.body.removeChild(tempContainer);

    return maxHeight;
  },

  enable() {
    this.isEnabled = true;
    this.pagination.classList.add('more__grid-pagination--active');
    this.grid.classList.add('more__grid--slider');

    const maxHeight = this.calculateMaxHeight();
    this.grid.style.height = maxHeight + 'px';

    this.goToSlide(0);
    this.updateNavigationButtons();
  },

  disable() {
    this.isEnabled = false;
    this.pagination.classList.remove('more__grid-pagination--active');
    this.grid.classList.remove('more__grid--slider');

    this.grid.style.removeProperty('height');

    this.items.forEach((item) => {
      item.style.removeProperty('opacity');
      item.style.removeProperty('visibility');
    });
  },

  updateNavigationButtons() {
    if (this.currentIndex === 0) {
      this.prevBtn.classList.add('button--disabled');
      this.prevBtn.disabled = true;
    } else {
      this.prevBtn.classList.remove('button--disabled');
      this.prevBtn.disabled = false;
    }

    if (this.currentIndex === this.totalSlides - 1) {
      this.nextBtn.classList.add('button--disabled');
      this.nextBtn.disabled = true;
    } else {
      this.nextBtn.classList.remove('button--disabled');
      this.nextBtn.disabled = false;
    }
  },

  goToSlide(index) {
    if (index < 0 || index >= this.totalSlides) return;

    this.items.forEach((item, i) => {
      item.style.opacity = i === index ? '1' : '0';
      item.style.visibility = i === index ? 'visible' : 'hidden';
    });

    this.dots.forEach((dot, i) => {
      dot.classList.toggle('button--pagination-active', i === index);
    });

    this.currentIndex = index;
    this.updateNavigationButtons();
  },

  next() {
    this.goToSlide(this.currentIndex + 1);
  },

  prev() {
    this.goToSlide(this.currentIndex - 1);
  },
};
