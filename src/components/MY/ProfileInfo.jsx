import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TitleContainer from "../Common/TitleContainer";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import Button from "./../Common/Button";

function ProfileInfo() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <TitleContainer>
        <FontAwesomeIcon icon={faAddressCard} />
        <h2>프로필 정보 입력</h2>
      </TitleContainer>

      <FormContainer onSubmit={handleSubmit}>
        <label htmlFor="name">이름</label>
        <input type="text" id="name" name="name" />

        <label htmlFor="email">이메일</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="phone">휴대폰 번호</label>
        <input type="text" id="phone" name="phone" />

        <label htmlFor="msg">하고 싶은 말</label>
        <input type="text" id="msg" name="msg" />

        <Button type="submit" label="제출" />
      </FormContainer>
    </>
  );
}

export default ProfileInfo;

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
