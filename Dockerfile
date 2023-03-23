FROM mongo:5

RUN apt update -y \
    && apt install curl -y \
    && curl -sL https://deb.nodesource.com/setup_16.x | bash - \
    && apt install nodejs -y

WORKDIR /app

COPY package*.json .

RUN npm ci --omit=dev

COPY . .
