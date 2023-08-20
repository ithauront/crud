import fs from 'node:fs/promises'

const databasePath = new URL('db.json', import.meta.url)

export class Database {
    #database = {}
  
    constructor() {
        fs.readFile(databasePath, 'utf-8').then(data => {
            this.#database = JSON.parse(data)
        }).catch(()=>{
            this.#persist()
        })
    }

    #persist() {
        console.log('Persisting data:', this.#database); // Log para verificar os dados antes da persistência
        fs.writeFile(databasePath, JSON.stringify(this.#database));
        console.log('Data persisted.'); // Log após a persistência dos dados
    }

    select(table, search){
        let data = this.#database[table] ?? []
        if (search) {
            data = data.filter(row => {
               return Object.entries(search).some(([key, value]) => {
                if (row[key] === null) {
                    return false
                }
                return row[key].toLowerCase().includes(value.toLowerCase())
               })
            })
        }
        return data
    }

    insert(table, data) {
        console.log(`Inserting data into ${table}:`, data);
        
        if (!this.#database[table]) {
            this.#database[table] = [];
        }

        const existingData = this.#database[table].some(entry => entry.title === data.title && entry.description === data.description)
        if (!existingData) {
            this.#database[table].push(data);
           
            this.#persist();
            
            console.log(`Data inserted into ${table}.`);
        } else {
            console.log('the task already exists in the database')
        }   
        
        return data;
    }
    

    delete(table, id) {
        
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
       
        if(rowIndex === -1) {
            throw new Error(`id não encontrado: ${id}`)
            
        }
        this.#database[table].splice(rowIndex, 1)
            this.#persist()
    } 

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
       

        if(rowIndex === -1) {
            throw new Error(`id não encontrado: ${id}`)
        }
        const originalTask = this.#database[table] [rowIndex]
        const updatedTask = { ...originalTask, ...data}
        this.#database[table] [rowIndex] = updatedTask
        this.#persist()
    } 
 
}