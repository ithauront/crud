import http from 'node:http'
import { json } from './middleware/json.js'
import { routes } from './middleware/routes.js'
import {extractQueryParams} from './utils/extract-query-params.js'
import { importCvsFile } from './CSVParse/import-csv.js'




const server = http.createServer(async(req, res) => {
    const {method, url} = req
    await json(req, res)

   const route = routes.find(route => {
    return route.method === method && route.path.test(url) 
   })
   
   if (route) {
    const routeParams = req.url.match(route.path)
    const {query, ...params} = routeParams.groups
    
    req.params = params
    req.query = query ? extractQueryParams(query) : {}
    return route.handler(req, res)
   }

 return res.writeHead(204).end()

})

importCvsFile()
server.listen(3333)