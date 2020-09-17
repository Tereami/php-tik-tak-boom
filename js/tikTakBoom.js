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
        this.unparsedTasks = tasks;
        this.tasks = undefined;

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

    //Чтение и проверка JSON
    readJSON(){
        try{
            //Попытка чтения файла
            this.tasks = JSON.parse(tasks);  
            //вопросов > 30
            if (this.tasks.length < 29){
                throw new Error('Недостаточно вопросов!');
            }
            
            let i=0;
            //Проверка файла на соответствие условиям           
            for(quest of this.tasks){
                i++;
                //Проверка наличия всех папаметров объекта
                if(!quest.hasOwnProperty(`question`)){
                    throw new Error(`Не хватает впороса в вопросе №${i}`);
                }
                if(!quest.hasOwnProperty(`answer1`)){
                    throw new Error(`Не хватает ответа 1 в вопросе №${i}`);
                }
                if(!quest.hasOwnProperty(`answer2`)){
                    throw new Error(`Не хватает ответа 2 в вопросе №${i}`);
                }
                //Проверка наличия параеметров в ответах
                let qAnswer1 = quest.answer1;
                let qAnswer2 = quest.answer2;           
                if(!qAnswer1.hasOwnProperty(`result`)){
                    throw new Error(`Не хватает верности ответа в ответе №1 в вопросе №${i}`);
                }
                if(!qAnswer1.hasOwnProperty(`value`)){
                    throw new Error(`Не хватает значения результата в ответе №1 в вопросе №${i}`);
                }
                if(!qAnswer2.hasOwnProperty(`result`)){
                    throw new Error(`Не хватает верности ответа в ответе №2 в вопросе №${i}`);
                }
                if(!qAnswer2.hasOwnProperty(`value`)){
                    throw new Error(`Не хватает значения результата в ответе №2 в вопросе №${i}`);
                }

                //В каждом вопросе есть текст
                if(quest.question.length===0){ throw new Error(`Отсутствует тест вопроса в вопросе №${i}!`);}
                //во всех ответах заполнены данные
                if(typeof(qAnswer1.result) !== `boolean`){ throw new Error(`Верность ответа ответа №1 в вопросе №${i} не bool!`);}
                if(typeof(qAnswer2.result) !== `boolean`){ throw new Error(`Верность ответа ответа №2 в вопросе №${i} не bool!`);}
                if(qAnswer1.value.length===0){ throw new Error(`Отсутствует результат ответа №1 в вопросе №${i}!`);}                 
                if(qAnswer2.value.length===0){ throw new Error(`Отсутствует результат ответа №2 в вопросе №${i}!`);}  
                //нет вопроса с двумя правильными и неправильными ответами
                if(qAnswer1.result === qAnswer2.result) { throw new Error(`Ответы совпадают в вопросе №${i}!`);}
            }

            return true;   
        } catch(e) {
            alert("Игру невозможно начать:" +e.message);           
            return false;
        }
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
        //this.playerNum.style.display = "none";  
        //this.startGameDiv.style.display = "none";   
    },

    run() {
        if (this.readJSON()){
            this.hideGameControls();     
            this.startGameDiv.addEventListener('click', startGame = () => this.startTimer());               
        }
        else {
            this.startGameDiv.style.display = "none";   
            this.playerNum.style.display = "none";
        };        
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
        }
        if (result === 'won') {
            this.gameStatusField.innerText = `Вы выиграли!`;
        }

        this.boomTimer = 30;
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
