import { useState, useRef } from "react";
import styled from "styled-components";
import color from "../style/color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import { ReactComponent as ProfileIcon } from "../svg/profile.svg";
import useLocalStorage from "../hook/useLocalStorage";

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
    <Wrapper>
      <TitleContainer>
        <ProfileIcon />
        <h1>프로필 사진 업로드</h1>
      </TitleContainer>
      <ProfileContainer>
        <UploadContainer
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current.click()}
          className={active ? "active" : null}
        >
          {imgUrl ? (
            <img src={imgUrl} />
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
      </ProfileContainer>
    </Wrapper>
  );
}

export default ProfileUpload;

const Wrapper = styled.div``;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  h1 {
    margin-left: 6px;
    font-size: 15px;
    color: ${color.primary};
  }
`;

const ProfileContainer = styled.div`
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
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  color: ${color.blue};
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
