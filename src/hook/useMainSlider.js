import { useEffect, useRef } from "react";

function useMainSlider(sliderRef, handlePrevClick, handleNextClick) {
  const startX = useRef(null);

  const handleStart = (e) => {
    startX.current = e.pageX || e.touches[0].pageX;
  };

  const handleStop = (e) => {
    const endX = e.pageX || e.changedTouches[0].pageX;
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
      element.addEventListener("touchstart", handleStart);
      element.addEventListener("touchend", handleStop);
      element.addEventListener("mousedown", handleStart);
      element.addEventListener("mouseup", handleStop);
    }

    return () => {
      element.removeEventListener("touchstart", handleStart);
      element.removeEventListener("touchend", handleStop);
      element.removeEventListener("mousedown", handleStart);
      element.removeEventListener("mouseup", handleStop);
    };
  }, []);

  return null;
}

export default useMainSlider;
