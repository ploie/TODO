import { Task } from "./Task.js";


class Todos {
  #tasks = []
  #backend_url = ''

  constructor(url) {
this.#backend_url = url
  }

  /* getTasks = () => {
    return new Promise(async(resolve, reject) => {
      fetch(this.#backend_url)
      .then((response) => response.json())
      .then((json) => {
       console.log("getTasks sanema: ", json) //so pievienoju pec drauga ieteikuma
       console.log("typeof json:", typeof json);
  console.log("isArray?", Array.isArray(json));
  console.log("json:", json); 
       this.#readJson(json.tasks)
        resolve(this.#tasks)
      }, (error) => {
        reject(error)
      })
      })
  }*/
      getTasks = () => {
        return new Promise(async (resolve, reject) => {
          fetch(this.#backend_url)
            .then((response) => response.json())
            .then((json) => {
              console.log("json full:", JSON.stringify(json, null, 2));
              console.log("json.tasks:", json.tasks);  
       
    
              if (Array.isArray(json.tasks)) {
                this.#readJson(json.tasks);  // در صورتی که tasks آرایه است، پردازش می‌کنیم
              } else {
                console.error("json.tasks is not an array or is undefined.");
              }
              resolve(this.#tasks);
            })
            .catch((error) => {
              reject(error);
              });
        });
      };
       

  addTask = (text) => {
    return new Promise (async(resolve, reject) => {
      const json = JSON.stringify({description: text})
      
      fetch(this.#backend_url + '/new', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: json
      })
      .then((response) => response.json())
      .then((json) => {
        resolve(this.#addToArray(json.id,text))
      }, (error) => {
        reject(error)
        
      })
    })
  }
  removeTask = (id) => {
    return new Promise (async(resolve, reject) => {
      fetch(this.#backend_url + '/delete/' + id, {
        method:'delete'
      })
      .then((response) => response.json())
    .then((json) => {
      this.#removeFromArray(id)
      resolve(json.id)
    }, (error) => {
      reject(error)
    })
    })
  }
  #readJson = (tasksAsJson) => {
    tasksAsJson.forEach(node => {
      const task = new Task (node.id,node.description)
      this.#tasks.push(task)
    })
  }
    
  #addToArray = (id,text) => {
    const task = new Task(id,text)
    this.#tasks.push(task)
    return task 
  }

  
#removeFromArray =(id) => {
  const arrayWithoutRemoved = this.#tasks.filter(task => task.id !== id)
  this.#tasks = arrayWithoutRemoved
}
}

export {Todos}
