# TODO appis "Todoapp2"
This is TODO application that uses React frontend that is served via node.js server. We have node.js REST that is connected to redis.

## How to use
you need to have npm and node installed. Also you will need docker and docker-compose.

1. go frontend folder "npm install"
2. and run "npm run build"
3. then you need to come back to the root folder and run "docker-compose up --build"
4. go to http://localhost:5173/
5. add some todos and do the todos and delete if needed.

### Ports that need to be free
1. 3000 backend
2. 5173 frontend
3. 6379 redis

## What could be better?
Frontend would be served with nginx?
Ui should have some styles? (this might happen :)
Folder structure is not the best... 
There is no unit tests.. I should make them everytime there is some functionality.. 
