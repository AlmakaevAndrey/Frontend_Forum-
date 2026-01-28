<h1 align="center">🔥 Frontend Forum — Fullstack IT Forum</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue" />
  <img src="https://img.shields.io/badge/Webpack-Custom-orange" />
  <img src="https://img.shields.io/badge/Express-Node-green" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-darkgreen" />
  <img src="https://img.shields.io/badge/Cloudinary-blue" />
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/AlmakaevAndrey/Frontend_Forum-?style=social" />
</p>

---

# 🎯 О проекте

**Frontend Forum** — это full-stack приложение, где пользователи могут создавать посты, обсуждать темы, ставить лайки и просматривать популярные материалы.  

Проект создан полностью *from scratch*: свой Webpack, архитектура FSD, RTK Query, темизация, мультиязычность, тесты и полный backend на Express + MongoDB.

---

# 🚀 Функциональность

## 🧑‍💻 Пользователь
- регистрация / вход / выход  
- роли: **admin**, **user**, **guest**  
- защищённые маршруты  
- сохранение сессии  

## 📝 Посты & Комментарии & Мемы
- создание / редактирование / удаление  
- лайки  
- комментарии  
- пагинация  
- сортировка и фильтры  
- lazy loading
- memes

## 🎨 Интерфейс
- dark/light темы  
- Styled Components ThemeProvider  
- i18n (RU / EN)  
- toast-уведомления  
- страницы ошибок (404 / 403 / 500)  

## ⚙️ Dev-функции
- Husky pre-push hooks  
- Jest + RTL тестирование  
- Webpack: decomposition, optimization  
- строгие линтеры (ESLint + Prettier)  
- проверки перед пушем  

---

# 🧩 Tech Stack

## 🎨 Frontend
| Технология |
|-----------|
| **React 19** |
| **TypeScript** |
| **Webpack (custom)** |
| **Redux Toolkit + RTK Query** |
| **Styled Components** |
| **React Hook Form + Zod** |
| **i18n (react-i18next)** | 
| **Jest + RTL** |

## 🛠 Backend
| Технология |
|-----------|
| **Node.js + Express** | 
| **TypeScript** | 
| **MongoDB + Mongoose** | 
| **JWT + Cookies** | 
| **Session Storage** | 
| **Role middleware** | 

---

# 🖼 Пример интерфейса

<p align="center">
  <img src="https://s1.radikal.cloud/2025/11/15/SNIMOK-EKRANA-2025-11-15-093202dbaf20ea39e68e03.png" width="80%" />
</p>

---

# 🔧 Установка и запуск

```bash
# Клонирование репозитория
git clone https://github.com/username/frontend-forum.git

# Переход в каталог
cd frontend-forum

# Установка зависимостей
npm install

# Запуск в dev-режиме
npm run dev

# Production-сборка
npm run build
