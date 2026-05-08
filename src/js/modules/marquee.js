import Marquee from 'vanilla-marquee';

/**
 * Инициализация бегущей строки
 */
export default function initMarquee() {
  const marqueeItems = document.getElementsByClassName('marquee');

  if (marqueeItems.length > 0) {
    const instances = [];
    for (let i = 0; i < marqueeItems.length; i += 1) {
      const marqueeInstance = new Marquee(marqueeItems[i], {
        speed: 100,
        duplicated: true,
        pauseOnHover: true,
        startVisible: true,
        recalcResize: true,
        gap: 30,
      });
      instances.push(marqueeInstance);
    }
    return instances;
  }
  return null;
}
