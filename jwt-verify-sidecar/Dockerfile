FROM node:16.18

ENV PORT=9001

COPY . /jwt-verify-sidecar
WORKDIR /jwt-verify-sidecar
RUN npm install
EXPOSE ${PORT}
CMD ["node", "server.js"]