# simple-blog-app-react-node

React.js 와 Node.js 로 구현한 간단한 블로그 웹 애플리케이션 입니다.

---

- 진행 방식은 issue 를 등록하고 issue 를 해결하는 방식입니다.
- 브랜치 명은 다음과 같은 방식입니다.
  - (front or back) / 내용
- 커밋 메세지는 다음과 같은 방식입니다.

  - [(브랜치명) / (feature,fix...)] 커밋 메세지 (# no.issue)

---

## quick start

- require(필수 조건)

  - node.js (10.15.3)
  - postgresql

- 데이터베이스 세팅 (ubuntu 18.04 기준)
```bash
 $> sudo su postgres
 postgres@~$ psql
 postgres=# create database simple_blog owner test;  // 데이터 베이스 생성
 postgres=# \c simple_blog  // 데이터 베이스 접근
 simple_blog=# CREATE EXTENSION IF NOT EXISTS "uuid-ossp";  // UUID auto generator을 위한 세팅
```

- .env 추가(backend)

```bash
 $> cd backend  // root parh 기준 
 $> touch .env
```

```
# server port
PORT=8080

# postgresql settings
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=test
DATABASE_PASSWORD=test
DATABASE_NAME=simple_blog
DATABASE_MAX_TRY_RECONNECT=5
DATABASE_RECONNECT_SECONDS=10

# jwt secret
JWT_SECRET=test123

```

- backend dev server start (backend dev 서버 구동)
```bash
$> cd backend  // root parh 기준 
$> yarn && yarn dev  // npm install && npm run dev
```

- frontend dev server start(frontend dev 서버 구동)
```bash
$> cd frontend  // root parh 기준 
$> yarn && yarn dev  // npm install && npm run dev
```

## 프로젝트에 대한 상세한 내용은 Wiki 문서에 작성해 두었습니다.

[요구사항 (requirements)](<https://github.com/sc372/simple-blog-app-react-node/wiki/%EC%9A%94%EA%B5%AC%EC%82%AC%ED%95%AD-(requirements)>)

[개발 일정 (schedule)](<https://github.com/sc372/simple-blog-app-react-node/wiki/%EA%B0%9C%EB%B0%9C-%EC%9D%BC%EC%A0%95-(schedule)>)

[와이어 프레임 (wire frame)](<https://github.com/sc372/simple-blog-app-react-node/wiki/%EC%99%80%EC%9D%B4%EC%96%B4-%ED%94%84%EB%A0%88%EC%9E%84-(wire-frame)>)

[데이터 모델링 (data modeling)](<https://github.com/sc372/simple-blog-app-react-node/wiki/%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%AA%A8%EB%8D%B8%EB%A7%81-(data-modeling)>)

[프론트엔드 (frontend)](<https://github.com/sc372/simple-blog-app-react-node/wiki/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-(frontend)>)

[백엔드 (backend)](<https://github.com/sc372/simple-blog-app-react-node/wiki/%EB%B0%B1%EC%97%94%EB%93%9C-(backend)>)
