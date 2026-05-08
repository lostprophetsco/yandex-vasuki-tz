/**
 * Карусель участников
 */
export const membersCarousel = {
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

  /**
   * Инициализация карусели
   */
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

    this.container.addEventListener('mouseenter', () => this.stopAutoplay());
    this.container.addEventListener('mouseleave', () => this.startAutoplay());

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
      current = this.currentIndex + 1;
      max = this.totalSlides;
    } else {
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
        isVisible = index === this.currentIndex;
      } else {
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
      this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    } else {
      this.currentIndex = (this.currentIndex + this.slidesPerView) % this.totalSlides;
    }
    this.updateSlides();
    this.updateCounter();
    this.restartAutoplay();
  },

  prev() {
    if (window.innerWidth <= this.mobileBreakpoint) {
      this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    } else {
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
