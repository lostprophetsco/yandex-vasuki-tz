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
