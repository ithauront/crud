import { parse } from 'csv-parse';
import fs from 'node:fs';

const csvPath = new URL('./fileToimport.csv', import.meta.url) 

const stream = fs.createReadStream(csvPath) 

const csvParse = parse({
  delimiter: ';',
  skipEmptyLines: true,
  fromLine: 2 
}) 

export async function importCvsFile() { 
  const linesParse = stream.pipe(csvParse) 

  for await (const line of linesParse) { 
    const [title, description] = line
    await new Promise(resolve => setTimeout(resolve, 500))

  await fetch('http://localhost:3333/tasks', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify({ 
      title,
      description,
    })
  })
}
       }

