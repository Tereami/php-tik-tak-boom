tikTakBoom = {
    init(
        tasks,
        timerField,
        gameStatusField,
        textFieldQuestion,
        textFieldAnswer1,
        textFieldAnswer2,
        startGamediv,
        endGamediv,
        playernum        
    ) {
        this.boomTimer = 30;
        this.countOfPlayers = 2;
        this.tasks = JSON.parse(tasks);

        this.timerField = timerField;
        this.gameStatusField = gameStatusField;
        this.textFieldQuestion = textFieldQuestion;
        this.textFieldAnswer1 = textFieldAnswer1;
        this.textFieldAnswer2 = textFieldAnswer2;
        this.startGameDiv = startGamediv;      
        this.endGameDiv = endGamediv;
        this.playerNum = playernum;

        this.needRightAnswers = 3;
    },

    hideGameControls(){
        this.endGameDiv.style.display = "none"; 
        this.textFieldAnswer1.style.display = "none";
        this.textFieldAnswer2.style.display = "none";
        this.playerNum.style.display = "block";   
        this.startGameDiv.style.display = "block";   
    },
 
    showGameControls(){
        this.endGameDiv.style.display = "block"; 
        this.textFieldAnswer1.style.display = "block";
        this.textFieldAnswer2.style.display = "block";
    //    this.playerNum.style.display = "none";  
        //this.startGameDiv.style.display = "none";   
    },

    run() {
        this.hideGameControls();     
        this.startGameDiv.addEventListener('click', startGame = () => this.startTimer());
    },
  
    //Время подготовки игрока
    startTimer(){
        let timeToPlay = 3;
        this.timerField.innerText = `3`;
        this.gameStatusField.innerText = `Игра начнётся через`;
        let self = this;
        const startTimer = setInterval(function(){timeToPlay--;this.timerField.innerText = `${timeToPlay}`;},1000);
        setTimeout(function(){clearInterval(startTimer);self.startQueeze();},4000);
        this.startGameDiv.style.display = "none";   
        this.playerNum.style.display = "none";
    },

    startQueeze(){
        this.state = 1;
        this.rightAnswers = 0;
        this.gameStatusField.innerText = `Игра идёт`;
        this.showGameControls();  
        this.endGameDiv.addEventListener('click', endGame = () => this.finish(`lose`));
        this.turnOn();
        this.timer();        
    },

    turnOn() {
        this.gameStatusField.innerText += ` Вопрос игроку №${this.state}`;

        const taskNumber = randomIntNumber(this.tasks.length - 1);
        this.printQuestion(this.tasks[taskNumber]);

        this.tasks.splice(taskNumber, 1);

        this.state = (this.state === this.countOfPlayers) ? 1 : this.state + 1;
    },

    turnOff(value) {
        if (this.currentTask[value].result) {
            this.gameStatusField.innerText = 'Верно!';
            this.rightAnswers += 1;
        } else {
            this.gameStatusField.innerText = 'Неверно!';
        }
        if (this.rightAnswers < this.needRightAnswers) {
            if (this.tasks.length === 0) {
                this.finish('lose');
            } else {
                this.turnOn();
            }
        } else {
            this.finish('won');
        }

        this.textFieldAnswer1.removeEventListener('click', answer1);
        this.textFieldAnswer2.removeEventListener('click', answer2);        
    },

    printQuestion(task) {
        this.textFieldQuestion.innerText = task.question;
        this.textFieldAnswer1.innerText = task.answer1.value;
        this.textFieldAnswer2.innerText = task.answer2.value;

        this.textFieldAnswer1.addEventListener('click', answer1 = () => this.turnOff('answer1'));
        this.textFieldAnswer2.addEventListener('click', answer2 = () => this.turnOff('answer2'));

        this.currentTask = task;
    },

    finish(result = 'lose') {
        this.state = 0;
        if (result === 'lose') {
            this.gameStatusField.innerText = `Вы проиграли!`;
            this.boomTimer = 30;
        }
        if (result === 'won') {
            this.gameStatusField.innerText = `Вы выиграли!`;
        }

        this.textFieldQuestion.innerText = ``;
        this.textFieldAnswer1.innerText = ``;
        this.textFieldAnswer2.innerText = ``;
        this.hideGameControls();  

        console.log(this);
    },

    timer() {
        if (this.state) {
            this.boomTimer -= 1;
            let sec = this.boomTimer % 60;
            let min = (this.boomTimer - sec) / 60;
            sec = (sec >= 10) ? sec : '0' + sec;
            min = (min >= 10) ? min : '0' + min;
            this.timerField.innerText = `${min}:${sec}`;

            if (this.boomTimer > 0) {
                setTimeout(
                    () => {
                        this.timer()
                    },
                    1000,
                )
            } else {
                this.finish('lose');
            }
        }
    },
}
