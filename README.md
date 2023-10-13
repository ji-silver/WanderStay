
<div align="center">

# WanderStay
 
![wanderstay](https://github.com/ji-silver/Blog/assets/59919953/b066b48e-00b1-45f4-83fa-8316c0239300)


### <a href="https://wanderstay.jisilver.shop/">🖥️ Website</a>
</div>


## 🗒️ 프로젝트 기획
**국내 여행 준비에 가장 중요한 호텔 및 숙박 예약 웹 서비스 WanderStay** <br />
원하는 날짜와 가격을 비교하여 숙소를 예약할 수 있고, 관리자 페이지를 구현하여 기본적인 CRUD 기능이 가능하도록 풀스택 개발 목표로 구현하였습니다.

<br />

## 📅 개발 기간
2023년 5월 9일 ~ (약 30일)

<br />

## 🛠 Skils

****Front-End**** <br />
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white"/>
<br /><br />
****Back-End**** <br />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white"/>
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=MongoDB&logoColor=white"/>

<br />

## 시작 가이드
### Front-End (user)
```javascript
cd client
npm install
npm start
```
### Front-End (admin)
```javascript
cd admin
npm install
npm start
```
### Back-End
root .env 환경변수 설정
```ini
MONGO = mongoDB 주소
JWT = test
```

```javascript
cd api
npm install
npm start
```

<br />

## 📌 API / 스키마
<a href="https://www.notion.so/6f90f98d052c48e8ab9b1151fb86ef07?v=9a8a6045cced419e865ea1fb9faddee2&pvs=4" target="_blank">**📗 API**</a> <br />
<a href="https://www.notion.so/8c0d8d454d0d49f080d2c6d3c8b0f59c?pvs=4" target="_blank">**📚 스키마**</a>



<br />

## 📌 주요 기능
### 1. 회원가입 / 로그인 / 회원 정보 수정
|페이지|설명|
|------|---|
|<img src="https://github.com/ji-silver/Player/assets/59919953/77b5a9c5-1e45-417e-9cdf-5858ad87b331" width="500" height="auto" />| - 비밀번호는 bcrypt를 사용하여 안전하게 암호화하고 저장합니다. <br /> - JWT토큰을 사용해서 사용자를 인증하고 토큰을 생성하고 검증 후 토큰을 쿠키로 전달합니다. 이 때 httpOnly 옵션을 사용해서 보안을 강화합니다.<br />- 로그인 된 유저 정보는 Context API와 useReducer로 로그인 전역 상태 관리합니다.|

<br />

### 2. 메인 화면
|페이지|설명|
|------|---|
|<img src="https://github.com/ji-silver/Player/assets/59919953/40280ed2-644a-41f6-90a5-a451839a3af8" width="500" height="auto" />| - 데이터를 가져오고, 그에 따른 로딩 상태와 에러를 커스텀 훅을 이용하여 처리하고 있으며 axios를 활용해서 백엔드 API와 통신합니다.<br />- 헤더에서 위치, 날짜, 인원을 체크하고 검색을 누를 때 context API를 사용해서 검색 정보를 전달하고 전역 상태가 업데이트되면, 검색 결과를 화면에 표시합니다.|

<br />

### 3. 숙소 검색 결과 페이지
|페이지|설명|
|------|---|
|<img src="https://github.com/ji-silver/Player/assets/59919953/be46063d-f497-4492-bb50-cd642d52da34" width="500" height="auto" />| - 위에서 설정한 검색 결과에 맞는 숙소를 axios를 활용해서 백엔드 API와 통신하여 데이터를 불러올 수도 있고 옆에서 설정한 옵션에 따라 데이터를 다시 보여줄 수 있습니다.<br />- 불필요한 데이터를 가져오지 않고, 성능을 최적화 하기 위해 데이터를 요청할 때 위치, 최소/최대가격 옵션을 넣고 MongoDB 비교 쿼리 연산자($gte, $lte)를 사용해서 필터링한 데이터를 받아 숙소를 보여줍니다.|

<br />

### 4. 숙소 상세페이지
|페이지|설명|
|------|---|
|<img src="https://github.com/ji-silver/Player/assets/59919953/cf95137f-1b0b-48cb-b1c1-91b41f963c06" width="500" height="auto" />|- 유저 정보와 검색 정보를 담은 AuthContext, SearchContext를 활용해서 회원만 숙소 예약을 할 수 있게 하고, 선택한 날짜가 예약 가능한 날짜인지 확인할 수 있는 로직을 구현했습니다.<br />- 백엔드에서 객실 방 번호와 예약 불가능한 날짜를 담을 수 있는 배열을 스키마로 정의했고, 예약할 때 체크한 객실 별 objectId와 체크인 / 체크아웃 날짜를 DB에 저장합니다.<br />- 추후 해당 객실 예약 가능 여부 확인 시 체크인 / 체크아웃 날짜가 예약되어있는 날짜와 하나라도 포함되어있는지 여부를 판단하여 예약 불가하도록 구현하였습니다.|

<br />

### 5. 관리자 페이지
|페이지|설명|
|------|---|
|<img src="https://github.com/ji-silver/Player/assets/59919953/426a1f29-6b04-4695-b66d-351b39ce06ea" width="500" height="auto" />|- 백엔드에서 JWT토큰에 관리자 여부 정보를 포함하여 관리자만 접근할 수 있도록 로그인 시 검증합니다.<br />- axios를 활용해서 백엔드 API와 통신하며 유저, 숙소, 객실 CRUD 기능을 할 수 있도록 구현하였습니다.<br />- Cloudinary API는 이미지 최적화를 제공하여 원본 이미지를 자동으로 리사이징하고 압축하여 빠르게 로딩되도록 도와주기 때문에 Cloudinary를 통해 회원, 숙소 이미지를 저장하고 URL을 받아와서 DB에 저장하는 기능을 구현하였습니다.|
