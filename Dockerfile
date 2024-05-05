FROM node

COPY source .
RUN npm i
ENV NODE_ENV=production
CMD node index.js