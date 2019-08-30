# FROM node:11.4.0 as builder

# Create app directory
# WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package.json ./

# RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
# COPY . .

# RUN npm run build

# FROM nginx:alpine
#COPY --from=builder /app/dist ./usr/share/nginx/html
#COPY nginx.conf ./etc/nginx/nginx.conf

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist /usr/share/nginx/html/admin
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
