FROM node:20-alpine

WORKDIR /opt/app
COPY . .
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install
ENV PATH /opt/node_modules/.bin:$PATH

RUN ["npm", "install"]
RUN ["npm", "run", "build"]
EXPOSE 3000
CMD ["npm", "run", "start"]