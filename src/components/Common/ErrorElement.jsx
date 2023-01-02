import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb } from "@fortawesome/free-solid-svg-icons";

function ErrorElement({ msg }) {
  return (
    <Wrapper>
      <FontAwesomeIcon icon={faBomb} />
      <div className="msg">
        <h2>Error</h2>
        <p>{msg || "에러가 발생했습니다."}</p>
      </div>
    </Wrapper>
  );
}

export default ErrorElement;

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
