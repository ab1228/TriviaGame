var mygameContent = $('#game-content');
var stopWatch = $('#stop-watch')
var time = 30;


var myQuestions = [

    {
        question: 'My twin lives at the reverse of my house number. The difference between our house numbers ends in two. What are the lowest possible numbers of our house?',
        answer: '19',
        answerBox: ['19', '16', '20', '17']
    },
    {
        question: 'What is the smallest whole number that is equal to seven times the sum of its digits?',
        answer: '21',
        answerBox: ['10', '15', '22', '21'],
    },
    {
        question: 'What is the smallest number that increases by 12 when it is flipped and turned upside down?',
        answer: '86',
        answerBox: ['72', '88', '86', '26'],
    },
    {
        question: ' If 1/2 of 5 is 3, then what is 1/3 of 10?',
        answer: '4',
        answerBox: ['5', '4', '2', '3'],
    },
    {
        question: 'Mr. Smith has two children. If the older child is a boy, what are the odds that the other child is also a boy?',
        answer: '50%',
        answerBox: ['45%', '30%', '50%', '25%'],
    }
]

game = {
    stopWatch: stopWatch,
    myQuestions: myQuestions,
    timeCounter: time,
    incorrect: 0,
    correct: 0,
    unAnswered: 0,
    index: 0,


    countdown: function () {
        game.timeCounter--;
        stopWatch.text('Seconds Left:' + game.timeCounter);
        if (game.timeCounter === 0) {
            console.log("TIME UP");
            game.timeDone();


        }
    },

    timeDone: function () {

        clearInterval(timer);
        game.unAnswered++;

        mygameContent.html('<h3>OUT OF TIME!!!</h3>')
        mygameContent.append('<h4>The correct answer is : </h4>' + myQuestions[this.index].answer)

        if (game.index === myQuestions.length - 1) {
            setTimeout(game.endScreen, 3 * 1000);
        }
        else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }



    },



    start: function () {
        timer = setInterval(game.countdown, 1000)

        $('#game-content').empty();
        mygameContent.html("<h6>" + myQuestions[this.index].question + "</h6>")


        for (var i = 0; i < myQuestions[this.index].answerBox.length; i++) {
            var button = $('<button>');
            button.text(myQuestions[this.index].answerBox[i]);
            button.addClass('btn-light');
            button.attr('data-indexNumber', [i]);
            button.attr('data-value', myQuestions[this.index].answerBox[i]);
            $('#game-content').append(button);
            console.log(button);

        }
    },

    nextQuestion: function () {

        game.timeCounter = time;
        stopWatch.text('Seconds Left:' + game.timeCounter);
        game.index++;
        game.start();



    },

    userAnswer: function () {


        if (game.index === myQuestions.length) {
            return;


        }
        var answer = myQuestions[game.index].answer;
        var answerValue = $(this).attr('data-value');
        if (answerValue === answer) {
            game.correctAnswer();
        } else {
            game.wrongAnswer();
        }
        console.log(answer)
        console.log(answerValue)

    },

    correctAnswer: function () {
        clearInterval(timer);

        game.correct++;

        mygameContent.html("<h2>Correct!</h2>");

        if (game.index === myQuestions.length - 1) {
            setTimeout(game.endScreen, 3 * 1000);
        }
        else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

    wrongAnswer: function () {
        clearInterval(timer);

        game.incorrect++;
        mygameContent.html("<h2>Wrong Answer!</h2>");
        mygameContent.append('<h4>The correct answer is : </h4>' + myQuestions[this.index].answer)

        if (game.index === myQuestions.length - 1) {
            setTimeout(game.endScreen, 3 * 1000);
        }
        else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },


    endScreen: function () {
        clearInterval(timer);
        stopWatch.html('');
        mygameContent.html('');
        var overGame = $('<h2>');
        overGame.addClass('game-Over');
        var incorrect = $('<h4>');
        var correct = $('<h4>');
        var unAnswered = $('<h4>')
        var reStart = $('<button>');
        overGame.text('GAME OVER');
        reStart.text('RESTART');
        reStart.addClass('btn-danger');
        incorrect.text('Incorrect Answers:' + game.incorrect);
        correct.text('Correct Answers:' + game.correct);
        unAnswered.text('Unanswered Questions:' + game.unAnswered);
        mygameContent.append(overGame, incorrect,
            correct, unAnswered, reStart);
    },

    reStart: function () {
        this.index = 0;
        this.timeCounter = time;
        this.correct = 0;
        this.incorrect = 0;
        this.start();


    }







}

$(document).on('click', '.btn-danger', function () {
    game.reStart();
})

$(document).on("click", '#btn-start', function () {
    stopWatch.text('Seconds Left:' + time);
    game.start();
});

$(document).on('click', '.btn-light', game.userAnswer);



