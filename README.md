<h1>Kalvi - Open Source Infrastructure for Online Education</h1>
<b>Easily launch educational platforms, craft online courses, sell mock tests,
handle live classes, and foster communities - all without building from scratch.</b>

<br>
<br>

![image](https://github.com/kalvilabs/kalvios/assets/9934901/9314fe63-bd71-4814-b839-d2db37d54183)


# Quick Start
**Pre-requisites**

 1. Docker - https://www.docker.com/
 2. Node - https://nodejs.org/en
 3. PNPM - https://pnpm.io/
 4. VSCode - https://code.visualstudio.com/

Step 1: Run this to install both frontend and backend
```

pnpm run dev-prep

```
Step 2: Run to boot both the frontend and backend server
(Note: This will also run pending db migrations in the backend)
```

pnpm run dev

```

Optional: Run to boot only the backend
```

pnpm run backend:run

```


Optional: Run to boot only the frontend
```

pnpm run frontend:run

```

# How to run Django Commands

```

docker-compose run api poetry run python manage.py makemigration

```
