import http from 'node:http'
import {format} from 'date-fns'

const tasks = []
const server = http.createServer((req, res) => {
    const {method, url} = req
    
    const currentDate = new Date()
    const formatedDate = format(currentDate, 'dd-MM-yyyy')

    if(method == 'GET' && url == '/tasks') {
        return res
        .setHeader('Content-type', 'aplication/json')
        .end(JSON.stringify(tasks))
    }

    if(method == 'POST' && url == '/tasks') {
        
        tasks.push({
            id: 1,
            title: 'fazer app',
            description: 'criar uma api para armazenar tasks',
            completed_at: null,
            created_at: formatedDate,
            updated_at: formatedDate,
        })
        return res.writeHead(201).end()
    }


})

server.listen(3333)