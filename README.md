# project-service
Backend of auction-software task

---
**Usage**

1. Clone the repo

2. `cd project-service`

3. Run `npm i`

4. edit the .env file to use your DB credentials and database name

5. Run `npx prisma db push`

6. Run the .sql file

7. Run `npm start`

---

**This project has four API endpoints**

*/user/register - register a user to the system*

Example request body:
```
{
    "firstName": "Ajay",
    "lastName": "Jey",
    "email": "testing@gmail.com",
    "phoneNumber": "4894894894",
    "address": "Frankford Road",
    "password": "***********"
}
```
---
*/user/login - login to the system*

Example request body:
```
{
    "email": "testing@gmail.com",
    "password": "************"
}
```
---
*/projects/getProject - get project by pid*

Example request body:
```
{
    "pid": "10"
}
```
---
*/projects/getAllProjects - get projects based on request body*

Example request body:
```
{
    "offset" : "1",
    "pageSize": "10",
    "isSortRequired": true,
    "isDescending": true,
    "projectCategory": "IoT"
}
```
