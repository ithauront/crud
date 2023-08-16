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
            
            return res.end(JSON.stringify(tasks))
        }
        
    },
    {
        method: 'POST',
        path:buildRoutePath('/tasks'),
        handler: (req, res) =>{
            const {title, description} = req.body
            if (!title || !description) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'title e/ou description não foram enviados no corpo da requisição.' }));
          
            }
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
        path: buildRoutePath('/tasks/:id?'),
        handler: (req, res) => {
            const id = req.params.id;
            
            if (!id) {
                 res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'ID da task não fornecido' }));
            }
        
            database.delete('tasks', id);
            return res.writeHead(204).end();
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id?'),
        handler: (req, res) => {
            const id = req.params.id
            if (!id) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
               return res.end(JSON.stringify({ error: 'ID da task não fornecido' }));
           }

            const { title, description, completed_at }= req.body 
            if (!title || !description || !completed_at) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'title, description e/ou created_at não foram enviados no corpo da requisição.' }));
          
            }
            const updatedTask = {
                title,
                description,
                completed_at,
                updated_at: formatedDate,
            }
                               
            database.update('tasks', id, updatedTask)
            return res.writeHead(204).end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/(:id/complete)?'), //ainda tenho que dar um jeito de fazer essa rota fucnionar caso não tenha id.
        handler: (req, res) => {
            const id = req.params.id
            if (!id) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
               return res.end(JSON.stringify({ error: 'ID da task não fornecido' }));
           }
            const completedTask = {
                completed_at: formatedDate
            }
            database.update('tasks', id, completedTask)
            return res.writeHead(204).end()
        }
    }

]

