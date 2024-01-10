FROM node

COPY source .
RUN npm i
EXPOSE 1778
ENV NODE_ENV=production
CMD node index.js