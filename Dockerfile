# Base 이미지 설정
FROM node:20.10.0

#작업 디렉토리 설정
WORKDIR /ibook_frontend

# 소스 코드 복사
COPY . /ibook_frontend
COPY ./package.json /ibook_frontend

# 이미지가 빌드될 때 실행
RUN npm install

# 앱 빌드
RUN npm run build

# 도커 컨테이너 내에서 실행할 명령
CMD ["npm", "start"]