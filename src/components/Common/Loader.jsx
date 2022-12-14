import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function Loader({ msg }) {
  return (
    <Wrapper>
      <FontAwesomeIcon icon={faSpinner} spin />
      <div className="msg">
        <h2>Loading</h2>
        <p>{msg || "잠시만 기다려주세요."}</p>
      </div>
    </Wrapper>
  );
}

export default Loader;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0;
  svg {
    font-size: 48px;
    color: ${({ theme }) => theme.color.primary};
    margin-bottom: 20px;
  }
  .msg {
    font-family: "Pretendard";
    text-align: center;
    h2 {
      font-size: 20px;
      font-weight: bold;
      color: ${({ theme }) => theme.color.primary};
      margin-bottom: 10px;
    }
    p {
      font-size: 16px;
    }
  }
`;
