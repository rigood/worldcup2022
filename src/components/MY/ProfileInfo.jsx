import { useState } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TitleContainer from "../Common/TitleContainer";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import Button from "./../Common/Button";
import ProfileInput from "./ProfileInput";

function ProfileInfo() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

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
        <ProfileInput
          type="text"
          name="nickname"
          label="닉네임"
          pattern="^[가-힣a-zA-Z0-9]{2,10}$"
          placeholder="닉네임을 입력해주세요."
          value={values["nickname"]}
          onChange={handleChange}
          errorMsg="닉네임은 특수문자 제외 2~10자리로 입력해주세요."
          required={true}
        />
        <ProfileInput
          type="email"
          name="email"
          label="이메일"
          placeholder="이메일을 입력해주세요."
          value={values["email"]}
          onChange={handleChange}
          errorMsg="이메일 주소가 유효하지 않습니다."
          required={true}
        />
        <ProfileInput
          type="date"
          name="birthday"
          label="생일"
          placeholder="생일을 입력해주세요."
          value={values["birthday"]}
          onChange={handleChange}
          errorMsg=""
          required={false}
        />
        <ProfileInput
          type="password"
          name="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          value={values["password"]}
          pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
          onChange={handleChange}
          errorMsg="비밀번호는 영문·숫자·특수문자 포함 8~20자리로 입력해주세요."
          required={true}
        />
        <ProfileInput
          type="password"
          name="confirmPassword"
          label="비밀번호 확인"
          placeholder="비밀번호를 한번 더 입력해주세요."
          value={values["confirmPassword"]}
          pattern={values["password"]}
          onChange={handleChange}
          errorMsg="비밀번호가 일치하지 않습니다."
          required={true}
        />

        <ButtonWrapper>
          <Button type="submit" label="제출" />
        </ButtonWrapper>
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

const ButtonWrapper = styled.div`
  text-align: center;
  margin: 10px 0;
`;
