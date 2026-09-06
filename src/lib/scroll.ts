type ScrollOptions = {
  offset?: number;
  updateHash?: boolean;
  forceSmooth?: boolean;
  immediate?: boolean;
};

const prefersReducedMotion = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const scrollToElement = (
  element: Element,
  { offset = 0, updateHash = false, forceSmooth = false, immediate = false }: ScrollOptions = {},
) => {
  const targetId = element.id;
  const targetTop =
    element.getBoundingClientRect().top + window.scrollY - offset;
  const scrollingElement =
    document.scrollingElement || document.documentElement;
  if (immediate) {
    /* Never pass behavior: "instant" — browsers whose ScrollBehavior enum
       lacks it throw a TypeError and abort the scroll. Overriding the
       stylesheet's smooth scrolling with inline "auto" jumps instantly
       everywhere instead. */
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    scrollingElement.scrollTo({ top: Math.max(0, targetTop), behavior: "auto" });
    root.style.scrollBehavior = previous;
  } else {
    scrollingElement.scrollTo({
      top: Math.max(0, targetTop),
      behavior: prefersReducedMotion() && !forceSmooth ? "auto" : "smooth",
    });
  }

  if (updateHash && targetId) {
    const nextHash = `#${targetId}`;
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
  const element = document.getElementById(hash.slice(1));
  if (!element) return false;
  scrollToElement(element, options);
  return true;
};

/** Jump to the top of the page, ignoring CSS smooth scrolling. Safe on
    every browser — see the note on behavior: "instant" above. */
export const scrollToTopInstant = () => {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  root.style.scrollBehavior = previous;
};
