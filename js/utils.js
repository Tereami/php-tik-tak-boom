const randomIntNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


function createPlayers(count, errorsAllow) {
    var pl = [];
    for (var i = 0; i < count; i++) {
        var player = {
            name: `Игрок ${i}`,
            remainErrors: errorsAllow,
            score: 0
        };
        pl.push(player)
    }
    return pl;
}

function mixAnswers(answers) {
    let result = [];
    //добавлю невидимый символ к первому (правильному) ответу, чтобы потом его идентифицировать
    answers[0] = '<wbr>' + answers[0];
    while (answers.length > 0) {
        let k = randomIntNumber(0, answers.length - 1);
        result.push(answers[k]);
        answers.splice(k, 1);
    }
    return result;
}


function createButton(answer) {
    var newDiv = document.createElement('div');
    newDiv.className = "btn btn-primary form-control text-center answer";
    newDiv.innerHTML = answer;
    return newDiv;
}

function convertSecondsToTime(seconds) {
    let minutes = seconds - seconds % 60;
    let sec = seconds - minutes;
    let minutesText = minutes < 10 ? "0" + minutes : minutes;
    let secsText = sec < 10 ? "0" + sec : sec;
    let separator = sec % 2 == 0 ? ":" : " ";
    let result = `${minutesText}${separator}${secsText}`;
    return result;
}

