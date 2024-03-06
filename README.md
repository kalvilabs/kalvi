<h1>Kalvi - Open Source Infrastructure for Online Education</h1>

We are an opensource company building modern technology stack for building your own edtech platform - create eLearning content, manage zoom classes, administer online assessments, foster communities, implement gamification strategies and a lot more - all without building from scratch.
<br>

🌐 https://www.kalvi.co <br> 📧 hello@kalvi.co

![image](https://github.com/kalvilabs/.github/assets/9934901/f16d0280-cb8d-4f95-80d4-6f8e973a989d)
<br>

<h2>Unified Technology Stack for Digital Learning</h2>

<h3>Teach - All the tools you need to create engaging digital learning experiences </h3> 

![1](https://github.com/kalvilabs/kalvi/assets/9934901/6dfbe3a4-179d-48ad-8009-ae58bd7b9ba0)

<h3>Connect - Build a vibrant learning community to foster social learning experiences</h3>

![Screenshot-2024-03-04-at-45443PM](https://github.com/kalvilabs/kalvi/assets/9934901/2ffd6972-74fd-48a3-90d5-a08a12b2cd6b)

<h3>Assess - Administer online assessments in Coding, Math and Mocks with Proctoring </h3>

![ss2-1](https://github.com/kalvilabs/.github/assets/9934901/4f0eb1b3-4d94-4b25-8aa6-dc205563614d)


 <h3>Gamify - Transform educational journey into an exciting adventure </h3>
<img width="869" alt="image" src="https://github.com/kalvilabs/.github/assets/9934901/2bfddc86-2e53-460f-9dde-a75f88af4ce8">

 <h3>Measure - Make Informed Decisions with Data Analytics </h3>

 ![image - total](https://github.com/kalvilabs/.github/assets/9934901/6ff6c772-c2d5-4c57-91c8-5e4e2e3a6261)


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
