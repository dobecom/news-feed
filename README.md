## Overview

뉴스피드 백엔드 서비스 개발

## Installation

```bash
$ yarn
$ docker pull redis:latest
$ docker pull postgresql:13
$ docker compose up dev-db -d
$ docker compose up redis -d
$ npx prisma generate
```

.env 파일 설정</br>
```typescript
DATABASE_URL="postgresql://postgres:<YOUR_DB_PASSWORD>@localhost:5434/news-feed?schema=public"
REDIS_HOSTNAME="localhost"
REDIS_PORT="6379"
REDIS_EXPIRATION_SEC="3600"
```


## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev
```

## Test

준비중
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API 명세

URL : http://localhost:3000/v1/doc/
<img width="914" alt="image" src="https://user-images.githubusercontent.com/90499822/209687270-b04ea093-3743-468d-9005-78e9436ffec0.png">

## ERD 설계

정리중

## 개발 과정 정리 Notion Link
https://dobecome.notion.site/43dce80019cf4bd69a5aa2297c2dac56
