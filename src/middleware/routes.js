import { randomUUID } from "node:crypto"
import { Database } from '../../database.js'
import {format} from 'date-fns'
import { buildRoutePath } from "../utils/build-route-path.js"


const database = new Database()
const currentDate = new Date()
const formatedDate = format(currentDate, 'dd-MM-yyyy')

export const routes = [
    {
        method: 'GET',
        path:buildRoutePath('/tasks'),
        handler: (req, res) => {
            const {search} = req.query
            const tasks = database.select('tasks', search ? {
                title: search,
                description: search,
            }: null)
            console.log(req.query)
            return res.end(JSON.stringify(tasks))
        }
        
    },
    {
        method: 'POST',
        path:buildRoutePath('/tasks'),
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
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const id = req.params.id
            database.delete('tasks', id)
            return res.writeHead(204).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const id = req.params.id
            const { title, description, completed_at }= req.body 
            const updatedTask = {
                title,
                description,
                completed_at,
                updated_at: formatedDate,
            }
                               
            database.put('tasks', id, updatedTask)
            return res.writeHead(204).end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const id = req.params.id
            const completedTask = {
                completed_at: formatedDate
            }
            database.update('tasks', id, completedTask)
            return res.writeHead(204).end()
        }
    }

]

