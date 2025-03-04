# Базовий етап для побудови
FROM node:16-alpine AS build

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо тільки package.json та package-lock.json
COPY package*.json ./

# Встановлюємо залежності без кешу для зменшення розміру
RUN npm install --production && npm cache clean --force

# Копіюємо решту файлів
COPY . .

# Фінальний етап для створення зменшеного образу
FROM node:16-alpine

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо лише необхідні файли з етапу build
COPY --from=build /app /app

# Відкриваємо порт 3000
EXPOSE 3000

# Команда для запуску додатку
CMD ["npm", "run", "start"]
