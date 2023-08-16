import { randomUUID } from "node:crypto"
import { Database } from '../../database.js'
import {format} from 'date-fns'
import { buildRoutePath } from "../utils/build-route-path.js"


const database = new Database()
const getCurrentFormattedDate = () => {
    const currentDate = new Date()
    return format(currentDate, 'dd-MM-yyyy')
}


export const routes = [
    {
        method: 'GET',
        path:buildRoutePath('/tasks'),
        handler: (req, res) => {
            const {search} = req.query
            const tasks = database.select('tasks', search ? {
                title: search,
                description: search,
               created_at: search,
               updated_at: search,
               completed_at: search,
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
                created_at: getCurrentFormattedDate(),
                updated_at: getCurrentFormattedDate(),
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
        try {
            database.delete('tasks', id);
            return res.writeHead(204).end();
        } catch(error) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'ID não encontrado' }));
        }
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
            try {
                const updatedTask = {
                    title,
                    description,
                    completed_at,
                    updated_at: getCurrentFormattedDate(),
                }
                                   
                database.update('tasks', id, updatedTask)
                return res.writeHead(204).end()
            } catch(error) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'ID não encontrado' }));
            }
          
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
           try {
            const completedTask = {
                completed_at: getCurrentFormattedDate()
            }
            database.update('tasks', id, completedTask)
            return res.writeHead(204).end()
           } catch(error) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'ID não encontrado' }));
           }
           
        }
    }

]

