var correctAnswers = 0;
var incorrectAnswers = 0;
var unansweredQuestions = 0;
var time = 10;
var timerInterval = '';

var mygameContent = $('#game-content');
var watchContent = $('#stopwatch');



var myQuestions = [
    {
        q: 'My twin lives at the reverse of my house number. The difference between our house numbers ends in two. What are the lowest possible numbers of our house?',
        answer: '19',
        answerBox: ['19', '16', '20', '17']
    },
    {
        q: 'What is the smallest whole number that is equal to seven times the sum of its digits?',
        answer: '21',
        answerBox: ['10', '15', '22', '21'],
    },
    {
        q: 'What is the smallest number that increases by 12 when it is flipped and turned upside down?',
        answer: '86',
        answerBox: ['72', '88', '86', '26'],
    },
    {
        q: ' If 1/2 of 5 is 3, then what is 1/3 of 10?',
        answer: '4',
        answerBox: ['5', '4', '2', '3'],
    },
    {
        q: 'Mr. Smith has two children. If the older child is a boy, what are the odds that the other child is also a boy?',
        answer: '50%',
        answerBox: ['45%', '30%', '50%', '25%'],
    }
]

var indexQandA = 0;
////event listeners///
$(document).on('click', '#btn-start', function () {
    function questionandAnswer(indexQandA) {
        $('#game-content').empty();
        goTime();
        time = 100;








        if (indexQandA < myQuestions.length) {
            var h1 = $('<h1>');
            h1.text(myQuestions[indexQandA].q);
            $('#game-content').append(h1);
            for (var i = 0; i < myQuestions[indexQandA].answerBox.length; i++) {
                var button = $('<button>');
                button.text(myQuestions[indexQandA].answerBox[i]);
                button.addClass('btn-success');
                button.attr('data-indexNumber', [i])
                button.attr('data-value', myQuestions[indexQandA].answerBox[i]);
                button.attr(myQuestions[indexQandA].answer);
                $('#game-content').append(button);
                console.log(button);

            }
        } else {
            stop()
            incorrectAnswers++;
            correctAnswers++;
            endscreen();



        }
    }

    questionandAnswer(indexQandA)



    function goTime() {
        var myTime = setInterval(timer, 1000)

    }


    function timer() {

        watchContent.html('Seconds Left:' + time);
        time--;
        if (time === 0) {
            stop();
            alert('Ran out of time!!!')
            time = 10;
            incorrectAnswers++;
            indexQandA++;
            questionandAnswer(indexQandA);

        }




    }




    function endscreen() {
        watchContent.html('')
        stop();
        var overGame = $('<h2>');
        overGame.addClass('game-Over');
        var incorrect = $('<h4>');
        var correct = $('<h4>');
        var reStart = $('<button>');
        overGame.text('GAME OVER');
        reStart.text('RESTART');
        reStart.addClass('btn-danger');
        incorrect.text('Incorrect Answers:' + incorrectAnswers);
        correct.text('Correct Answers:' + correctAnswers);
        mygameContent.append(overGame, incorrect,
            correct, reStart);

    };


    $(document).on('click', '.btn-danger', function () {
        indexQandA = 0;
        correctAnswers = 0;
        incorrectAnswers = 0;
        questionandAnswer(indexQandA);

    });


    function stop() {
        clearInterval(myTime)
    }

    $(document).on('click', '.btn-success', function () {
        event.preventDefault();


        if (indexQandA === myQuestions.length) {
            return;
        }
        var answer = myQuestions[indexQandA].answer;
        var answerValue = $(this).attr('data-value');
        var i = $(this).attr('data-indexNumber');
        var rightAnswer = myQuestions[i].answer;
        if (answerValue === rightAnswer) {
            alert('Correct Answer!')
            correctAnswers++;
            indexQandA++;
            questionandAnswer(indexQandA);
        }
        else {
            alert('Wrong Answer!');
            incorrectAnswers++;
            indexQandA++;
            questionandAnswer(indexQandA);
        }
    });

});




