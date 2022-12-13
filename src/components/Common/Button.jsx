import styled from "styled-components";

function Button({ type, label, onClick, fontSize, textColor, children }) {
  return (
    <Wrapper
      type={type}
      onClick={onClick}
      fontSize={fontSize}
      textColor={textColor}
    >
      <span>{label || children}</span>
    </Wrapper>
  );
}

export default Button;

const Wrapper = styled.button.attrs((props) => ({
  type: props.type,
}))`
  width: fit-content;
  padding: 10px 30px;
  font-size: ${({ fontSize }) => fontSize || "16px"};
  font-family: "GmarketSansMedium";
  color: ${({ textColor, theme }) =>
    textColor ? textColor : theme.color.primary};
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
  span {
    position: relative;
    bottom: -2px;
  }
`;
