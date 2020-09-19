const randomIntNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function mixAnswers(answers) {
    let result = [];

    //добавлю символ к первому (правильному) ответу, чтобы для наглядности, потом его идентифицировать
    //пока $ для наглядности, потом поменяю на какой-нибудь невидимый символ или добавлю в свойства кнопки
    answers[0] = "$" + answers[0];
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
    newDiv.innerText = answer;
    return newDiv;
}

function convertSecondsToTime(seconds) {
    let minutes = seconds - seconds % 60;
    let sec = seconds - minutes;
    let minutesText = minutes < 10 ? "0" + minutes : minutes;
    let secsText = sec < 10 ? "0" + sec : sec;
    let result = `${minutesText}:${secsText}`;
    return result;
}

