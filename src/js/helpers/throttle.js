/**
 * Calls `fn` with the given `args` after `delay` ms, but no more often than every `delay` ms.
 * If `fn` is called multiple times in a row, it will be called once after `delay` ms.
 * @param {function} fn The function to call, with the given `args` as arguments.
 * @param {number} delay The time to wait before calling `fn`.
 * @returns {function} A function that calls `fn` with the given `args` after `delay` ms.
 */
const throttle = (fn, delay) => {
  let timer = null;
  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => {
        fn(...args);
        timer = null;
      }, delay);
    }
  };
};

export default throttle;
