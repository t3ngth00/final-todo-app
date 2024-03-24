// import { response } from "express";
import { Task } from "./Task.js";

class Todos {
  #tasks = [];
  #backend_url = '';

  constructor (url) {
    this.#backend_url = url;
  }

  getTasks = () => {
    return new Promise((resolve, reject) => {
      fetch(this.#backend_url)
      .then((response) => response.json())
      .then((json) => {
        this.#readJson(json)
        resolve(this.#tasks)
      }, 
      (error) => {
        reject(error)
      })
    })
  }

  addTask = (text) => {
    return new Promise((resolve, reject) => {
      const json = JSON.stringify({description: text});
      fetch(this.#backend_url + '/new', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: json
      })
      .then((response) => response.json())
      .then((json) => {
        console.log(text);
        resolve(this.#addToArray(json.id,text))
      },
      (error) => {
        reject(error)
      })
    })
  }

  // The removing task method 
  // Id will be passed the part of url & method is delete 
  removeTask = (id) => {
    return new Promise((resolve, reject) => {
      fetch(this.#backend_url + '/delete/' + id, {
        method: 'delete'
      })
      .then((response) => response.json())
      .then((json) => {
        this.#removeFromArray(id)
        resolve(json.id)
      }, 
      (error) => {
        reject(error)
      })
    })
  }

  #readJson = (tasksAsJson) => {
    tasksAsJson.forEach(node => {
      const task = new Task(node.id, node.description);
      this.#tasks.push(task);
    })
  }

  #addToArray = (id, text) => {
    //fg
    const task = new Task(id, text); // Task(8, fg)
    this.#tasks.push(task);
    return task
  }

  // This method removes task from array based on id
  #removeFromArray = (id) => {
    const arrayWithoutRemoved = this.#tasks.filter(task => task.id !== id);
    this.#tasks = arrayWithoutRemoved;
  }
}

export { Todos }