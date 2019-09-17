# About
This is simple todo application written in Ionic/Cordova. All functionalities this application provides :
* register
* login
* create/delete todo lists
* add items to todo lists
* edit/delete/mark as completed items in todo list
## Usage
This application is using this repository as [backend](https://github.com/puraxa/todo-backend-express-api/ "link to repository"). The enviroment variables are set so you can test it on your own machine, default url for testing purposes is `http://localhost:3000`, and if you want to use production [url](https://todo-list-pura.herokuapp.com "link to production api") you will need to add `--prod` flag
```
ionic serve --prod
```
If your local server is running on different port, you will need to edit `API_URL` variable inside `app/environments/environment.ts` and save change. 