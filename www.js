const http = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs");
const dateInfo = require("./dateTime_et");
const { parse } = require('querystring');
const pageHead = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Gertrud Roos, veebiprogrammeerimine 2023</title><script src ="first.js"defer></script></head><body>'
const pageBanner = '\n\t<img src="/banner.png" alt="lehe bänner">\n'
const pageBody = '<img src= "../~rinde/media/pics/banner/vp_banner_2023.png"_alt="veebiprogrammeerimine kursuse banner"><h1>Gertrud Roos</h1><p>See leht on loodud <a href="https://www.tlu.ee" target="_blank">TLÜ</a> Digitehnoloogiate instituudis õppetöö raames! Ma lisasin siia asjuuu!</p><hr><p>Kursus, mille raames leht tehti on: veebiprogrammeerimine.'
const pageFoot = '</p></body></html>'
//const date = `<p id="output">${"Tänane kuupäev on " + dateInfo.dateNowET()}</p>`; 
//const time = `<p id="output">${"Lehe avamise hetkel oli kell " + dateInfo.timeNowET()}</p>`; 

const semesterBegin = new Date("08/28/2023");
const today = new Date();
const semesterLastedFor = Math.floor((today.getTime() - semesterBegin.getTime()) / (1000 * 60 * 60 * 24));

http.createServer(function(req, res){
	if (req.method === 'POST'){
	//collectRequestData(req, result =>{
		//res.write(result);
		//res.end();
		//});
		//Avan tekstifaili kirjutamiseks
		fs.open('public/log.txt', 'a',(err, file)=>{
			if (err){
				throw err;
			}
			else{
					fs.appendFile('public/log.txt', 'Tekst lisatud;',(err)=>{
						if(err){
							throw err;
						}
						else {
							res.end('Lisati tekst');
						}
					});
					fs.close(file,(err)=>{
						if (err){
							throw err;
						}
					});
				}
		});
	}
	else {
		let currentURL = url.parse(req.url, true);
		if(currentURL.pathname === "/"){
			//määrame tagastavate andmete päise, et on veebi leht
			res.writeHead(200, {});
			res.write(pageHead);
			res.write(pageBanner);
			res.write(pageBody);
			res.write(`<p id="output">${"Tänane kuupäev on " + dateInfo.dateNowET()}</p>`);
			res.write(`<p id="output">${"Lehe avamise hetkel oli kell " + dateInfo.timeNowET()}</p>`);
			res.write('<p><a href="addname">Lisame nime<a/>!</p>');
			res.write('<p><a href="semesterprogress">Semestri kulg<a/>!</p>');
			res.write('<p><a href="tlupilt">TLÜ pilt<a/>!</p>');
			res.write('<p><a href="tluphoto">TLÜ pildid<a/>!</p>');
			res.write(pageFoot);
			console.log("Kell on: " + dateInfo.timeNowET());
			
			return res.end();
			
		}
		else if (currentURL.pathname === "/addname"){
			res.writeHead(200, {});
			res.write(pageHead);
			res.write(pageBanner);
			res.write(pageBody);
			res.write('<h2>Palun lisa nimi </h2>');
			res.write('\n\t<form method = "POST"><label for="nameInput">Eesnimi: </label><input type="text" id="nameInput" name="nameInput" placeholder="Sinu eesnimi . . ."><br><label for="lastNameInput">Perekonnanimi: </label><input type="text" id="nameInput" name="lastNameInput" placeholder="Sinu perenimi . . ."><br><input type ="submit" name="nameSubmit" value = "Salvesta"></form></form>');
			res.write(pageFoot);
			return res.end();
		}
			else if (currentURL.pathname === "/tluphoto"){
			let htmlOutput = '\n\t<p>Pilti ei saa nädata!</p>';
			//Fotote nimekiri
			fs.readdir('public/tlu_pildid', (err, fileList)=>{
				if(err){
					throw err;
					tluPhotoPage(res, htmlOutput);
				}
				else {
					console.log(fileList.length);
					let photoNum = Math.floor(Math.random() * fileList.length);
					htmlOutput = '\n\t <img src="' + fileList[photoNum] + '" alt="TLÜ pilt">';
					tluPhotoPage(res, htmlOutput);
					console.log(htmlOutput);

				}
			});
		}
			else if (currentURL.pathname === "/semesterprogress"){
			res.writeHead(200, {});
			res.write(pageHead);
			res.write(pageBanner);
			res.write(pageBody);
			res.write('<h2>Semestri kulgemine </h2>');
			if (semesterLastedFor < 0) {
				res.write(`<p>2023/2024 õppeaasta sügissemester pole veel peale hakanud.</p>`);
			} else if (semesterLastedFor >= 0 && semesterLastedFor <= 123) { // 123 päeva on 28. jaanuarini
				res.write(`<p>Semester veel kestab. Semestrist on möödunud ${semesterLastedFor} päeva.</p>`);
				res.write(`<p>Jäänud on veel ${123 - semesterLastedFor} päeva.</p>`);
				res.write(`<p>${Math.floor(semesterLastedFor / 7)} nädalat on möödunud.</p>`);
			} else {
				res.write(`<p>Semester on juba lõppenud.</p>`);
			}
			//Graafiline element
			res.write(`<meter min="0" max="123" value="${semesterLastedFor}"></meter>`);
			res.write(pageFoot);
			return res.end();
		}
		else if (path.extname(currentURL.pathname) === ".jpg"){
			console.log(path.extname(currentURL.pathname));
			let filePath = path.join(__dirname, "public", 'tlu_pildid');
			fs.readFile(filePath + currentURL.pathname, (err,data)=>{
				if (err){
					throw err;
				}
				else{
					res.writeHead(200, {"content-Type": "image/jpeg"});
					res.end(data);
				}
			});
		}
		else if(currentURL.pathname === "/banner.png"){
			let filePath = path.join(__dirname, "public", "banner/banner.png");
			fs.readFile(filePath, (err, data)=>{
				if(err){
					throw err;
				}
				else {
					res.writeHead(200, {"content-Type": "image/png"});
					res.end(data);
				}
			});
		
		}
		else {
			res.end('ERROR 404');
		}
	
	}
}).listen(5216);

function tluPhotoPage(res, photoHTML){
		res.writeHead(200, {"content-Type": "text/html" });
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write('\n\t<hr>');	
		res.write(photoHTML);
		//res.write('\n\t<img src ="tlu_42.jpg" alt="TLÜ foto">');		
		res.write('\n\t <p><a href="/">Tagasi avalehele</a>!</p>');
		res.write(pageFoot);
		return res.end();
}
function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let receivedData = '';
        request.on('data', chunk => {
            receivedData += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(receivedData));
        });
    }
    else {
        callback(null);
    }
}
//5200 rinde

//5216 mina
