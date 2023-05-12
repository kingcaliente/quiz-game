const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'In which game did Mario first get to ride on his lovable pal Yoshi?',
        choice1: 'Super Mario Bros',
        choice2: 'Super Mario World',
        choice3: 'Super Mario Bros 3',
        choice4: 'Super Mario 64',
        answer: 2,
    },
    {
        question: 'What insect transformation can Mario power-up with in the Super Mario Galaxy game?',
        choice1: 'Stink Bug',
        choice2: 'Bee',
        choice3: 'Ant',
        choice4: 'Ladybug',
        answer: 2,
    },
    {
        question: 'Which one of these is NOT one of Mario’s Power-ups?',
        choice1: 'Super Star',
        choice2: '1up Mushroom',
        choice3: 'Fire Flower',
        choice4: 'Pizza Gun',
        answer: 4,
    },
    {
        question: 'Luigi is Mario’s…?',
        choice1: 'Boss',
        choice2: 'Brother',
        choice3: 'Cousin',
        choice4: 'Dad',
        answer: 2,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
    startTimer()
} 

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore' , score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`


   const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
   currentQuestion = availableQuestions[questionsIndex]
   question.innerText = currentQuestion.question

   choices.forEach(choice => {
   const number = choice.dataset['number']
   choice.innerText = currentQuestion['choice' + number]
})


availableQuestions.splice(questionsIndex, 1)

acceptingAnswers = true

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
        
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout (() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})


incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
 