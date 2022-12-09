## 🛠 트러블 슈팅

### (문제) 배포 환경에서 News API 호출 시 CORS 에러 발생

### (원인) News API 무료 버젼은 localhost에서만 사용 가능

<br>

- News API는 Developer, Business, Advanced 라는 3가지 상품을 제공하며,  
  Developer는 무료, 나머지는 유료입니다.

- 무료 버전에서 이용할 수 있는 서비스는 아래와 같습니다.

  - Search all articles and get live top headlines
  - New articles available with 1 hour delay
  - Search articles up to a month old
  - `CORS enabled for localhost`

- 무료 버전이므로 API 요청에 제한이 있습니다.
  - `100 requests per day`
  - No extra requests available
  - No uptime SLA

<br>

### (대책) 로컬 환경에서만 News 탭을 사용, 배포 환경에서는 제외하기로 결정

<br>

- 사용자 접속 환경이 localhost인지 체크합니다.

  ```javascript
  export function checkLocalhost() {
    if (
      window.location.hostname === "localhost" ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === "[::1]" ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    )
      return true;
  }
  ```

<br>

- 해당 탭 숨김 여부를 styled-component에게 props로 전달합니다.

- tab 이름이 News이고, localhost가 아닌 경우(=배포 환경) true 값을,  
  아닌 경우 false 값을 전달합니다.

- hide props가 true인 경우 display: none 속성을 주어 화면에 표시하지 않습니다.

  ```javascript
  // Tab.jsx
  {
    TAB_ITEMS.map((tab, index) => {
      return (
        <TabItem
          key={index}
          className={tabIndex === index && "active"}
          onClick={() => handleTabClick(index)}
          hide={tab === "News" && !isLocalhost ? true : false}
        >
          {tab}
        </TabItem>
      );
    });
  }

  const TabItem = styled.li`
    display: ${({ hide }) => (hide ? "none" : "flex")};
  `;
  ```
