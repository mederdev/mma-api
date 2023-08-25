FROM node:18-alpine As build
WORKDIR /app
COPY package*.json ./

RUN npm ci
COPY . .
RUN npm run build

EXPOSE 3000
CMD [ "node", "dist/main.js" ]
