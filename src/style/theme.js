const color = {
  primary: "#8d1b3d",
  lightprimary: "#f8f0f2",
  lightwhite: "rgba(255, 255, 255, 0.5)",
  gray: "#9A9EA1",
  yellow: "#FEC310",
  skyblue: "#49BCE3",
  blue: "#1077C3",
};

const shadow = {
  boxShadow: `rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;`,
  boxShadow2: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;`,
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
