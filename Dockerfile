# Node.js app Docker file

FROM ubuntu:16.04


RUN apt-get update

#RUN curl -sL -o nodeinstall.sh https://deb.nodesource.com/setup_6.x && chmod +x nodeintall.sh && ./nodeinstall.sh



RUN mkdir -p /opt/flare
WORKDIR /opt/flare

COPY . /opt/flare
RUN ls scripts && pwd
RUN scripts/nodesetup.sh && apt-get install -y nodejs
RUN cd /opt/flare && npm install

EXPOSE 3333




CMD ["npm", "start"]
