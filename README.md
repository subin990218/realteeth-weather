# realteeth-weather

React + TypeScript + Vite로 만든 날씨 조회 웹 애플리케이션입니다.
도시 검색과 위치 기반으로 현재 날씨와 예보를 직관적으로 확인할 수 있도록 구현했습니다.

## 배포 링크

- https://realteeth-weather-opal.vercel.app/

## 실행 방법

1. 저장소 클론
   ```bash
   git clone https://github.com/subin990218/realteeth-weather.git
   cd realteeth-weather
   ```
2. 의존성 설치
   ```bash
   npm install
   ```
3. 환경 변수 설정
   - 루트에 `.env` 파일 생성
   - `.env.example` 파일을 참고하여 API 키 설정

   
   ```
   VITE_OPENWEATHER_API_KEY=발급받은_OpenWeatherMap_API_Key
   ```
   
4. 개발 서버 실행
   ```bash
   npm run dev
   ```

   - 브라우저에서 http://localhost:5173 접속

## 환경 변수 설정

본 프로젝트는 외부 날씨 API(OpenWeatherMap)를 사용하므로 API 키 설정이 필요합니다.

로컬 개발 환경에서는 `.env` 파일을 사용하며,
배포 환경(Vercel)에서는 Vercel의 Environment Variables 기능을 통해 동일한 키를 설정해야 합니다.

보안을 위해 `.env` 파일은 Git에 포함하지 않으며,
`.env.example` 파일을 통해 필요한 환경 변수 형식만 공유합니다.

## 구현한 기능

- **도시 검색 및 날씨 정보 조회**
  - 시/군/구/동 단위까지 세분화된 한국 지역 검색 기능
  - 검색어 입력 시 자동완성 목록 표시

- **위치 기반 자동 날씨 표시**
  - 브라우저의 Geolocation API로 현재 위치를 가져와, 별도 입력 없이 현재 위치의 날씨를 자동으로 보여줍니다.
  - 위치 권한 거부/실패 케이스를 분기 처리하여, 권한이 없을 때는 기본 도시(서울)를 보여주도록 설계했습니다.

- **당일 최저/최고 및 시간대 별 기온 조회**
  - 3시간 단위 예보를 차트 형식으로 시각화하여, 한눈에 온도 변화를 파악할 수 있습니다.
  - 날짜가 바뀌는 시점에만 날짜를 표시하고, 같은 날짜일 경우 시간만 표시하여 가독성을 높였습니다.

- **즐겨찾기 기능**
  - 최대 6개의 지역을 즐겨찾기로 저장할 수 있습니다.
  - 즐겨찾기 카드에서 실시간 날씨 정보를 확인할 수 있습니다.
  - 닉네임 편집/삭제 기능으로 개인화된 관리가 가능합니다.
  - LocalStorage를 활용하여 브라우저를 닫아도 데이터가 유지됩니다.

## 기술적 의사결정

### 아키텍처: Feature-Sliced Design (FSD)

프로젝트 구조로 FSD 아키텍처를 채택했습니다. 기능 단위로 코드를 분리하여 각 레이어(shared, entities, features, widgets, pages)가 명확한 책임을 갖도록 설계했습니다. 이를 통해 컴포넌트 간 의존성을 단방향으로 유지하고, 기능 추가/수정 시 영향 범위를 최소화할 수 있었습니다.

### 상태 관리 및 데이터 페칭: TanStack Query

서버 상태 관리에 TanStack Query를 사용했습니다. 캐싱, 자동 리페칭, 로딩/에러 상태 관리를 선언적으로 처리할 수 있어 코드량을 줄이고 사용자 경험을 개선했습니다. `staleTime`과 `gcTime` 설정으로 불필요한 API 호출을 방지하여 API 요청 제한에도 대응했습니다.

### 좌표 변환: 로컬 매핑 테이블

OpenWeatherMap의 Geocoding API가 한글 주소를 제대로 인식하지 못하는 문제가 있었습니다. 이를 해결하기 위해 주요 한국 도시/구/동의 좌표를 로컬 매핑 테이블로 관리하여, 외부 API 의존 없이 안정적인 좌표 변환이 가능하도록 구현했습니다.

### 에러 및 엣지 케이스 처리

- 잘못된 API 응답에 대비해 필수 필드가 없을 경우 기본값을 사용하거나 카드 자체를 숨기는 방식을 적용하여 화면이 깨지는 상황을 방지했습니다.
- 위치 권한 거부, 네트워크 오류 등 다양한 실패 상황에서 사용자에게 적절한 피드백 메시지를 표시하도록 분기 처리했습니다.
- 즐겨찾기 최대 개수(6개) 초과 시 알림을 표시하여 사용자가 상황을 인지할 수 있도록 했습니다.

### 좌표 비교 정밀도

부동소수점 좌표 비교 시 정밀도 문제로 같은 위치가 다르게 인식되는 버그가 발생했습니다. 소수점 2자리까지 반올림하여 비교하는 로직을 적용해 안정적인 위치 비교가 가능하도록 수정했습니다.

## 사용 기술 스택

| 분류             | 기술                         |
| ---------------- | ---------------------------- |
| Framework        | React 19, TypeScript         |
| Styling          | Tailwind CSS v4              |
| State Management | TanStack Query (React Query) |
| Routing          | React Router DOM v7          |
| Chart            | Recharts                     |
| HTTP Client      | Axios                        |
| Build Tool       | Vite                         |
| Deploy           | Vercel                       |
| Linting          | ESLint, Prettier             |
| Version Control  | Git, GitHub                  |
