//не знаю почему, но когда свойства объявлялись внутри объекта tikTakBoom - они превращались в undefined после вызова по таймеру
//если объявлять вне объекта то всё норм
tasks = [];
players = [];
gameTime = 40;
errorsAllow = 3;
currentPlayerNumber = 0;

var secondsToExplode = 0;
var timerIsPaused = false;
bombTimer = () => {
    if (secondsToExplode > 1) {
        if (!timerIsPaused) {
            secondsToExplode--;
            timerField.innerText = convertSecondsToTime(secondsToExplode);
        } 
        setTimeout(bombTimer, 1000);
    } else {
        finish("lose");
    }
};

prepareTimer = (seconds) => {
    if (seconds > 0) {
        timerIsPaused = true;
        gameStatusField.innerText += `${seconds}... `
        seconds--;
        setTimeout(prepareTimer, 1000, seconds);
    } else {
        timerIsPaused = false;
        startQueeze();
    }
}

gameStatusField = document.getElementById('gameStatusField');
startSettingsDiv = document.getElementById('startSettings');
startGameButton = document.getElementById('startgamediv');
bombDiv = document.getElementById('bombDiv');
timerField = document.getElementById('timerField');
textFieldQuestion = document.getElementById('questionField');
gamesButtonsList = document.getElementById('gameButtonsDiv');
endGameButton = document.getElementById('endgamediv');


window.onload = function () {
    bombDiv.hidden = true;
    endGameButton.hidden = true;
    init(tasksJson);
}

function init(_tasksJson) {
    if (readJSON(_tasksJson)) {
        startGameButton.addEventListener('click', startGame);
        endGameButton.addEventListener('click', finish, false);
    }
    else {
        alert("Ошибка при запуске игры");
    }
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
    secondsToExplode = document.getElementById('time').value;
    numberOfPlayers = document.getElementById('number').value;
    errorsAllow = document.getElementById('allowErrors').value;
    players = createPlayers(numberOfPlayers, errorsAllow);

    gameStatusField.innerText = `${players[currentPlayerNumber].name}, приготовьтесь...`;
    prepareTimer(3);
    bombTimer();
}

//задать вопрос
function startQueeze() {
    clearTimeout(prepareTimer);
    var player = players[currentPlayerNumber];
    gameStatusField.innerText = `Отвечает игрок ${player.name}`;

    const taskNumber = randomIntNumber(0, tasks.length - 1);
    printQuestion(tasks[taskNumber]);
    tasks.splice(taskNumber, 1);
    timerTime = player.remainSeconds;
}

function clickAnswer() {
    let clickedButton = event.target;
    let text = clickedButton.innerHTML;
    if (text.includes('<wbr>')) {
        clickedButton.className = "btn btn-success form-control text-center answer";
        rightAnswer();
    } else {
        clickedButton.className = "btn btn-danger form-control text-center answer";
        wrongAnswer();
    }
}

function wrongAnswer() {
    players[currentPlayerNumber].remainErrors--;
    gameStatusField.innerText = `Неправильно!`;
    if (players[currentPlayerNumber].remainErrors > 0) {
        currentPlayerNumber = currentPlayerNumber == (players.length - 1) ? 0 : currentPlayerNumber + 1;
    } else {
        gameStatusField.innerText += ` Игрок ${players[currentPlayerNumber].name} выбывает!`;
        players.splice(currentPlayerNumber, 1);
    }
    if (players.length == 0) {
        finish("lose");
        return;
    }

    gameStatusField.innerText += ` Переход хода к игроку  ${players[currentPlayerNumber].name} через `;
    prepareTimer(3);
}

function rightAnswer() {
    if (tasks.length == 0) {
        finish("win");
        return;
    }
    gameStatusField.innerText = 'Правильно! Следующий вопрос через ';
    var playerNumber = currentPlayerNumber;
    players[playerNumber].score++;
    secondsToExplode += 5;
    prepareTimer(3);
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
        gameStatusField.innerText = "Ура! Вы победили! ";
    } else {
        gameStatusField.innerText = "Ваша команда проиграла!";
    }
    for (player of players) {
        gameStatusField.innerText += `${player.name}: ${player.score}, `;
    }
    clearTimeout(bombTimer);
    startSettingsDiv.hidden = true;
    startGameButton.hidden = true;
    endGameButton.hidden = true;
    textFieldQuestion.innerText = "";
    gamesButtonsList.innerHTML = "";
}