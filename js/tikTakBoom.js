tikTakBoom = {
    init(
        tasks,
        timerField,
        gameStatusField,
        textFieldQuestion,
        textFieldAnswer1,
        textFieldAnswer2,
        textFieldAnswer3,
        textFieldAnswer4,
        textFieldAnswer5,
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
        this.textFieldAnswer3 = textFieldAnswer3;
        this.textFieldAnswer4 = textFieldAnswer4;
        this.textFieldAnswer5 = textFieldAnswer5;
        this.startGameDiv = startGamediv;      
        this.endGameDiv = endGamediv;
        this.playerNum = playernum;

        this.needRightAnswers = 3;
    },

    hideGameControls(){
        this.endGameDiv.style.display = "none"; 
        this.textFieldAnswer1.style.display = "none";
        this.textFieldAnswer2.style.display = "none";
        this.textFieldAnswer3.style.display = "none";
        this.textFieldAnswer4.style.display = "none";
        this.textFieldAnswer5.style.display = "none";
        this.playerNum.style.display = "block";   
        this.startGameDiv.style.display = "block";   
    },
 
    showGameControls(){
        this.endGameDiv.style.display = "block"; 
        this.textFieldAnswer1.style.display = "block";
        this.textFieldAnswer2.style.display = "block";
        this.textFieldAnswer3.style.display = "block";
        this.textFieldAnswer4.style.display = "block";
        this.textFieldAnswer5.style.display = "block";
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
        if (value) {
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

        this.textFieldAnswer1.removeEventListener('click',Boolean);
        this.textFieldAnswer2.removeEventListener('click',Boolean); 
        this.textFieldAnswer3.removeEventListener('click',Boolean);
        this.textFieldAnswer4.removeEventListener('click',Boolean); 
        this.textFieldAnswer5.removeEventListener('click',Boolean);     
    },

    printQuestion(task) {
        this.textFieldQuestion.innerText = task.question;

        const map = getAnswersMap(task);
        const answers = getAnswers(task);
        const answersCount = answers.length;
        
        this.textFieldAnswer1.innerText = answers[0];
        this.textFieldAnswer2.innerText = answers[1];
        
        this.textFieldAnswer1.addEventListener('click', answer1 = () => this.turnOff(map.get(answers[0])));
        this.textFieldAnswer2.addEventListener('click', answer2 = () => this.turnOff(map.get(answers[1])));        

        switch(answersCount)
        {
            case 2:
                this.textFieldAnswer3.style.display = "none";
                this.textFieldAnswer4.style.display = "none";
                this.textFieldAnswer5.style.display = "none";
                break;            
            case 3:
                this.textFieldAnswer3.innerText = answers[2];
                this.textFieldAnswer3.addEventListener('click', answer3 = () => this.turnOff(map.get(answers[2])));
                this.textFieldAnswer3.style.display = "block";
                this.textFieldAnswer4.style.display = "none";
                this.textFieldAnswer5.style.display = "none";
                break
            case 4:
                this.textFieldAnswer3.innerText = answers[2];
                this.textFieldAnswer4.innerText = answers[3];
                this.textFieldAnswer3.addEventListener('click', answer3 = () => this.turnOff(map.get(answers[2])));
                this.textFieldAnswer4.addEventListener('click', answer4 = () => this.turnOff(map.get(answers[3])));
                this.textFieldAnswer3.style.display = "block";
                this.textFieldAnswer4.style.display = "block";
                this.textFieldAnswer5.style.display = "none";
                break;
            case 5:
                this.textFieldAnswer3.innerText = answers[2];
                this.textFieldAnswer4.innerText =answers[3];
                this.textFieldAnswer5.innerText = answers[4];
                this.textFieldAnswer3.addEventListener('click', answer3 = () => this.turnOff(map.get(answers[2])));
                this.textFieldAnswer4.addEventListener('click', answer4 = () => this.turnOff(map.get(answers[3])));
                this.textFieldAnswer5.addEventListener('click', answer5 = () => this.turnOff(map.get(answers[4])));
                this.textFieldAnswer3.style.display = "block";
                this.textFieldAnswer4.style.display = "block";
                this.textFieldAnswer5.style.display = "block";
                break;
            default:
                break;
        }  
        this.currentTask = task;
    },

    finish(result = 'lose') {
        this.state = 0;
        if (result === 'lose') {
            this.gameStatusField.innerText = `Вы проиграли!`;
        }
        if (result === 'won') {
            this.gameStatusField.innerText = `Вы выиграли!`;
        }

        this.boomTimer = 30;
        this.textFieldQuestion.innerText = ``;
        this.textFieldAnswer1.innerText = ``;
        this.textFieldAnswer2.innerText = ``;
        this.textFieldAnswer3.innerText = ``;
        this.textFieldAnswer4.innerText = ``;
        this.textFieldAnswer5.innerText = ``;
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
