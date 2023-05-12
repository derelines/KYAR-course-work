const fs = require("fs");//подключает библиотеку которая позв раб с фай-ми
const express = require('express');//подкл экспрес жс
const app = express();//помещает в переменную эп нашу функцию экспресс для сокращения кода

const PORT = 3000;//объявл порт, на котором будет наход наш сайт
//подключили экспресс джс(для поднятия сервера) и бодипарсер(для работы с формой)
app.use(express.urlencoded({ extended: false }));//позволяет использ параметры реквест и респ; для корректного получения данных от польз-ля

app.listen(PORT);//для запуска сервера

app.get('/', (req, res) => {//будем просматр нашу стр с юрл (для получ данных, которые пришли от польз-ля,перенапр-т на указ-ю стр)
res.sendFile(__dirname + "/public/menu.html");//загружает нашу стр по брл, дирнейм для полного пути
})

app.get('/fourth_page', (req, res) => {
res.sendFile(__dirname + "/public/fourth_page.html");
})

app.post('/fourth_page', (req, res) => {//пост обраб данные которые пришли с указ юрл
let fio = req.body.fio;
let email = req.body.email;
let soo = req.body.soo;

if (fio == "" || email == "" || soo == "") {
return res.redirect("/");//редирект перенаправляет по указанному юрл
} else {

let data = fs.readFileSync(__dirname + "/public/viewers.xml", "utf8");//синк синхр чтение файла
let str_to_arr = data.split('\n');
str_to_arr.pop();
let dataUser =
`${str_to_arr.join('\n')}
<viewer>
<fio>${fio}</fio>
<email>${email}</email>
<soo>${soo}</soo>
</viewer>
</viewers>`//доллар шабл-я вставка
fs.writeFileSync(__dirname + "/public/viewers.xml", dataUser, (error) => {
if (error) throw error; // если возникла ошибка
console.log("Асинхронная запись файла завершена.");
});
return res.redirect("/fourth_page");
}
})

app.use(express.static('public'))//для работы со стилями и картинками; работаем со статическими файлами из папки паблик