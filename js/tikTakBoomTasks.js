//первый ответ в списке - верный
const tasksJson = `
    [   
        {
            "question": "2 * 2 = ",
            "answers": [ "4", "3", "2", "5" ]
        },
        {
            "question": "Как зовут крокодила, лучшего друга Чебурашки?",
            "answers": [ "Гена", "Данди", "Чип", "Дейл", "Скрудж" ]
        },
{
            "question": "5 + 5",
            "answers": [ "10", "12", "9", "13", "7" ]
        },
        {
            "question": "Столица Италии?",
            "answers": [ "Рим", "Ватикан", "Рига", "Копенгаген", "Прага", "Стамбул" ]
        },
        {
            "question": "Самая большая страна в мире?",
            "answers": [ "Россия", "США", "Канада", "Китай", "Индонезия", "Австралия" ]
        },
        {
            "question": "Самая маленькая страна в мире?",
            "answers": [ "Ватикан", "Монако", "Италия", "Греция", "Бельгия", "Латвия", "Польша" ]
        },              
        {
            "question": "Луанда столица?",
            "answers": [ "Анголы", "ЮАР", "Мексики", "Мьянмы", "Австралии" ]
        },     
        {
            "question": "Глубина озера Байкал, метров?",
            "answers": [ "1642", "2148", "2599", "3000", "2900", "7800", "11700" ]
        },          
        {
            "question": "Глубина Марианской впадины, метров?",
            "answers": [ "11000", "5000", "15000", "22000" ]
        },   
        {
            "question": "Что будет результатом работы выражения: console.log(«Нормальные герои всегда идут в обход»)",
            "answers": [ 
                "Ошибка", 
                "Текст console.log", 
                "Нормальные герои всегда идут в обход", 
                "Нет точного ответа" ]
        },
        {
            "question": "В каком случае в switch выполнится код в default?",
            "answers": [ 
                "Если не сработал ни один case", 
                "При вложении else if", 
                "Если сработало более одного case", 
                "Если условие некорретное", 
                "Если в коде ошибка", 
                "Никогда не выполнится" ]
        },  
        {
            "question": "Что такое десериализация?",
            "answers": [ 
                "Преобразование текстовой строки в объект", 
                "Преобразование объекта в текстовую строку", 
                "Преобразование целого числа к числу с плавающей точкой", 
                "Преобразование серии кадров в целый видеоролик",
                "Преобразование объекта в число",
                "Результат работы хеш-функции",
                "Передозировка сериалами" ]
        }, 
        {
            "question": "В каком виде спорта используется бита и мяч?",
            "answers": [ 
                "Крикет", 
                "Гольф", 
                "Бейсбол",
                "Лапта" ]
        },             
        {
            "question": "Кто съел колобка?",
            "answers": [ 
                "Лиса", 
                "Заяц", 
                "Волк", 
                "Медведь",
                "Никто",
                "Сам колобок",
                "Старик со старухой" ]
        },    
        {
            "question": "К кому шла красная шапочка?",
            "answers": [ 
                "К бабушке", 
                "К дедушке", 
                "К волку", 
                "К охотникам",
                "К подружке",
                "К маме" ]
        },    
        {
            "question": "Какого веса может достигать слон в кг?",
            "answers": [ "6000", "12000", "15000", "60000", "2000"]
        },    
        {
            "question": "Самая маленькая порода собак?",
            "answers": [ 
                "Чихуахуа", 
                "Шпитц", 
                "Московская сторожевая", 
                "Бульдог",
                "Кане-корсо",
                "Мопс" ]
        },    
        {
            "question": "Сколько зубов у собаки?",
            "answers": [ "42", "20", "30", "36", "48"]
        },    
        {
            "question": "Сколько зубов у кошки?",
            "answers": [ "30", "42", "12", "44", "24"]
        },    
        {
            "question": "Сколько всего пальцев у кошки?",
            "answers": [ "18", "20", "16", "12", "14"]
        },    
        {
            "question": "Сколько пальцев на 1 лапе у волнистого попугая?",
            "answers": [ "4", "5", "3", "2", "6"]
        },    
        {
            "question": "Население Москвы, миллионов?",
            "answers": [ "12", "21", "16", "22", "25",  "19"]
        },    
        {
            "question": "Население Краснодара, тыс.?",
            "answers": [ "770", "450", "510", "930", "130",  "580"]
        },    
        {
            "question": "Вид спорта, представляющий собой спуск по ледяному жёлобу на санях, на которых спортмен лежит на животе головой вперед?",
            "answers": [ 
                "Скелетон", 
                "Бобслей", 
                "Крокет", 
                "Кёрлинг",
                "Гандбол" ]
        },    
        {
            "question": "Сколько человек в футбольной команде?",
            "answers": [ "11", "6", "7", "12", "13" ]
        },    
        {
            "question": "Сколько человек в хоккейной команде?",
            "answers": [ "6", "5", "7", "11", "13" ]
        },    
        {
            "question": "Сколько игроков в команде по кёрлингу?",
            "answers": [ "4", "5", "6", "3", "1", "8" ]
        },    
        {
            "question": "Что такое alert??",
            "answers": [ 
                "Функция, выводящая всплывающее окно пользователю", 
                "Функция, выводящая ошибки в консоль", 
                "Функция, генерирующая случайное число", 
                "Функция, выводящая предупреждение о выключении компьютера",
                "Функция, генерирующая пароль",
                "Функция, верифицирующая данные пользователя" ]
        },    
        {
            "question": "Как вывести системное окно с полем ввода значения?",
            "answers": [ 
                "prompt()", 
                "confirm()", 
                "alert()", 
                "input()",
                "slice()",
                "push()" ] 
        },
        {
            "question": "Что такое событие?",
            "answers": [ 
                "Способ взаимодействия между пользователем и сайтом", 
                "Вывод ошибки в консоль", 
                "Исключение в коде", 
                "Окончание работы программы",
                "Начало работы программы",
                "Новая строка в коде программы" ] 
        }
    ]
`;