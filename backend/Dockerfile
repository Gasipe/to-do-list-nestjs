FROM node:current-alpine3.24

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

RUN addgroup -S app && adduser -S app -G app
RUN chown -R app:app /app

USER app

EXPOSE 3000
CMD ["npm", "start"]