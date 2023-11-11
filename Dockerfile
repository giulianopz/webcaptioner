FROM node:20

WORKDIR /usr/src

# Install app dependencies
COPY ./app/package*.json ./app/

RUN set -ex \
    && npm install --prefix ./app ./app 

# Copy the rest of the files
COPY . ./

# Build
RUN set -ex \
    && npm run build --prefix ./app 

EXPOSE 8080

CMD ["bash","/usr/src/scripts/run.sh"]
