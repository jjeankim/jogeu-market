# 🛍️ 조그마켓 (Jogeu Market)

<br />

<img width="1368" height="730" alt="스크린샷 2025-08-19 232204" src="https://github.com/user-attachments/assets/d4b39bda-4e22-49b0-91d8-14ef7972db4e" />


<br />

### 🍀 <a href="https://www.notion.so/while-ture-2390dbd00533802db8f2e96478e80048?p=24f0dbd005338032a8fdd038651c9be3&pm=s">조그마켓 프로젝트 과정 둘러보기</a>

<br />

## 🖥️ 프로젝트 배포 링크

🔗https://www.jogeumarket.store

<br />


## 📄프로젝트 소개
조그마켓은 소셜 커머스 기반 쇼핑몰 서비스로,
사용자는 상품을 탐색하고 장바구니에 담아 구매를 진행할 수 있습니다.
또한, OAuth 소셜 로그인(카카오/네이버)과 Toss 결제 시스템을 제공하여 편리한 쇼핑 경험을 제공합니다.

<br />


## 📅개발 기간
- 2025.07.18 ~ 2025.08.20

<br />

## ⚙️기술 스택

**Front-End**

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Hosted on Azure](https://img.shields.io/badge/Hosted_on-Azure-0089D6?style=for-the-badge&logo=microsoftazure&logoColor=white)



**Back-End**

![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=black)
![Express](https://img.shields.io/badge/Express-888888?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Azure](https://img.shields.io/badge/Backend_on-Azure-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white)

<br />


## 🔨 사용 라이브러리 및 도구
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![clsx](https://img.shields.io/badge/clsx-000000?style=for-the-badge)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![React Hot Toast](https://img.shields.io/badge/React_Hot_Toast-FF5A5F?style=for-the-badge)
![React Icons](https://img.shields.io/badge/React_Icons-FF6F61?style=for-the-badge)
![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=for-the-badge&logo=swiper&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-764ABC?style=for-the-badge)

<br />

## 🔨 개발 환경 / 도구

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![Rimraf](https://img.shields.io/badge/Rimraf-FF6347?style=for-the-badge)

<br />

## 💁‍♂️ 프로젝트 팀원
| Fullstack | Fullstack | Fullstack | Fullstack |
|:---:|:---:|:---:|:---:|
|![](https://github.com/jjeankim.png)|![](https://github.com/csy9980.png)|![](https://github.com/dev-suz.png)|![](https://github.com/Youngsun33.png)|
|👑 [김진](https://github.com/jjeankim)|[최수영](https://github.com/csy9980)|[함선우](https://github.com/dev-suz)|[허영선](https://github.com/Youngsun33)|
|**프로젝트 세팅 · 인증/보안**<br />- 회원가입/로그인 페이지<br />- 마이페이지(쿠폰·후기·회원정보)<br />- 소셜 로그인 구현<br />- 토큰 갱신 기능 구현<br />- Azure 챗봇 연동 <br />- Azure Blob Storage 연동|**상품 탐색 · UX 개선**<br />- 상품 목록/상세 페이지<br />- 에러 페이지<br />- 좋아요 & 장바구니 공유(링크 복사)<br />- Azure 키워드 추출 기능|**메인 & 사용자 기능**<br />- 메인 랜딩 페이지<br />- 위시리스트 <br />- 상품 등록 페이지<br />- 상품 정렬 및 브랜드 필터링<br />- 리뷰 별점 기능<br />- 리뷰 좋아요 · 상품 좋아요<br />- 햄버거 메뉴 <br />- 주문/배송 조회 기능|**데이터 · 결제 시스템**<br />- DB 설계 및 시드 데이터<br />- 장바구니 → 결제 플로우<br />- Toss 결제 API 연동<br />- 카카오 주소 API 연동<br />- 쿠폰 적용 기능<br />- 공통 UI(Header/Footer)|

<br />

## 🧑‍💻프로젝트 주요 기능

| 기능 | 설명 |
|------|------|
| 회원가입 / 로그인 | JWT 기반 인증으로 회원가입 및 로그인 기능을 제공합니다. |
| 상품 목록 조회 | 전체 상품을 조회할 수 있으며, 카테고리/검색을 통해 원하는 상품을 찾을 수 있습니다. |
| 상품 상세 조회 | 상품 상세 정보, 이미지, 리뷰, 문의 내역 등을 확인할 수 있습니다. |
| 장바구니 | 상품을 장바구니에 담고, 수량 변경 및 삭제가 가능합니다. |
| 주문 / 결제 | 장바구니에 담은 상품을 주문 및 결제할 수 있습니다. |
| 주문 내역 조회 | 나의 주문 및 배송 상태를 확인할 수 있습니다. |
| 쿠폰 적용 | 보유한 쿠폰을 주문 시 적용할 수 있습니다. |
| 상품 후기 | 구매 완료한 상품에 대한 후기를 작성/수정/삭제할 수 있습니다. |
| 위시리스트 | 마음에 드는 상품을 위시리스트에 저장하고 관리할 수 있습니다. |
| 회원 정보 관리 | 비밀번호 변경 등 회원 정보를 수정할 수 있습니다. |
| 이미지 업로드 | Azure Blob Storage를 통해 상품 이미지 및 프로필 이미지를 업로드합니다. |
| 접근 제어 | 로그인하지 않은 사용자는 장바구니, 주문, 후기 작성 등 주요 기능을 사용할 수 없습니다. |
| Open Graph | 공유 시 썸네일, 제목, 설명이 노출되도록 SEO 메타태그 설정 |

<br />


## 💻 사용 예시

| 회원가입 / 로그인 |
|:---:|
|<img src="https://github.com/user-attachments/assets/ca048784-1d65-4d0a-b719-e3939068d646" width=600 />|

| 상품 목록 조회 |
|:---:|
|<img src="https://github.com/user-attachments/assets/d28cdc5f-ffb4-4d83-93da-8bc6e24cd84a" width=600 />|

| 상품 상세 조회 |
|:---:|
|<img src="https://github.com/user-attachments/assets/64aa12fc-7a96-4b8e-9431-4821457dafd5" width=600 />|

| 장바구니 |
|:---:|
|<img src="https://github.com/user-attachments/assets/f4220253-6466-4ab2-beb9-f60b7ccdb77c" width=600 />|

| 주문 / 결제 |
|:---:|
|<img src="https://github.com/user-attachments/assets/c609f3da-2f48-4cb7-965d-db5bda7c7c5d" width=600 />|
|<img src="https://github.com/user-attachments/assets/2090edfb-2da6-4b95-b91f-35fd675cc370" width=600 />|

| 주문 내역 조회 |
|:---:|
|<img src="https://github.com/user-attachments/assets/d9a8a335-b03d-49fd-97e1-d9da6414aa5e" width=600 />|

| 상품 후기 작성 |
|:---:|
|<img src="https://github.com/user-attachments/assets/a95c4350-674d-4948-affc-52017fcf26d8" width=600 />|

| 위시리스트 |
|:---:|
|<img src="https://github.com/user-attachments/assets/908ff8b2-8dbb-43ac-a9af-cd453876eb9e" width=600 />|
