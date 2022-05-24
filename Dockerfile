FROM node:16

ARG APP_NAME
WORKDIR /workspace/${APP_NAME}

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm
RUN pnpm install

# Checkout project
COPY . ./

# Build app
RUN yarn build

# Clean up
RUN rm tsconfig.json

# Run app
CMD ["sh", "./start-app.sh"]
