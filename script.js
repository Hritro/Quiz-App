const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: 1,
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: 2,
  },
  {
    question: "What is the smallest country in the world?",
    options: ["Vatican City", "Monaco", "Nauru", "Tuvalu"],
    answer: 1,
  },
  {
    question: "What is the highest mountain in the world?",
    options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"],
    answer: 3,
  },
  {
    question: "What is the largest ocean in the world?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    answer: 4,
  },
  {
    question: "What is the largest animal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    answer: 2,
  },
  {
    question: "What is the largest desert in the world?",
    options: ["Sahara", "Arabian Desert", "Gobi Desert", "Antarctic Desert"],
    answer: 4,
  },
  {
    question: "What is the largest river in the world?",
    options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
    answer: 2,
  },
  {
    question: "What is the largest island in the world?",
    options: ["Greenland", "Borneo", "Madagascar", "Java"],
    answer: 1,
  },
  {
    question: "What is the largest city in the world?",
    options: ["Tokyo", "Delhi", "Shanghai", "Sao Paulo"],
    answer: 1,
  }
];

const questionContainer = document.getElementById('question-container')
const nextButton = document.getElementById('next-button')
const totalQuestionElement = document.getElementById('total-question')
const currentQuestionElement = document.getElementById('current-question')
const progressBar = document.getElementById('progress-bar')
const answerSheet = document.getElementById('answer-sheet')
let currentQuestion = 0
let score = 0
let userAnswers = []

function loadQuestion(index){
    progressBar.style.width = `${((index+1)/quizData.length)*100}%`
    function handelAnswer(questionIndex, optionIndex){
      console.log('Question: ', questionIndex, 'Option: ', optionIndex)
    }
    questionContainer.innerHTML = `
    <div class="font-semibold text-xl">${index+1}. ${quizData[index].question}</div>
            <div class="mt-3 grid grid-cols-1 gap-3">
            <div id='1' class=" option flex items-center gap-2 border px-2 py-2 rounded-lg shadow-md">
                <div class="border w-6 h-6 flex justify-center items-center rounded-full text-sm">A</div>
                <span>${quizData[index].options[0]}</span>
            </div>
            <div id='2' class=" option flex items-center gap-2 border px-2 py-2 rounded-lg shadow-md">
                <div class="border w-6 h-6 flex justify-center items-center rounded-full text-sm">B</div>
                <span>${quizData[index].options[1]}</span>
            </div>
            <div id='3' class=" option flex items-center gap-2 border px-2 py-2 rounded-lg shadow-md">
                <div class="border w-6 h-6 flex justify-center items-center rounded-full text-sm">C</div>
                <span>${quizData[index].options[2]}</span>
            </div>
            <div id='4' class=" option flex items-center gap-2 border px-2 py-2 rounded-lg shadow-md">
                <div class="border w-6 h-6 flex justify-center items-center rounded-full text-sm">D</div>
                <span>${quizData[index].options[3]}</span>
            </div>
            </div>
    `
    const options = document.querySelectorAll(".option")
    options.forEach((Option) =>{
      Option.addEventListener('click', () =>{
        const selectedOption = parseInt(Option.id)
        userAnswers.push(selectedOption)
        Option.classList.add(
          'bg-gradient-to-r',
          'from-indigo-600', 
          'to-pink-500', 
          'text-white')
        if(selectedOption === quizData[index].answer){
          score++
        }
        setTimeout(()=> {
          handelQuestions()
        },500) 
      })
    })
   
} 
loadQuestion(currentQuestion)

totalQuestionElement.innerText = quizData.length
currentQuestionElement.innerText = currentQuestion+1


function handelQuestions(){
    currentQuestion++
    if(currentQuestion >= quizData.length){
        questionContainer.innerHTML = `
        <div class="flex justify-center">
          <div class="bg-gradient-to-r from-indigo-600 to-pink-500 rounded-xl p-3 w-20 h-20 flex justify-center items-center flex-col text-white">
            <div class="text-5xl">${score}</div>
            <div class="font-bold text-sm">You got</div>
          </div>
        </div>
        `
      // nextButton.style.display = "none" \
      console.log(userAnswers)
      answerSheet.innerHTML = quizData.map((question, index) => {
        return `
        <div class="border rounded-lg p-3 mb-3">
        <div class="font-bold">${index+1}. ${question.question}</div>
  
        <div class="space-y-2">
        ${ question.options.map((option, optionIndex) => {
          const optionNumber = optionIndex + 1
          let optionClass = ''
  
          if(userAnswers[index] === optionNumber) {
            optionClass = (optionNumber == question.answer) ? 'text-green-500 font-bold' : 'text-red-500 font-bold'
          } else if(optionNumber === question.answer) {
            optionClass = 'text-green-500 font-bold'
          }
  
          return `<div class="${optionClass}">
        ${String.fromCharCode(65+optionIndex)}. ${option}
          </div>
          
          `
  
        }).join('')
        }
        
        </div>
        
        </div>`
  
    }).join('')

    }else{
        loadQuestion(currentQuestion)
        currentQuestionElement.innerText = currentQuestion+1
    }
}
