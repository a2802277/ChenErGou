var http=require('http')
var fs=require('fs')
http.createServer(function(req,res){
    res.setHeader('Content-Type','text/plain;charset=utf-8')
    var content=fs.readFile("index.html",'utf-8')
    res.write("content")
    res.end()
}).listen(8000)