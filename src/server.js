import http from 'node:http'
import {format} from 'date-fns'

const tasks = []
const server = http.createServer(async(req, res) => {
    const {method, url} = req
    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    } 
    
    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString()) 
    }catch{
        req.body = null
    }   
    
   
    
    const currentDate = new Date()
    const formatedDate = format(currentDate, 'dd-MM-yyyy')

    if(method == 'GET' && url == '/tasks') {
        return res
        .setHeader('Content-type', 'aplication/json')
        .end(JSON.stringify(tasks))
    }

    if(method == 'POST' && url == '/tasks') {
        const {title, description} = req.body
        tasks.push({
            id: 1,
            title,
            description,
            completed_at: null,
            created_at: formatedDate,
            updated_at: formatedDate,
        })
        return res.writeHead(201).end()
    }


})

server.listen(3333)