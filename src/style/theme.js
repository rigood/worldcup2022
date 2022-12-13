const color = {
  primary: "#8d1b3d",
  lightprimary: "#f8f0f2",
  lightwhite: "rgba(255, 255, 255, 0.5)",
  gray: "#9A9EA1",
  lightgray: "#eee",
  yellow: "#FEC310",
  skyblue: "#49BCE3",
  blue: "#1077C3",
};

const shadow = {
  boxShadow: `rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;`,
  boxShadow2: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;`,
  boxShadow3: `rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset`,
};

const maxlines = (maxLines, lineHeight) => {
  return `
  --max-lines: ${maxLines};
  display: -webkit-box;
  -webkit-line-clamp: var(--max-lines);
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: ${lineHeight} ? ${lineHeight} : normal;
  `;
};

const theme = {
  color,
  shadow,
  maxlines,
};

export default theme;
