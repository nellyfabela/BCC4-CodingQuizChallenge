// Pending to add the timer in the right side
// Pending to add that every time the answer is false then the timer gets minus 10 seconds

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

//Need to start the function of the quiz
function startQuiz() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart Quiz'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

//Creating the questions that need to be answered
const questions = [
  {
    question: 'JavaScript is a ___ -side programming language.',
    answers: [
      { text: 'true', correct: true },
      { text: 'false', correct: false }
    ]
  },
  {
    question: 'How do you find the minimum of x and y using JavaScript?',
    answers: [
      { text: 'min(x,y);', correct: false },
      { text: 'Math.min(xy)', correct: false },
      { text: 'min(xy);', correct: false },
      { text: 'Math.min(x,y)', correct: true }
    ]
  },
  {
    question: 'Which of the following will write the message “Hello DataFlair!” in an alert box??',
    answers: [
      { text: 'alertBox(“Hello DataFlair!”);', correct: false },
      { text: 'alert(“Hello DataFlair!”);', correct: true },
      { text: 'alert(Hello DataFlair!);', correct: false },
      { text: 'msgAlert(“Hello DataFlair!”);', correct: false }
    ]
  },
  
]