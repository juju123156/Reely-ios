# Node.js 기반의 React Native 개발 환경
FROM node:20.17.0

# 작업 디렉토리 설정
WORKDIR /app

# 종속성 설치
COPY package.json yarn.lock ./
RUN yarn install && \ 
    mkdir -p /app/logs

# 소스 코드 복사
COPY . .

# Expo CLI 설치 (필요한 경우)
RUN npx react-native init Reely --skip-install && \
    cd Reely && \
    yarn install && \
    cd ios && \
    bundle install && \
    bundle exec pod install



# 기본 포트 설정
EXPOSE 19000

# 앱 시작
CMD ["npm", "start"]