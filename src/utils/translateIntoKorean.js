export function translateIntoKorean(collection) {
  switch (collection) {
    case "blog":
      return "블로그";
      break;
    case "cafe":
      return "카페";
      break;
    case "news":
      return "뉴스";
      break;
    case "etc":
      return "기타";
      break;
    default:
      return "기타";
      break;
  }
}
