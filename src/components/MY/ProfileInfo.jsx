import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useLocalStorage from "../../hook/useLocalStorage";
import TitleContainer from "../Common/TitleContainer";
import ProfileInput from "./ProfileInput";
import Button from "./../Common/Button";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";

function ProfileInfo() {
  const [isNew, setIsNew] = useState(true);
  const [profile, setProfile] = useLocalStorage("profile", {});
  const [values, setValues] = useState({
    name: "" || profile["name"],
    email: "" || profile["email"],
    birthday: "" || profile["birthday"],
    msg: "" || profile["msg"],
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(values);
    setIsNew(false);
  };

  return isNew ? (
    <>
      <TitleContainer>
        <FontAwesomeIcon icon={faAddressCard} />
        <h2>
          {Object.entries(profile).length === 0 ? "프로필 입력" : "프로필 수정"}
        </h2>
      </TitleContainer>

      <FormContainer onSubmit={handleSubmit}>
        <ProfileInput
          type="text"
          name="nickname"
          label="닉네임"
          pattern="^[가-힣a-zA-Z0-9]{2,10}$"
          placeholder="닉네임을 입력해주세요."
          value={values["nickname"] || profile["nickname"]}
          onChange={handleChange}
          errorMsg="닉네임은 특수문자 제외 2~10자리로 입력해주세요."
          required={true}
        />
        <ProfileInput
          type="email"
          name="email"
          label="이메일"
          placeholder="이메일을 입력해주세요."
          value={values["email"] || profile["email"]}
          onChange={handleChange}
          errorMsg="이메일 주소가 유효하지 않습니다."
          required={true}
        />
        <ProfileInput
          type="date"
          name="birthday"
          label="생일"
          placeholder="생일을 입력해주세요."
          value={values["birthday"] || profile["birthday"]}
          onChange={handleChange}
          errorMsg=""
          required={false}
        />
        <ProfileInput
          type="text"
          name="msg"
          label="자기소개"
          placeholder="간단한 자기소개를 입력해주세요."
          value={values["msg"] || profile["msg"]}
          errorMsg=""
          onChange={handleChange}
        />

        <ButtonWrapper>
          <Button
            type="submit"
            label={Object.entries(profile).length === 0 ? "입력" : "수정"}
          />
        </ButtonWrapper>
      </FormContainer>
    </>
  ) : (
    <CompleteMsg>
      <h1>프로필이 등록되었습니다.</h1>
    </CompleteMsg>
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

const CompleteMsg = styled.div``;
