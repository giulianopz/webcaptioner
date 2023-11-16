FROM node:20

WORKDIR /usr/src

COPY ./app/package*.json ./app/
COPY . ./

RUN set -ex \
    && npm install --prefix ./app ./app \ 
    && npm run build --prefix ./app 

EXPOSE 8080

CMD ["bash","/usr/src/scripts/run.sh"]
