import Marquee from 'vanilla-marquee';

type TMarqueeOptions = {
  speed: number;
  duplicated: boolean;
  pauseOnHover: boolean;
  startVisible: boolean;
  recalcResize: boolean;
  gap: number;
};

/**
 * Инициализация бегущей строки
 */
export default function initMarquee(): Marquee[] | null {
  const marqueeItems = document.getElementsByClassName('marquee');

  if (marqueeItems.length > 0) {
    const instances: Marquee[] = [];
    for (let i = 0; i < marqueeItems.length; i += 1) {
      const options: TMarqueeOptions = {
        speed: 100,
        duplicated: true,
        pauseOnHover: true,
        startVisible: true,
        recalcResize: true,
        gap: 30,
      };
      const marqueeInstance = new Marquee(marqueeItems[i] as HTMLElement, options);
      instances.push(marqueeInstance);
    }
    return instances;
  }
  return null;
}
