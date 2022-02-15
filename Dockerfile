FROM node:lts-alpine3.12 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
