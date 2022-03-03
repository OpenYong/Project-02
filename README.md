# Project-02: Grab Your Coffee (백엔드)

Express와 MongoDB를 활용한 '커피 주문' 어플리케이션 백엔드.

## 개요 

Project-01 및 02는 1인프로젝트이며 약 1주일 동안 개발하였습니다. 
프론트엔드는 React를 사용하였으며 백엔드는 Express로 서버와 API를, MongoDB Atlas로 DB를 구축했습니다.
[Project-01](https://github.com/OpenYong/Project-01)은 어플리케이션의 프론트엔드를 포함하고 있습니다. 
[Project-02](https://github.com/OpenYong/Project-02)는 어플리케이션의 백엔드를 포함하고 있습니다. 

## 요약

* 풀-스택 어플리케이션.
* React로 만들어진 프론트엔드로 API를 사용. 
* Express API를 사용하여 Mongo DB에 데이터 제공.

## 기능

* 로그인, 로그아웃, 회원가입
* 등록된 카페들을 볼 수 있습니다.
* 카페의 음료를 카트에 담고 수량을 조절하고 주문을 할 수 있습니다.
* 주문 내역을 볼 수 있습니다.
* 카페를 등록하고 관리할 수 있습니다.(이미지 등록가능)
* 내 카페의 메뉴를 등록하고 관리할 수 있습니다.(이미지 등록가능)

## 추가 예정인 기능

* 결졔
* 내 카페이 들어온 주문 확인
* 알림 (주문 확인, 음료 제조 완료)
* 채팅
* 주문 시 방문 예정 시간 설정
* 커피 원두 판매 페이지

## 개발 도구

### Project-01 (프론트엔드)
* HTML
* CSS
* JavaScript
* React - The web framework
* React Router
### Project-2 (백엔드)
* Node.js
* Express
* MongoDB
* Mongoose
* jwt
* bcryptjs
* multer


## 시작하기

### 필요한 것

프로젝트 생성하기에 앞서 필요한 것들이 있습니다.
사용하는 OS에 설치되어 있지 않다면 설치해주세요.
* Node.js
데이터 베이스는 Atlas를 사용하기떄문에 설치할 필요는 없지만 계정이 필요합니다.
* MongoDB Atlas 계정 및 저장소(무료 버전, dotenv로 API 키 보호)

### Step 1. 설치

Project-01과 Project-02를 로컬 저장소에 받습니다.
각 폴더에서 다음 명령어를 입력해주세요

```
npm install
```

### Step 2. .env 파일 생성

MongoDB Atlas의 개인 API 키를 보호하기 
위해서 .env 파일이 필요합니다.
```
MONGO_URI=여러분의API키
```
다음과 같이 저장해주시기 바랍니다.

### Step 3. 실행

각 폴더에서 터미널을 실행한 후 다음 명령어를 입력해주세요.
```
npm start
```
프론트엔드는 3000번 포트, 백엔드는 8080번 포트입니다.
웹 페이지를 보기위해서는 브라우저에서 3000번 포트로 접속해주세요.

## 스크린샷

![Project-01-Main](https://user-images.githubusercontent.com/61618536/156514588-7ea95dae-af93-49b5-92f4-d795efec78d4.jpeg)
![Project-01-Login](https://user-images.githubusercontent.com/61618536/156514633-1a558aa7-475d-4bf3-b4b8-f0697d3b764b.jpeg)
![Project-01-ShopDetail](https://user-images.githubusercontent.com/61618536/156514659-a034a4bc-b736-4335-8f7e-486da6fab470.jpeg)
![Project-01-Order](https://user-images.githubusercontent.com/61618536/156514678-94263440-3431-4135-aaac-96c68dfcb6ee.jpeg)
![Project-01-OrderDetail](https://user-images.githubusercontent.com/61618536/156514690-e86e5341-8ff1-4c93-bedd-18e24b036274.jpeg)
![Project-01-MyShop](https://user-images.githubusercontent.com/61618536/156514767-8b5201fb-8ea1-40f0-ad55-461ce13ec9b9.jpeg)
