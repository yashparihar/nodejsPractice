# FROM node:8.14.0
# WORKDIR /api
# COPY ./AppApi/package.json /api
# RUN npm install
# COPY ./AppApi/ /api
# ENTRYPOINT ["./bin/bash"]
# CMD npm start
# EXPOSE 3000


FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y nodejs npm
RUN apt-get clean

COPY ./AppApi/package.json api2/

RUN cd api2 && npm install

COPY ./AppApi/ api2/

WORKDIR api2/

CMD ["npm","start"]

EXPOSE 3000