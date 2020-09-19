window.onload = function () {
    init(tasksJson);
}

//не знаю почему, но когда свойства объявлялись внутри объекта tikTakBoom - они превращались в undefined после вызова по таймеру
//если объявлять вне объекта то всё норм
tasks = [];
players = [];
gameTime = 40;
errorsAllow = 3;

step = 0;
function getCurrentPlayerNumber() {
    return step % players.length;
}

startCountdown = (time, func) => {
    if(tasks.length == 0 || players.length == 0) return;
    if (time > 1) {
        time -= 1;
        timerField.innerText = convertSecondsToTime(time);
        setTimeout(startCountdown, 1000, time, func);
    } else {
        func();
    }
};

gameStatusField = document.getElementById('gameStatusField');
startSettingsDiv = document.getElementById('startSettings');
startGameButton = document.getElementById('startgamediv');
bombDiv = document.getElementById('bombDiv');
timerField = document.getElementById('timerField');
textFieldQuestion = document.getElementById('questionField');
gamesButtonsList = document.getElementById('gameButtonsDiv');
endGameButton = document.getElementById('endgamediv');


function init(_tasksJson) {
    if (readJSON(_tasksJson)) {
        startGameButton.addEventListener('click', startGame);
        endGameButton.addEventListener('click', finish, false);
    }
    else {
        alert("Ошибка при запуске игры");
    }
    bombDiv.hidden = true;
}

//Чтение и проверка JSON
function readJSON(json) {
    try {
        //Попытка чтения файла
        tasks = JSON.parse(json);
    } catch (e) {
        alert("Некорректный файл JSON:" + e.message);
        return false;
    }
    //вопросов > 30
    if (tasks.length < 29) {
        throw new Error('Недостаточно вопросов!');
    }

    let i = 0;
    //Проверка файла на соответствие условиям           
    for (quest of tasks) {
        i++;
        let answers = quest.answers;
        if (answers.count < 3) {
            alert(`Недостаточно ответов в вопросе №${i}`);
            return false;
        }
    }
    return true;
}

//Запуск игры по клику по кнопке
function startGame() {
    bombDiv.hidden = false;
    startSettingsDiv.hidden = true;
    startGameButton.hidden = true;
    gameTime = document.getElementById('time').value;
    numberOfPlayers = document.getElementById('number').value;
    initPlayers(numberOfPlayers);

    errorsAllow = document.getElementById('allowErrors').value;

    gameStatusField.innerText = `${players[0].name}, приготовьтесь...`;
    startCountdown(4, startQueeze);
}

//задать вопрос
function startQueeze() {
    if (tasks.length == 0) {
        finish("win");
        return;
    }

    var player = players[getCurrentPlayerNumber()];
    gameStatusField.innerText += `Отвечает игрок ${player.name}`;

    const taskNumber = randomIntNumber(0, tasks.length - 1);
    printQuestion(tasks[taskNumber]);
    tasks.splice(taskNumber, 1);
    startCountdown(gameTime, wrongAnswer);
}

function clickAnswer() {
    let clickedButton = event.target;
    let text = clickedButton.innerText;
    if (text.includes("$")) {
        rightAnswer();
    } else {
        wrongAnswer();
    }
}

function wrongAnswer() {
    gameStatusField.innerText = 'Неправильно!';
    var playerNumber = getCurrentPlayerNumber();
    players[playerNumber].remainErrors--;

    if (players[playerNumber].remainErrors <= 0) {
        players.splice(playerNumber, 1);
        gameStatusField.innerText += ` Игрок ${players[playerNumber].name} выбывает!`;
    }
    if (players.length == 0) {
        finish("lose");
        return;
    }

    step++;
    startQueeze();
}

function rightAnswer() {
    gameStatusField.innerText = 'Правильно!';
    var playerNumber = getCurrentPlayerNumber();
    players[playerNumber].score++;
    startQueeze();
}

function printQuestion(task) {
    textFieldQuestion.innerText = task.question;
    gamesButtonsList.innerHTML = "";

    var shuffleQuestions = mixAnswers(task.answers);
    for (answer of shuffleQuestions) {
        let answerButton = createButton(answer);
        answerButton.addEventListener('click', clickAnswer);
        gamesButtonsList.appendChild(answerButton);
    }
}

function finish(type) {
    if (type == "win") {
        gameStatusField.innerText += "Ура! Вы победили! Баллы:";
        for (player of players) {
            gameStatusField.innerText += `${player.name}: ${player.score}, `;
        }
    } else {
        gameStatusField.innerText = "Ваша команда проиграла!";
    }
    startSettingsDiv.hidden = true;
    startGameButton.hidden = true;
    endGameButton.hidden = true;
    textFieldQuestion.innerText = "";
    gamesButtonsList.innerHTML = "";
}

function initPlayers(count) {
    for (var i = 0; i < count; i++) {
        var player = {
            name: `Игрок ${i}`,
            remainErrors: 3,
            remainSeconds: 30,
            score: 0
        };
        players.push(player)
    }
}