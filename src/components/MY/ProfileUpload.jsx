import { useState, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useLocalStorage from "../../hook/useLocalStorage";
import TitleContainer from "../Common/TitleContainer";
import Button from "../Common/Button";
import { faUser, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

function ProfileUpload() {
  const [active, setActive] = useState(false);
  const [imgUrl, setImgUrl] = useLocalStorage("imgUrl", "");

  const inputRef = useRef(null);

  let file;

  const createFile = (file) => {
    let fileType = file.type;

    let validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

    if (validExtensions.includes(fileType)) {
      let fileReader = new FileReader();

      fileReader.onload = () => {
        let fileURL = fileReader.result;
        setImgUrl(fileURL);
        setActive(false);
      };

      fileReader.readAsDataURL(file);
    } else {
      alert("이미지 파일만 올릴 수 있습니다. (jpeg, jpg, png, gif 등)");
      setActive(false);
    }
  };

  const handleInput = (e) => {
    e.preventDefault();
    file = e.target.files[0];
    createFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    file = e.dataTransfer.files[0];
    createFile(file);
  };

  return (
    <>
      <TitleContainer>
        <FontAwesomeIcon icon={faUser} />
        <h2>프로필 업로드</h2>
      </TitleContainer>

      <ProfileUploadWrapper>
        <UploadContainer
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current.click()}
          className={active ? "active" : null}
        >
          {imgUrl ? (
            <img src={imgUrl} alt="프로필 사진" />
          ) : (
            <div>
              <div className="upload-icon">
                <FontAwesomeIcon icon={faCloudArrowUp} />
              </div>
              <div className="upload-text">Drag & Drop</div>
            </div>
          )}
          <input type="file" hidden ref={inputRef} onChange={handleInput} />
        </UploadContainer>
        <ButtonContainer>
          <Button
            onClick={() => inputRef.current.click()}
            label="사진 올리기"
          />
          <Button onClick={() => setImgUrl(false)} label="사진 초기화" />
        </ButtonContainer>
      </ProfileUploadWrapper>
    </>
  );
}

export default ProfileUpload;

const ProfileUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  margin: 30px 0;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow2};
  color: ${({ theme }) => theme.color.primary};
  cursor: pointer;
  &.active {
    opacity: 0.5;
  }
  .upload-icon {
    text-align: center;
    font-size: 48px;
    margin-bottom: 15px;
  }
  .upload-text {
    text-align: center;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  column-gap: 20px;
`;
