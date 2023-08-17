import fs from 'fs'
import { parse } from 'csv-parse'
import { randomUUID } from 'crypto'
import { getCurrentFormattedDate } from '../middleware/routes.js'
import { Database } from '../../database.js'
import { fileURLToPath } from 'url'
import path from 'path'
import stripBom from 'strip-bom'

const database = new Database() // por ser so uma linha não tinha porque importar isso apenas para não repetir o codigo.


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const inputFile = path.join(__dirname, 'fileToImport.csv') // ao tentar uma forma de caminho mais simples sempre dava erro, por isso precisei fazer todo essa manipulação usando o fileURLToPath e o path.dirname
let isFirstLine = true

if (!fs.existsSync(inputFile)) {
    console.error('O arquivo não existe:', inputFile)
    process.exit(1)
}

const fileContent = stripBom(fs.readFileSync(inputFile, 'utf8')) // tive que usar o stripBom para contornar erros de importação do meu arquivo CSV
const parser = parse({ delimiter: ';' })

parser.on('error', function(err) {
    console.error('Erro no parser:', err.message)
})

export async function importTasks() {
    parser.on('data', async (row) => { 
      
        if (isFirstLine) {
            isFirstLine = false;
            return;
        }
        const title = row[0]
        const description = row[1]

        const tasks = {
            id: randomUUID(),
            title,
            description,
            completed_at: null,
            created_at: getCurrentFormattedDate(),
            updated_at: getCurrentFormattedDate(),
        }

        try {
            await database.insert('tasks', tasks)
            console.log(`Task ${tasks.title} foi inserida com sucesso`)
        } catch (error) {
            console.error(`Erro ao adicionar task "${tasks.title}":`, error)
        }
    })

    parser.on('end', () => {
        console.log('Importação do arquivo CSV concluída')
    })

    parser.write(fileContent)
    parser.end()
}
