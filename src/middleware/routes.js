import { randomUUID } from "node:crypto"
import { Database } from '../../database.js'
import {format} from 'date-fns'


const database = new Database()
const currentDate = new Date()
const formatedDate = format(currentDate, 'dd-MM-yyyy')

export const routes = [
    {
        method: 'GET',
        path: '/tasks',
        handler: (req, res) => {
            const tasks = database.select('tasks')
            return res.end(JSON.stringify(tasks))
        }
        
    },
    {
        method: 'POST',
        path: '/tasks',
        handler: (req, res) =>{
            const {title, description} = req.body
            const tasks = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: formatedDate,
                updated_at: formatedDate,
            }
            database.insert('tasks', tasks)
            return res.writeHead(201).end()
        }
    }
]

