export function getLocalDateTime(LOCAL_TIME_DIFF) {
  const current = new Date();
  const utc = current.getTime() + current.getTimezoneOffset() * 60 * 1000;

  const timeDiff = LOCAL_TIME_DIFF * 60 * 60 * 1000;
  const localDateTime = new Date(utc + timeDiff);

  const date = localDateTime.toLocaleString("ko-KR", {
    dateStyle: "long",
  });
  const time = localDateTime.toLocaleString("ko-KR", {
    timeStyle: "medium",
  });

  return { date, time };
}
