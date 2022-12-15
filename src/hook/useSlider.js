import { useEffect, useRef } from "react";

function useSlider(sliderContainerRef) {
  const isDragging = useRef(false);

  const prevPageX = useRef(null);
  const prevScrollLeft = useRef(null);
  const positionDiff = useRef(null);

  const handleDragStart = (e) => {
    isDragging.current = true;
    prevPageX.current = e.pageX || e.touches[0].pageX;
    prevScrollLeft.current = sliderContainerRef.current.scrollLeft;
  };

  const handleDragging = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    sliderContainerRef.current.classList.add("dragging");

    positionDiff.current = (e.pageX || e.touches[0].pageX) - prevPageX.current;
    sliderContainerRef.current.scrollLeft =
      prevScrollLeft.current - positionDiff.current;
  };

  const handleDragStop = () => {
    isDragging.current = false;
    sliderContainerRef.current.classList.remove("dragging");
  };

  useEffect(() => {
    const element = sliderContainerRef.current;

    if (element) {
      element.addEventListener("mousedown", handleDragStart);
      element.addEventListener("mousemove", handleDragging);
      element.addEventListener("mouseup", handleDragStop);
      element.addEventListener("mouseleave", handleDragStop);

      element.addEventListener("touchstart", handleDragStart);
      element.addEventListener("touchmove", handleDragging);
      element.addEventListener("touchend", handleDragStop);
    }

    return () => {
      element.removeEventListener("mousedown", handleDragStart);
      element.removeEventListener("mousemove", handleDragging);
      element.removeEventListener("mouseup", handleDragStop);
      element.removeEventListener("mouseleave", handleDragStop);

      element.removeEventListener("touchstart", handleDragStart);
      element.removeEventListener("touchmove", handleDragging);
      element.removeEventListener("touchend", handleDragStop);
    };
  }, []);

  return null;
}

export default useSlider;

// 1. sliderContainer에 ref 달아주기
// 2. sliderContainer CSS 속성
// overflow: hidden;
// 버튼으로 이동 시 smooth, 드래그 시 auto
// scroll-behavior: smooth;
// &.dragging {scroll-behavior: auto;}
// 슬라이더 이동 시 글자 드래그 방지
// &.dragging ${하위항목} {pointer-events: none;}
