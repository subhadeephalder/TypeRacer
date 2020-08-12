const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement=document.getElementById('quoteDisplay')
const quoteInputElement=document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const speedValue = document.getElementById('wpm')
let count=0;
let finish=false;
quoteInputElement.addEventListener('input',()=>{
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    let correct = true
    arrayQuote.forEach((characterSpan, index) => {
      const character = arrayValue[index]
      if (character == null) {
        characterSpan.classList.remove('correct')
        characterSpan.classList.remove('incorrect')
        correct = false
      } else if (character === characterSpan.innerText) {
        count=index+1
        if(count===arrayQuote.length){finish=true;}
        characterSpan.classList.add('correct')
        characterSpan.classList.remove('incorrect')
      } else {
        characterSpan.classList.remove('correct')
        characterSpan.classList.add('incorrect')
        correct = false
      }
})
})

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
      .then(response => response.json())
      .then(data => data.content)
  }
  function nextQuote(){
     RenderNewQuote() 
}
  async function RenderNewQuote(){
      const quote=await getRandomQuote()
      quoteDisplayElement.innerHTML='';
      count=0
      finish=false
      quote.split("").forEach(character => {
          const characterSpan=document.createElement('span')
          characterSpan.innerHTML=character
          quoteDisplayElement.appendChild(characterSpan)

      });
      quoteInputElement.value=null
      startTimer()
  }
let startTime
function startTimer() {
  let temp;
  timerElement.innerText = 0
  speedValue.innerText=0
  startTime = new Date()
  setInterval(() => {
    timerElement.innerText = getTimerTime()
    if(finish===false){
    temp=Math.floor((count*12)/getTimerTime())
    }
    speedValue.innerText = temp
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}
 RenderNewQuote()