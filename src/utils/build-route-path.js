
export function buildRoutePath(path){

const routeRegexParam = /:([a-zA-Z]+)/g
const pathWithParams = path.replaceAll(routeRegexParam, '(?<$1>[a-z0-9\-_]+)')
const pathRegex = new RegExp(`^${pathWithParams}`)

return pathRegex 
}