FROM node:16-alpine
WORKDIR /app
ADD package.json package-lock.json /app/
RUN npm config set registry=http://registry.npm.taobao.org
RUN npm install
COPY . /app
RUN npm rebuild esbuild
RUN npm run build
CMD node index.js
EXPOSE 80