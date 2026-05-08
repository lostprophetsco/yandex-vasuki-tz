import { initMarquee } from './modules/marquee.js';
import { moreSlider } from './modules/more-slider.js';
import { membersCarousel } from './modules/members-carousel.js';

// Инициализация всех модулей
initMarquee();
moreSlider.init(1366);
membersCarousel.init();
