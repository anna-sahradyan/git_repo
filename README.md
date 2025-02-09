# Проект Git-Star
# Проект на Netlify  https://magenta-figolla-9da0e7.netlify.app/
## Запуск приложения с использованием Docker

Для того чтобы запустить приложение в Docker, выполните следующие шаги:

### 1. Создание Docker-образа

Перейдите в корневую папку проекта и выполните команду для сборки Docker-образа:

```bash
docker build -t git-star .
docker run -p 5173:5173 git-star
