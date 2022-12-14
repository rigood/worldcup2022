## ๐  ํธ๋ฌ๋ธ ์ํ

### (๋ฌธ์ ) ๋ฐฐํฌ ํ๊ฒฝ์์ News API ํธ์ถ ์ CORS ์๋ฌ ๋ฐ์

### (์์ธ) News API ๋ฌด๋ฃ ๋ฒ์ ผ์ localhost์์๋ง ์ฌ์ฉ ๊ฐ๋ฅ

<br>

- News API๋ Developer, Business, Advanced ๋ผ๋ 3๊ฐ์ง ์ํ์ ์ ๊ณตํ๋ฉฐ,  
  Developer๋ ๋ฌด๋ฃ, ๋๋จธ์ง๋ ์ ๋ฃ์๋๋ค.

- ๋ฌด๋ฃ ๋ฒ์ ์์ ์ด์ฉํ  ์ ์๋ ์๋น์ค๋ ์๋์ ๊ฐ์ต๋๋ค.

  - Search all articles and get live top headlines
  - New articles available with 1 hour delay
  - Search articles up to a month old
  - `CORS enabled for localhost`

- ๋ฌด๋ฃ ๋ฒ์ ์ด๋ฏ๋ก API ์์ฒญ์ ์ ํ์ด ์์ต๋๋ค.
  - `100 requests per day`
  - No extra requests available
  - No uptime SLA

<br>

### (๋์ฑ) ๋ก์ปฌ ํ๊ฒฝ์์๋ง News ํญ์ ์ฌ์ฉ, ๋ฐฐํฌ ํ๊ฒฝ์์๋ ์ ์ธํ๊ธฐ๋ก ๊ฒฐ์ 

<br>

- ์ฌ์ฉ์ ์ ์ ํ๊ฒฝ์ด localhost์ธ์ง ์ฒดํฌํฉ๋๋ค.

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

- ํด๋น ํญ ์จ๊น ์ฌ๋ถ๋ฅผ styled-component์๊ฒ props๋ก ์ ๋ฌํฉ๋๋ค.

- tab ์ด๋ฆ์ด News์ด๊ณ , localhost๊ฐ ์๋ ๊ฒฝ์ฐ(=๋ฐฐํฌ ํ๊ฒฝ) true ๊ฐ์,  
  ์๋ ๊ฒฝ์ฐ false ๊ฐ์ ์ ๋ฌํฉ๋๋ค.

- hide props๊ฐ true์ธ ๊ฒฝ์ฐ display: none ์์ฑ์ ์ฃผ์ด ํ๋ฉด์ ํ์ํ์ง ์์ต๋๋ค.

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
