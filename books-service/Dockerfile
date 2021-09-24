FROM node:14-alpine
RUN apk add --no-cache git make gcc g++ python2

EXPOSE 4001

ENV PORT=4001
ENV NODE_ENV=production

WORKDIR /app
COPY . .
RUN yarn install --production --frozen-lockfile && \
    yarn generate && \
    yarn build 
CMD yarn start
