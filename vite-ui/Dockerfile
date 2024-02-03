FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
RUN npm install -g serve
COPY . .
EXPOSE 3000
RUN chmod 777 /
CMD ["serve", "-s", "dist"]
