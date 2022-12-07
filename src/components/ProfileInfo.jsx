import styled from "styled-components";
import color from "../style/color";

function ProfileInfo() {
  return (
    <Wrapper>
      <FormContainer>
        <label for="name">이름</label>
        <input type="text" id="name" name="name" />

        <label for="email">이메일</label>
        <input type="email" id="email" name="email" />

        <label for="phone">휴대폰 번호</label>
        <input type="text" id="phone" name="phone" />

        <label for="msg">하고 싶은 말</label>
        <input type="text" id="msg" name="msg" />

        <button type="submit">제출</button>
      </FormContainer>
    </Wrapper>
  );
}

export default ProfileInfo;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 5px;
  }
  input {
    margin-bottom: 20px;
  }
`;
