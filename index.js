const http = require('http')

console.log('jello')

const server =  http.createServer((req,res)=>{
    res.end('hello')
})

server.listen(3000, ()=>{
    console.log('ruinning at port 69')
})

