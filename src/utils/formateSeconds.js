export function formatSeconds(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((num) => (num < 10 ? "0" + num : num))
    .filter((num, idx) => num !== "00" || idx > 0)
    .join(":");
}
