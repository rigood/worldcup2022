import styled from "styled-components";
import color from "../style/color";

function Button({ label, children, onClick, textColor }) {
  return (
    <Wrapper onClick={onClick} color={textColor}>
      {label || children}
    </Wrapper>
  );
}

export default Button;

const Wrapper = styled.button`
  margin-bottom: 20px;
  padding: 10px 30px;
  color: ${({ textColor }) => textColor || color.primary};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
