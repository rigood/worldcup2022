import { useEffect, useRef } from "react";

function useMainSlider(sliderRef, handlePrevClick, handleNextClick) {
  const startX = useRef(null);

  const handleDragStart = (e) => {
    startX.current = e.touches[0].pageX;
  };

  const handleDragStop = (e) => {
    const endX = e.changeTouches[0].pageX;
    const diff = endX - startX.current;

    if (diff > 0) {
      handlePrevClick();
    } else if (diff < 0) {
      handleNextClick();
    }
  };

  useEffect(() => {
    const element = sliderRef.current;

    if (element) {
      element.addEventListener("touchstart", handleDragStart);
      element.addEventListener("touchend", handleDragStop);
    }

    return () => {
      element.removeEventListener("touchstart", handleDragStart);
      element.removeEventListener("touchend", handleDragStop);
    };
  }, []);

  return null;
}

export default useMainSlider;
