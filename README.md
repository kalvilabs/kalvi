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

**How to run Django Commands**

```

docker-compose run api poetry run python manage.py makemigrations

```

## LICENSE
The code in this repository is licensed under version 3 of the AGPL unless otherwise noted. Please see the [LICENSE](https://github.com/kalvilabs/kalvi/blob/master/LICENSE) file for details.

## Issue Tracker
We use Github Issues for our issue tracker. You can search
[previously reported issues](https://github.com/kalvilabs/kalvi/issues).  If you need to report a bug, or want to discuss
a new feature before you implement it, please [create new issue](https://github.com/kalvilabs/kalvi/issues/new/choose).

## Reporting Security Issues
Please do not report security issues in public. Please email admin@kalvi.co.

## Getting Help
If you're having trouble, we have discussion forums at
[Discord](https://discord.gg/R5MUnxrECk) where you can connect with others in the community.

## ❤️ Contribute

There are many ways to contribute to Kalvi, including:  
-   Submitting  [documentation]([https://github.com/kalvilabs/kalvi/issues/new?assignees=&labels=bug&projects=&template=bug_report.yml&title=%5BBUG%5D](https://github.com/kalvilabs/kalvi/issues/new?assignees=&labels=documentation&projects=&template=documentation.yml&title=%5BDOC%5D)), [bugs](https://github.com/kalvilabs/kalvi/issues/new?assignees=&labels=bug&projects=&template=bug_report.yml&title=%5BBUG%5D) and [feature requests](https://github.com/kalvilabs/kalvi/issues/new?assignees=&labels=enhancement&projects=&template=feature_request.yml&title=%5BFEAT%5D)  for various components.
-   Speaking or writing about Kalvi or any other ecosystem integration and  [letting us know](https://discord.com/invite/R5MUnxrECk)!
-   Upvoting  [popular feature requests](https://github.com/kalvilabs/kalvi/issues)  to show your support.

## We are still in Pre-Alpha

Kalvi is still in early development (alpha) and should not be used (yet) on production, as we reach stability we will release a stable version and add more features.
