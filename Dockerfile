FROM mongo:4
RUN apt update -y \
    && apt install curl -y \
    && curl -sL https://deb.nodesource.com/setup_14.x | bash - \
    && apt install nodejs -y
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .

