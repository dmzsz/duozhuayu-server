## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 创建postgis
```bash
# 使用了定位功能 postgis为postgres安装好了定位模块
docker run --name postgis -p 6543:5432 -e POSTGRES_PASSWORD=root1234 -d postgis/postgis:14-3.2
```

## 备份数据库
```bash
# 模板
docker exec -i pg_container_name /bin/bash -c "PGPASSWORD=pg_password pg_dump --username pg_username database_name" > /desired/path/on/your/machine/dump.sql

docker exec -i postgres /bin/bash -c "PGPASSWORD=root123 pg_dump --username postgres test" > ~/Desktop/duozhuayu.sql
```

## 倒入数据
```bash
# 模板
docker exec -i pg_container_name /bin/bash -c "PGPASSWORD=pg_password psql --username pg_username database_name" < /path/on/your/machine/dump.sql

docker exec -i postgres /bin/bash -c "PGPASSWORD=root123 psql --username postges test" < /path/on/your/machine/dump.sql
```