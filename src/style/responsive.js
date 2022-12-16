import { css } from "styled-components";

export const desktop = (props) => {
  return css`
    @media only screen and (max-width: 1200px) {
      ${props}
    }
  `;
};

export const tablet = (props) => {
  return css`
    @media only screen and (max-width: 768px) {
      ${props}
    }
  `;
};

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 500px) {
      ${props}
    }
  `;
};

export const fold = (props) => {
  return css`
    @media only screen and (max-width: 300px) {
      ${props}
    }
  `;
};
