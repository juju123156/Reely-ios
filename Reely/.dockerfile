# Node.js 기반의 React Native 개발 환경
FROM node:20.17.0

# 작업 디렉토리 설정
WORKDIR /app

RUN mkdir -p /app/logs

# React Native CLI 설치
RUN npm install -g react-native-cli

# React Native 프로젝트 생성
RUN npx react-native init Reely --skip-install 


# 작업 디렉토리 설정
WORKDIR /app/Reely

# 종속성 설치
COPY package.json yarn.lock ./

RUN yarn install && \
cd ios && \
bundle install && \
bundle exec pod install

# 소스 코드 복사
COPY . .

# 기본 포트 설정
EXPOSE 19000

# 앱 시작
CMD ["yarn", "start"]