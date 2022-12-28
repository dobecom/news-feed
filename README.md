## Overview

뉴스피드 백엔드 서비스 개발

## Installation

```bash
$ yarn
$ docker pull redis:latest
$ docker pull postgresql:13
$ docker compose up dev-db -d
$ docker compose up redis -d
$ npx prisma migrate
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

```bash
# e2e tests
$ yarn test:e2e
```
<img width="368" alt="image" src="https://user-images.githubusercontent.com/90499822/209831396-ee8499b1-65f0-4dfc-88e9-95b71a9ebdf1.png">
학교 생성 기능 Test Case 작성 결과

## API 명세

URL : http://localhost:3000/v1/doc/
<img width="914" alt="image" src="https://user-images.githubusercontent.com/90499822/209687270-b04ea093-3743-468d-9005-78e9436ffec0.png">

## 개발 과정 정리 Notion Link
https://dobecome.notion.site/43dce80019cf4bd69a5aa2297c2dac56
