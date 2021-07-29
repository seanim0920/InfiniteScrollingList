import { useLayoutEffect, useState } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setWindowSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return windowSize;
};
