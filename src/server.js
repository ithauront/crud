import http from 'node:http'
import {format} from 'date-fns'
import { json } from './middleware/json.js'
import { Database } from '../database.js'

const database = new Database()
const server = http.createServer(async(req, res) => {
    const {method, url} = req
   await json(req, res)
    
   
    
    const currentDate = new Date()
    const formatedDate = format(currentDate, 'dd-MM-yyyy')

    if(method == 'GET' && url == '/tasks') {
       const tasks = database.select('tasks')
       
        return res.end(JSON.stringify(tasks))
    }

    if(method == 'POST' && url == '/tasks') {
        const {title, description} = req.body
        const tasks = {
            id: 1,
            title,
            description,
            completed_at: null,
            created_at: formatedDate,
            updated_at: formatedDate,
        }
        database.insert('tasks', tasks)
        return res.writeHead(201).end()
    }


})

server.listen(3333)