# realteeth-weather

React + TypeScript + Vite로 만든 날씨 조회 웹 애플리케이션입니다.  
도시 검색과 위치 기반으로 현재 날씨와 예보를 직관적으로 확인할 수 있도록 구현했습니다.


## 배포 링크

- https://realteeth-weather-opal.vercel.app/


## 실행 방법

1. 저장소 클론
   - git clone https://github.com/subin990218/realteeth-weather.git
   - cd realteeth-weather
2. 의존성 설치
   - npm install
3. 환경 변수 설정
   - 루트에 `.env` 생성
   - VITE_WEATHER_API_KEY= (발급받은 OpenWeatherMap API key 입력)
4. 개발 서버 실행
   - npm run dev
   - 브라우저에서 http://localhost:5173 접속

  
## 환경 변수 설정

본 프로젝트는 외부 날씨 API(OpenWeatherMap)를 사용하므로 API 키 설정이 필요합니다.

로컬 개발 환경에서는 `.env` 파일을 사용하며,  
배포 환경(Vercel)에서는 Vercel의 Environment Variables 기능을 통해 동일한 키를 설정해야 합니다.

보안을 위해 `.env` 파일은 Git에 포함하지 않으며,  
`.env.example` 파일을 통해 필요한 환경 변수 형식만 공유합니다.


## 구현한 기능

- 도시 검색 및 날씨 정보 조회
- 위치 기반 자동 날씨 표시
  - 브라우저의 Geolocation API로 현재 위치를 가져와, 별도 입력 없이 현재 위치의 날씨를 자동으로 보여줍니다.
  - 위치 권한 거부/실패 케이스를 분기 처리하여, 권한이 없을 때는 기본 도시를 보여주도록 설계했습니다.
- 당일 최저/최고 및 시간대 별 기온 조회
  - 3시간 단위 예보를 차트 형식로 시각화하여, 한눈에 온도 변화를 파악할 수 있습니다.
- 반응형 UI (구현 예정)


## 사용 기술 스택

- Frontend: React, TypeScript, Tailwind CSS, Tanstack Query
- API: (OpenWeatherMap API)
- Deploy: Vercel
- Tools: ESLint, Prettier, GitHub, Claude Code
