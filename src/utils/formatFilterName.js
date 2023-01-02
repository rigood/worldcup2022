export function formatFilterName(filter) {
  if (filter === "all") {
    return "언론사 전체";
  } else {
    if (filter.length >= 10) {
      return filter.substr(0, 10) + "...";
    } else {
      return filter;
    }
  }
}
