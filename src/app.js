const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
    const { title, url, techs } = request.body;

    var likes = 0;

    const repositorie = { id: uuid(),title, url, techs, likes };

    repositories.push(repositorie);

    return response.json(repositorie)

});

app.put("/repositories/:id", (request, response) => {
    const { id } = request.params;
    const { title, url, techs } = request.body;

    const repositoriesIndex = repositories.findIndex(repositorie => repositorie.id === id);

    if(repositoriesIndex < 0){
        return response.status(400).json({ error: "Repositorie not fuond"})
    }
    repositories[repositoriesIndex].likes += 1;
    const repositorie = {
      id,
      title,
      url,
      techs,
    }

    repositories[repositoriesIndex] = repositorie;

    return response.json(repositories[repositoriesIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoriesIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(repositoriesIndex < 0 ){
      return response.status(400).json({ error: 'Repositorie not found' });
  }

  repositories.splice(repositoriesIndex);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

    const repositoriesIndex = repositories.findIndex(repositorie => repositorie.id === id);

    if(repositoriesIndex < 0){
        return response.status(400).json({ error: "Repositorie not fuond"})
    }
    
    repositories[repositoriesIndex].likes += 1;

    return response.json(repositories[repositoriesIndex]);
    
});

module.exports = app;
