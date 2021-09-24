FROM node:14-alpine
RUN apk add --no-cache git make gcc g++ python2

EXPOSE 4002

ENV PORT=4002
ENV NODE_ENV=production

WORKDIR /app
COPY . .
RUN yarn install --production --frozen-lockfile && \
    yarn generate && \
    yarn build 
CMD yarn start
