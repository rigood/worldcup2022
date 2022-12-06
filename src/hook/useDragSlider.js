import { useEffect } from "react";

function useDragSlider(ref, slideWidth, index, setIndex) {
  let isDragging;

  const handleDragStart = () => {
    isDragging = true;
  };

  const handleDragging = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    ref.current.classList.add("dragging");
    ref.current.scrollLeft -= e.movementX;
  };

  const handleDragStop = () => {
    isDragging = false;
    ref.current.classList.remove("dragging");
  };

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener("mousedown", handleDragStart);
      element.addEventListener("mousemove", handleDragging);
      document.addEventListener("mouseup", handleDragStop);
      return () => {
        element.removeEventListener("mousedown", handleDragStart);
        element.removeEventListener("mousemove", handleDragging);
        document.removeEventListener("mouseup", handleDragStop);
      };
    }
    return () => {};
  }, [isDragging]);

  return isDragging;
}

export default useDragSlider;
