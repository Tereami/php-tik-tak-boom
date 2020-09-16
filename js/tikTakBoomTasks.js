const tasks = `
    [
        {
            "question": "2 * 2 = ",
            "answer1": { "result": true, "value": "4" },
            "answer2": { "result": false, "value": "3" }
        },
        {
            "question": "Как зовут крокодила, лучшего друга Чебурашки?",
            "answer1": { "result": false, "value": "Данди" },
            "answer2": { "result": true, "value": "Гена" }
        },
        {
            "question": "5 + 5",
            "answer1": { "result": false, "value": "1" },
            "answer2": { "result": true, "value": "10" }
        },
        {
            "question": "Столица Италии?",
            "answer1": { "result": false, "value": "Ватикан" },
            "answer2": { "result": true, "value": "Рим" }
        },
        {
            "question": "Самая большая страна в мире?",
            "answer1": { "result": false, "value": "США" },
            "answer2": { "result": true, "value": "Россия" }
        },
        {
            "question": "Самая маленькая страна в мире?",
            "answer1": { "result": false, "value": "Монако" },
            "answer2": { "result": true, "value": "Ватикан" }
        },              
        {
            "question": "Луанда столица?",
            "answer1": { "result": false, "value":  "ЮАР"},
            "answer2": { "result": true, "value": "Анголы" }
        },     
        {
            "question": "Глубина озера Байкал, метров?",
            "answer1": { "result": false, "value":  "2148"},
            "answer2": { "result": true, "value":  "1642"}
        },          
        {
            "question": "Глубина Марианской впадины, метров?",
            "answer1": { "result": false, "value": "5000"},
            "answer2": { "result": true, "value": "11000"}
        },   
        {
            "question": "Это выражение приведёт к ошибке: console.log(«Нормальные герои всегда идут в обход»)",
            "answer1": { "result": false, "value":  "Нет"},
            "answer2": { "result": true, "value": "Да" }
        },
        {
            "question": "В каком случае в switch выполнится код в default?",
            "answer1": { "result": false, "value": "При вложении else if" },
            "answer2": { "result": true, "value": "Если не сработал ни один case" }
        },  
        {
            "question": "Что такое десериализация?",
            "answer1": { "result": false, "value": "Преобразование объекта в строку JSON для передачи и использования другими языками программирования" },
            "answer2": { "result": true, "value":  "Преобразование строки JSON в объект"}
        }, 
        {
            "question": "В каком иде спорта используется бита и мяч?",
            "answer1": { "result": false, "value": "Гольф"},
            "answer2": { "result": true, "value": "Крикет"}
        },             
        {
            "question": "Кто съел колобка?",
            "answer1": { "result": false, "value": "Лиса"},
            "answer2": { "result": true, "value": "Никто"}
        },    
        {
            "question": "К кому шла красная шапочка?",
            "answer1": { "result": false, "value": "К дедушке"},
            "answer2": { "result": true, "value": "К бабушке"}
        },    
        {
            "question": "Какого веса может достигать слон в кг?",
            "answer1": { "result": false, "value": "12000"},
            "answer2": { "result": true, "value": "6000"}
        },    
        {
            "question": "Самая маленькая порода собак?",
            "answer1": { "result": false, "value": "Шпитц"},
            "answer2": { "result": true, "value": "Чихуахуа"}
        },    
        {
            "question": "Сколько зубов у собаки?",
            "answer1": { "result": false, "value": "20"},
            "answer2": { "result": true, "value": "42"}
        },    
        {
            "question": "Сколько зубов у кошки?",
            "answer1": { "result": false, "value": "12"},
            "answer2": { "result": true, "value": "30"}
        },    
        {
            "question": "Сколько пальцев у кошки?",
            "answer1": { "result": false, "value": "12"},
            "answer2": { "result": true, "value": "18"}
        },    
        {
            "question": "Сколько пальцев у волнистого попугая?",
            "answer1": { "result": false, "value": "10"},
            "answer2": { "result": true, "value": "4"}
        },    
        {
            "question": "Население Москвы, миллионов?",
            "answer1": { "result": false, "value": "21"},
            "answer2": { "result": true, "value": "12"}
        },    
        {
            "question": "Население Краснодара, тыс.?",
            "answer1": { "result": false, "value": "450"},
            "answer2": { "result": true, "value": "774"}
        },    
        {
            "question": "Зимний олимпийский вид спорта, представляющий собой спуск по ледяному жёлобу на двухполосных санях на укрепленной раме, победитель которого определяется по сумме двух или четырёх заездов?",
            "answer1": { "result": false, "value": "Кёрлинг"},
            "answer2": { "result": true, "value": "Скелетон"}
        },    
        {
            "question": "Сколько человек в футбольной команде?",
            "answer1": { "result": false, "value": "13"},
            "answer2": { "result": true, "value": "11"}
        },    
        {
            "question": "Сколько человек в хоккейной команде?",
            "answer1": { "result": false, "value": "8"},
            "answer2": { "result": true, "value": "6"}
        },    
        {
            "question": "Сколько игроков в комнаде по кёрлингу?",
            "answer1": { "result": false, "value": "5"},
            "answer2": { "result": true, "value": "4"}
        },    
        {
            "question": "Что такое alert??",
            "answer1": { "result": false, "value": "Функция, выводящая ошибки в консоль"},
            "answer2": { "result": true, "value": "Функция, выводящая всплывающее окно пользователю"}
        },    
        {
            "question": "Как вывести системное окно с полем ввода значения?",
            "answer1": { "result": false, "value": "confirm()"},
            "answer2": { "result": true, "value": "prompt()"}
        },    
        {
            "question": "Что такое событие?",
            "answer1": { "result": false, "value": "Способ взаимодействия между пользователем и сайтом"},
            "answer2": { "result": true, "value": "Вывод ошибки в консоль"}
        } 
    ]
`;
