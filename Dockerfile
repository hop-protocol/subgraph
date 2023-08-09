FROM node:16 AS build
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN npm run generate-config-json

FROM alpine:3.17
RUN apk add npm
RUN apk add jq
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=build /usr/src/app/package.json /usr/src/app/package.json
COPY --from=build /usr/src/app/abis /usr/src/app/abis
COPY --from=build /usr/src/app/bin /usr/src/app/bin
COPY --from=build /usr/src/app/config /usr/src/app/config
COPY --from=build /usr/src/app/contracts /usr/src/app/contracts
COPY --from=build /usr/src/app/migrations /usr/src/app/migrations
COPY --from=build /usr/src/app/scripts /usr/src/app/scripts
COPY --from=build /usr/src/app/src /usr/src/app/src
COPY --from=build /usr/src/app/*.sh /usr/src/app/
COPY --from=build /usr/src/app/*.graphql /usr/src/app/
COPY --from=build /usr/src/app/*.yaml /usr/src/app/
ENTRYPOINT ["npm", "run"]
CMD []
