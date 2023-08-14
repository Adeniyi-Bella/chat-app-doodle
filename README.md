# chat-app-doodle

### Task
Build a simple chat application which is able to send messages and display messages from all senders:

![image](https://github.com/Adeniyi-Bella/chat-app-doodle/assets/37347588/4f2f8c8d-3939-4b36-9d63-ad9040128d23)

- Create a simple backend with an API for messages that reads and writes data from a database, and a frontend to interact with that API.
The API should have the following features
```bash
1. Receive new messages from the client
2. List all messages in chronological order for the client
3. The solution should be runnable locally using docker-compose
```

### Tech Stacks
- Frontend was bootstrapped with create react app.
- Backend was developed with springboot maven.
- Styling was with CSS

### Testing/Run
- To run the app for testing purposes:
- Download docker ([Download here](https://www.docker.com/products/docker-desktop/)) if not already downloaded.
```bash
1. clone the repo ```git clone https://github.com/Adeniyi-Bella/chat-app-doodle.git```
2. change directory into cloned repo ```cd chat-app-doodle```
3. run ```docker-compose build``` to build images for all the services (frontend, backend, database).
4. run ```docker-compose up``` to start all the services.
5. The frontend is available on localhost:3000. You can start testing
```

## Folder Structure

```bash
frontend/
  ├── public/
  ├── src/
  │   ├── components/
  │   ├── api
          ├── BackendService.js
  │   ├── App.jsx (All the FE logic is located inside here)
  │   ├── index.jsx
  │   ├── index.css
  ├── package.json
  ├── Dockerfile.frontend
  └── ...
backend/
  ├── .mvn/wrapper
  ├── src/
  │   ├── test/...
  │   ├── main
  │      ├── java/com/bella/backend
  │      │                       ├── controller
  │      │                           ├── UserController.java
  │      │                       ├── model
  │      │                           ├── User.java
  │      │                           ├── UserMessageRequest.java
  │      │                       ├── repository
  │      │                           ├── UserRepository.java
  │      │                       ├── service
  │      │                           ├── UserService.java
  │      │                       ├── BackendApplication.java
  │      ├── resource
  │      │      ├── application.properties
  ├── Dockerfile.backend
  ├── pom.xml
  └── ...
```
