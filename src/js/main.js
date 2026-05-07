import marquee from 'vanilla-marquee';

const marqueeItems = document.getElementsByClassName('marquee');

if (marqueeItems.length > 0) {
  for (let i = 0; i < marqueeItems.length; i++) {
    new marquee(marqueeItems[i], {
      speed: 100,
      duplicated: true,
      pauseOnHover: true,
      startVisible: true,
      recalcResize: true,
      gap: 30,
    });
  }
}

// More section slider
const moreSlider = {
  grid: null,
  items: [],
  pagination: null,
  prevBtn: null,
  nextBtn: null,
  dots: [],
  currentIndex: 0,
  totalSlides: 0,
  breakpoint: null,
  isEnabled: false,

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

    // Создаем временный контейнер для измерения
    const tempContainer = document.createElement('div');
    tempContainer.style.cssText = `
      position: absolute;
      visibility: hidden;
      top: -9999px;
      left: -9999px;
      width: ${this.grid.offsetWidth}px;
    `;
    
    // Копируем каждый элемент для измерения
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
    
    // Измеряем высоту каждого клона
    const clones = tempContainer.children;
    for (let i = 0; i < clones.length; i++) {
      const height = clones[i].offsetHeight;
      if (height > maxHeight) {
        maxHeight = height;
      }
    }
    
    // Удаляем временный контейнер
    document.body.removeChild(tempContainer);
    
    return maxHeight;
  },

  enable() {
    this.isEnabled = true;
    this.pagination.classList.add('more__grid-pagination--active');
    this.grid.classList.add('more__grid--slider');

    // Устанавливаем высоту контейнера
    const maxHeight = this.calculateMaxHeight();
    this.grid.style.height = maxHeight + 'px';

    this.goToSlide(0);
    this.updateNavigationButtons();
  },

  disable() {
    this.isEnabled = false;
    this.pagination.classList.remove('more__grid-pagination--active');
    this.grid.classList.remove('more__grid--slider');

    // Убираем высоту контейнера
    this.grid.style.removeProperty('height');

    this.items.forEach((item) => {
      item.style.removeProperty('opacity');
      item.style.removeProperty('visibility');
    });
  },

  updateNavigationButtons() {
    // Обновляем состояние кнопки "назад"
    if (this.currentIndex === 0) {
      this.prevBtn.classList.add('button--disabled');
      this.prevBtn.disabled = true;
    } else {
      this.prevBtn.classList.remove('button--disabled');
      this.prevBtn.disabled = false;
    }

    // Обновляем состояние кнопки "вперед"
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

moreSlider.init(1366);

// Members carousel
const membersCarousel = {
  container: null,
  slides: [],
  prevBtn: null,
  nextBtn: null,
  countElement: null,
  totalElement: null,
  currentIndex: 0,
  totalSlides: 0,
  slidesPerView: 3,
  mobileBreakpoint: 568,
  autoplayInterval: null,
  isEnabled: true,

  init() {
    this.container = document.querySelector('.members__slider');
    this.prevBtn = document.querySelector('.members__pagination .button--navigation:first-of-type');
    this.nextBtn = document.querySelector('.members__pagination .button--navigation:last-of-type');
    this.countElement = document.querySelector('.members__pagination-count');
    this.totalElement = document.querySelector('.members__pagination-total');

    if (!this.container || !this.prevBtn || !this.nextBtn) return;

    this.slides = Array.from(this.container.querySelectorAll('.members__slide'));
    this.totalSlides = this.slides.length;

    if (this.totalSlides === 0) return;

    this.checkBreakpoint();
    this.updateCounter();
    this.updateSlides();
    this.startAutoplay();

    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());

    // Остановка автоплея при наведении
    this.container.addEventListener('mouseenter', () => this.stopAutoplay());
    this.container.addEventListener('mouseleave', () => this.startAutoplay());
    
    // Отслеживание изменения размера окна
    window.addEventListener('resize', () => {
      this.checkBreakpoint();
      this.updateSlides();
      this.updateCounter();
    });
  },

  checkBreakpoint() {
    this.slidesPerView = window.innerWidth <= this.mobileBreakpoint ? 1 : 3;
  },

  updateCounter() {
    let current, max;
    
    if (window.innerWidth <= this.mobileBreakpoint) {
      // На мобильных показываем текущий участника
      current = this.currentIndex + 1;
      max = this.totalSlides;
    } else {
      // На десктопе показываем последний участник в группе
      const groupIndex = Math.floor(this.currentIndex / this.slidesPerView);
      const startSlide = groupIndex * this.slidesPerView + 1;
      const endSlide = Math.min(startSlide + this.slidesPerView - 1, this.totalSlides);
      current = endSlide;
      max = this.totalSlides;
    }
    
    if (this.countElement) {
      this.countElement.textContent = current;
    }
    if (this.totalElement) {
      this.totalElement.textContent = `/ ${max}`;
    }
  },

  updateSlides() {
    this.slides.forEach((slide, index) => {
      let isVisible;
      
      if (window.innerWidth <= this.mobileBreakpoint) {
        // На мобильных показываем только один слайд
        isVisible = index === this.currentIndex;
      } else {
        // На десктопе показываем группу из 3 слайдов
        const groupIndex = Math.floor(this.currentIndex / this.slidesPerView);
        const groupStart = groupIndex * this.slidesPerView;
        const groupEnd = groupStart + this.slidesPerView;
        isVisible = index >= groupStart && index < groupEnd;
      }
      
      slide.style.display = isVisible ? 'flex' : 'none';
    });
  },

  next() {
    if (window.innerWidth <= this.mobileBreakpoint) {
      // На мобильных листаем по одному слайду
      this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    } else {
      // На десктопе листаем группами по 3 слайда
      this.currentIndex = (this.currentIndex + this.slidesPerView) % this.totalSlides;
    }
    this.updateSlides();
    this.updateCounter();
    this.restartAutoplay();
  },

  prev() {
    if (window.innerWidth <= this.mobileBreakpoint) {
      // На мобильных листаем по одному слайду
      this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    } else {
      // На десктопе листаем группами по 3 слайда
      this.currentIndex = (this.currentIndex - this.slidesPerView + this.totalSlides) % this.totalSlides;
    }
    this.updateSlides();
    this.updateCounter();
    this.restartAutoplay();
  },

  startAutoplay() {
    this.stopAutoplay();
    this.autoplayInterval = setInterval(() => {
      this.next();
    }, 4000);
  },

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  },

  restartAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  },
};

membersCarousel.init();
