# Angular Contact App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.3.


## Prerequisites to run the application

1. Node versaion 8 or higher 
2. Install Angular CLI by run this command `npm i -g @angular/cli@latest` on terminal
3. Open the project folder using terminal
4. Install the dependencies by run this command `npm i`
5. Run the project by run this command `ng serve -o`


# Features

1. Support multiple environments
2. CRUD operations.
3. Filtring (First Name, Last Name)
4. Sorting (First Name, Last Name, Email) -note- it work by click on column header
5. Ability to support multiple languages
6. Save contacts data in local storage using my npm package:
 https://www.npmjs.com/package/@michael-gamel/local-storage-manager

# Environments

## Development
 
 - to run in development environment `ng serve`
 - local storage prefix key --> **[development]task-**

## Testing
 
 - to run in testing environment `ng serve -c=testing`
 - local storage prefix key --> **[testing]task-**

## Staging
 
 - to run in staging environment `ng serve -c=staging`
 - local storage prefix key --> **[staging]task-**

## Production
 
 - to run in production environment `ng serve -c=prod`
 - local storage prefix key --> **task-**


 