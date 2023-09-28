const http = require("http");
const path = require("path");
const url = require ("url");

http.createServer(function(req, res){
    console.log(url.parse(req.url, true))
    //määrame tagastavate andmete päise, et on veebileht 
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Gertrud, veebiprogrammeerimine 2023</title><script>console.log("See töötab!");</script></head><body>');
    res.write('<h1>Gertrud</h1><p>See leht on loodud <a href="https://www.tlu.ee/" target="_blank"/> TLÜ </a> Digitehnolooiate instituudis Õppetöö raames</p><hr><p>Olen Gertrud Roos</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></body></html>');
    //et see kõik valmiks ja ära saadetaks

    res.write('\n\t<img src="./public/banner/banner.png" alt="Lehe banner">\n');
    return res.end();
}).listen(5216);