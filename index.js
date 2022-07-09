let c = console.log
let https = require('https')
// https://translate.google.ru/?hl=ru&tab=rT&sl=en&tl=ru&text=live&op=translat
// https://translate.yandex.ru/?lang=en-ru&text=live
// https://nbvtim.github.io/site/
let url = 'https://nbvtim.github.io/site/'

// функция загружает удаленный URL

function readURL(url) {
   
    // возвращаем Promise - так как операция чтения может длиться достаточно долго
    return new Promise((resolve, reject) => {

        // встроенный в NodeJS модуль https
        // первый аргумент - url, второй - callback c параметром ответа сервера
       
        https.get(url, (res) => {

            // получаем статус ответа сервера посредством деструктуризации объекта
            const { statusCode } = res;
           

            let error;
            if (statusCode !== 200) {
                error = new Error(`Ошибка запроса. Код ответа: ${statusCode}`);
            }


            // при ошибке очищаем память и выходим
            if (error) {

                reject(error);
                res.resume();
                return;
            }
           

            // устанавливаем кодировку
            res.setEncoding('utf8');

            // собираем данные в строку
            let rawData = '';
            res.on('data', chunk => rawData += chunk);

            // после получения всех данных успешно завершаем Промис
            res.on('end', () => resolve(rawData));

       
           
        }).on('error', (e) => reject(e)); // ошибка -> отклоняем Промис
    })
}
readURL(url)
    .then(data =>
        c(data.indexOf('li')) //.includes('live') 
    )
    .catch(err =>
        console.log(err.message)
    )

// текст в HTML
// var text = '<div>тест</div>';
// var div = document.createElement('div');
// div.innerHTML = text;
// var result = div.firstChild;
// alert(result);
