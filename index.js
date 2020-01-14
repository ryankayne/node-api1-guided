const express = require('express');

const Hubs = require('./data/hubs-model.js');

const server = express();

//middelware

server.use(express.json());

server.get('/', function(request, response) {
    response.send({ Hello: 'Web 25' })
});

// GET info from Hubs

server.get('/api/hubs', (request, response) => {
    Hubs.find()
    .then(hubs => {
        response.status(200).json(hubs);
    })
    .catch(error => {
        console.log(error);
        response.status(500).json({ errorMessage: "Sorry, we ran into an error getting the list of hubs" })
    })
})

//CREATE info on Hubs

server.post('/api/hubs', (request, response) => {
    const hubData = request.body;

    Hubs.add(hubData)
    .then(hub => {
        response.status(201).json(hub);
    })
    .catch(error => {
        console.log(error);
        response.status(500).json({ errorMessage: "Sorry, we ran into an error creating the hub" })
    })
})

// //UPDATE info on Hubs

server.put('/api/hubs/:id', (request, response) => {

const id = request.params.id;
const hubData = request.body;

    Hubs.update(id, hubData)
    .then(updated => {
        response.status(204).json(updated);
    })
    .catch(error => {
        console.log(error);
        response.status(500).json({ errorMessage: "Sorry, we ran into an error updating the hub" })
    })
})

//DELETE info from Hubs

server.delete('/api/hubs/:id', (request, response) => {

    const id = request.params.id;

    Hubs.remove(id)
    .then(deleted => {
        // response.status(204).end();
        response.status(200).json(deleted);
    })
    .catch(error => {
        console.log(error);
        response.status(500).json({ errorMessage: "Sorry, we ran into an error deleting the hub" })
    })
})

const port = 8000;
server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`));