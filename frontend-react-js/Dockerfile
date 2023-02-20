FROM node:16.18 AS final

FROM node:16.18 AS build

ENV PORT=3000
COPY . /frontend-react-js



FROM final
COPY --from=build /frontend-react-js /frontend-react-js
WORKDIR /frontend-react-js
ENV PORT=3000
RUN npm install
EXPOSE ${PORT}
CMD ["npm", "start"]


# FROM node:16.18

# ENV PORT=3000

# COPY . /frontend-react-js
# WORKDIR /frontend-react-js
# RUN npm install
# EXPOSE ${PORT}
# CMD ["npm", "start"]