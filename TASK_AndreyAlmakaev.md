# React/Typescript Application

## Frontend

- webpack (config from scratch)
- React + Typescript
- ESLint + prettier
- Styled components (all styles, global theme with color keys, light and dark theme)
- Redux RTKQuery (axios?)
- Tests (jest + react testing library)
- Husky (pre-push hook where are ESlint, TS, jest checks)
- internalization/localization (russian, english)
- React-hook-form + zod validation

```
   To learn and play Webpack create test project before main project.
   Second step create webpack config on Typescript and with decomposition.
```

```
   For internalization use i18n library.
```

```
   FSD - Feature Slice Design. Frontend architecture
   Play with text project
```

```
   Tests - Jest + RTL (React testing library)
   Play on test project
```

## links:

1.  [Webpack course](https://youtu.be/acAH2_YT6bs)
2.  [FSD docs](https://feature-sliced.github.io/documentation/ru/docs/get-started/tutorial)

## Backend (server)

- Node JS + express + Typescript
- JWT, cookies + session storage
- DB (Database) - MongoDB (ORM)
- Roles: Admin, user, guest

### Application requirements

App must covers:

- several pages
- pagination
- lazy loading
- sorting
- filtering
- login/logout
- forbidden page
- error pages
- toast notifications

### Idea:

User can create posts, leave comments under any posts, edit/remove it's own posts, like any posts.
Bases on post likes you can implement popular posts and create general rating.
Also, you can show the most popular post on the main post page (e.g show popular post via slider, or top 3).
Consider adding awesome icons 😁✌️💁🏻

✍🏻Что будет на форуме:

🧑🏻‍💻1. На форуме можно будет писать посты на различные темы: TS, React, Vue, JS, Redux и т.п
Пользователи также могут обсуждать посты (темы), ставить лайки.

🎒2. На главной странице сделать ссылки для начинающих и не только начинающих, например (Learn JavaScript, W3S, Mozilla MDN, React dev).

🤣3. Я бы еще подумал про IT мемы, которые можно внедрить в проект, как ленту, что-то подобное.

👨🏻‍🏫4. А также можно сделать подборку видеомейкеров (ютуберов), которые могут помочь разобраться в какой-то теме, или уточнить что-то по забытой теме.
