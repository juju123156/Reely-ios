# Node.js 기반의 React Native 개발 환경
FROM node:20.17.0

# 작업 디렉토리 설정
WORKDIR /app/Reely

# 소스 코드 복사
COPY . .

# 기본 포트 설정
EXPOSE 19000

# 앱 시작
CMD ["yarn", "start"]