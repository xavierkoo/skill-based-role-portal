# Project Skill-based Role Portal (SBRP)
Link to GitHub Repo [here](https://github.com/SPM-LMS-T6/project-SBRPg8t6).

The All-In-One Staff Skill-based Role Portal is designed to streamline the application process for roles based on individual skill sets. Staff can apply for desired roles and view matches according to skills acquired and logged in the Learning Journey Planning System. HR and recruitment managers can assess applicants by examining the skills they've developed through courses, as documented by the Learning & Development team. Furthermore, the HR team has the capability to list all open positions. We are gearing up for the portal's inaugural release, which will showcase five key features: <br>
<img width="531" alt="Screenshot 2023-10-31 at 4 25 34 PM" src="https://github.com/SPM-LMS-T6/project-SBRPg8t6/assets/86020207/d119814c-f131-4b40-b63b-21700f7c4276">

## Tech Stack

- Vue 3
- Bootstrap v5.2
- SASS
- FastAPI
- MySQL
- Docker
- AWS EC2

## Project setup

### Download project repository to your local directory:

```sh
git clone https://github.com/SPM-LMS-T6/project-SBRPg8t6.git
```

### Docker

**Spin Up and Run Containers**
```sh
docker compose --profile production build; docker compose --profile production up -d
```
You may access the web application via `http://localhost:8080/`.

**Tear Down Containers**
```sh
docker compose --profile production down -v
```

### Run Integration Tests with Containers
```sh
docker compose run tests pytest /app/tests
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

In the `client` folder run the following command:

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

**1. Install Cypress**
```sh
npm install cypress --prefix client
```

**2. Spin Up and Run Containers**
```sh
docker compose --profile production build; docker compose --profile production up -d
```

In the `client` folder run the following commands:

**3. Run Cypress tests in the command line**
```sh
npm run cy:run
```

**4. Run Cypress tests with the graphical runner**
```sh
npm run test:e2e:dev
```
* Select E2E Testing
* Select appropriate browser
* Select `hrWorkflow.cy.js`/ `sourceManagerWorkflow.cy.js` /`userWorkflow.cy.js` <br>
Videos of the text execution are saved to `cypress/videos/`.

## Authors

[Aaron Kwah](https://github.com/A2ron-k)\
[Ray Quek](https://github.com/rayquekCW)\
[Xavier Koo](https://github.com/xavierkoo)\
[Maurice Ho](https://github.com/HZKmaurice)\
[Richard Toh](https://github.com/Ric550)
