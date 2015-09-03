FROM ubuntu:14.04
MAINTAINER Joshua Zhang "toruta39@gmail.com"

WORKDIR ~/
RUN apt-get update && \
  apt-get upgrade -y && \
  apt-get install -y build-essential libssl-dev git curl nodejs-legacy npm
RUN npm i -g node-static
COPY ./ emojizr/
RUN cd emojizr && npm i && npm run build

EXPOSE 8080
CMD ["static", ".", "-a", "0.0.0.0"]
