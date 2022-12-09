## 🛠 트러블 슈팅

- (문제) 카카오 API 호출 시 **401 에러** 발생

- (원인) 401 Unauthroized 에러는 **유효한 인증 자격이 없는 경우 발생**하는 응답 코드입니다.  
  API 키를 env 파일에 숨긴 이후 발생한 현상으로, **API 키를 숨기는 과정에서 잘못**된 부분이 있었던 것 같습니다.

- (해결) **env 파일을 src 폴더에서 루트 폴더로 옮기니** 정상적으로 API 키를 인식하였습니다.

<br>

> API 키 숨기는 방법

```javascript
// .env
REACT_APP_KAKAO_KEY = 123456789;

// usage
const BASE_URL = `https://dapi.kakao.com/v2/search/${section}`;
const API_KEY = process.env.REACT_APP_KAKAO_KEY;
```

- 루트 폴더에 .env 파일을 만들고 `REACT_APP_` 으로 시작하는 환경변수 선언 후 API 키 저장
- 환경변수를 사용할 때는 `process.env.REACT_APP_변수명` 입력
- .gitignore 파일에 .env 파일을 등록하여 깃허브에 업로드 되지 않도록 설정해야함
