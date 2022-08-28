# Productivity App


![avance_jc](https://user-images.githubusercontent.com/107664374/187085585-b5f6272c-d803-4edb-b7e2-ec1a4f3b442c.gif)



## Install
    #install docker and docker compose

    Intall Docker Engine (Engine y CLI)
        https://docs.docker.com/engine/install/

    Intall Docker Compose
        https://docs.docker.com/compose/install/

    Test
        docker-compose --version

## Tech stack

    - Web application based on React (LocalStorage) and Firebase (serverside)
    - Clientside UI : material ui, css [flex, grid], Victory [charting] 
    - State management : React Context
    - Unit test : testing-library/jest-dom
    - React Hooks
    - Docker compose
    - Tomcat
    - Mongo

## UP
    
    Inside the folder docker, write: compose-docker up

## Developer Notes
    
    Runs the app in the production mode.
    Open http://localhost:8082/build/ to view it your browser

    If you change source code, you should use npm run build:linux or build:windows, this will send to build folder to tomcat

## Theme CSS
    
    No framework
    Only CSS3

## Uso de Hooks
    
    useForm
    useState
    useEffect
    useContext

## Custom Hook

    useLocalStorage    

## HTML 5
    LocalStorage
    draggable
    onDrop
    onDragStart
    onDragEnter
