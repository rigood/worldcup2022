import styled from "styled-components";

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
  color: ${({ textColor, theme }) =>
    textColor ? textColor : theme.color.primary};
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
`;
