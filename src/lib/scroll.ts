type ScrollOptions = {
  offset?: number;
  updateHash?: boolean;
  forceSmooth?: boolean;
};

const prefersReducedMotion = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const scrollToElement = (
  element: Element,
  { offset = 0, updateHash = false, forceSmooth = false }: ScrollOptions = {},
) => {
  const targetTop =
    element.getBoundingClientRect().top + window.scrollY - offset;
  const scrollingElement =
    document.scrollingElement || document.documentElement;
  scrollingElement.scrollTo({
    top: Math.max(0, targetTop),
    behavior: prefersReducedMotion() && !forceSmooth ? "auto" : "smooth",
  });

  if (updateHash && element instanceof HTMLElement && element.id) {
    const nextHash = `#${element.id}`;
    if (window.location.hash !== nextHash) {
      history.pushState(null, "", nextHash);
    }
  }
};

export const scrollToHash = (
  hash: string,
  options: ScrollOptions = {},
): boolean => {
  if (!hash.startsWith("#")) return false;
  const element = document.querySelector(hash);
  if (!element) return false;
  scrollToElement(element, options);
  return true;
};
