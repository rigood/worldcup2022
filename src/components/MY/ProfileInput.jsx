import { useState } from "react";
import styled from "styled-components";

function ProfileInput(props) {
  const { label, onChange, errorMsg, ...inputProps } = props;
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <Wrapper>
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      <span>{errorMsg}</span>
    </Wrapper>
  );
}

export default ProfileInput;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0;
  label {
    font-size: 15px;
    font-weight: bold;
    color: ${({ theme }) => theme.color.primary};
  }
  span {
    display: none;
    font-size: 12px;
    color: red;
  }
  input:invalid[focused="true"] ~ span {
    display: block;
  }
  input {
    padding: 10px;
    border-radius: 5px;
    border: none;
    outline: none;
    box-shadow: ${({ theme }) => theme.shadow.boxShadow};
    font-size: 15px;
    &::placeholder {
      font-size: 15px;
    }
  }
`;
