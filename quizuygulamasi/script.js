const soruVerisi = [
  {
    soru: "2021'de en çok kullanılan programlama dili nedir?",
    a: "JavaScript",
    b: "Kotlin",
    c: "C#",
    d: "Python",
    correct: "a",
  },
  {
    soru: "JavaScript hangi kod blokları arasına yazılır?",
    a: "javascript",
    b: "<scripting>",
    c: "<js>",
    d: "script",
    correct: "d",
  },
  {
    soru: "Hello World mesajı Mesajbox’da nasıl görüntülenir?",
    a: "msg(“Hello World”);  ",
    b: "msgBox(“Hello World”);",
    c: "alert(“Hello World”);",
    d: "alertBox(“Hello World”);",
    correct: "c",
  },
  {
    soru: "Aşağıdakilerden hangisi 'while' döngüsünün doğru ifadesidir?",
    a: "while i = 1 to 10",
    b: "while (i <= 10; i++)",
    c: "while (i <= 10)",
    d: "while i =< 1 to 10",
    correct: "c",
  },
  {
    soru: "JavaScripti kim icat etmiştir?",
    a: "Brendan Eich",
    b: "Thomas Java",
    c: "James Gosling",
    d: "Linus Helsinki",
    correct: "a",
  },
  {
    soru: "JavaScript ne zaman yayınlanmıştır?",
    a: " 1997",
    b: " 1987",
    c: " 1995",
    d: " 2000",
    correct: "c",
  },
];

const quiz = document.querySelector("#quiz"),
  questionElement = document.querySelector("#question"),
  cevaplarElements = document.querySelectorAll(".cevap"),
  a_text = document.querySelector("#a_text"),
  b_text = document.querySelector("#b_text"),
  c_text = document.querySelector("#c_text"),
  submitBtn = document.querySelector("#submit");
d_text = document.querySelector("#d_text");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deSelectAnswers();
  const currentQuizData = soruVerisi[currentQuiz];

  questionElement.innerText = currentQuizData.soru;

  a_text.innerHTML = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function getSelected() {
  let cevap = undefined;

  cevaplarElements.forEach((cevaplar) => {
    //console.log(cevap.checked);
    if (cevaplar.checked) {
      cevap = cevaplar.id;
    }
  });
  return cevap;
}

function deSelectAnswers() {
  cevaplarElements.forEach((cevaplar) => {
    //console.log(cevap.checked);
    cevaplar.checked = false;
  });
}

submitBtn.addEventListener("click", () => {
  console.log(score);
  const cevap = getSelected();
  console.log(cevap);
  if (cevap == undefined) {
    alert("Bir sonraki soruya geçmek için cevap vermelisiniz.");
  } else {
    if (cevap) {
      if (cevap === soruVerisi[currentQuiz].correct) {
        score++;
      }
      currentQuiz++;
      if (currentQuiz < soruVerisi.length) {
        loadQuiz();
      } else {
        if (score == soruVerisi.length) {
          quiz.innerHTML = `<h2>Tebrikler! ${soruVerisi.length} sorudan hepsini doğru yanıtladınız.</h2>
          <button onclick="location.reload()">Başa Dön</button> `;
        } else if (score == 0) {
          quiz.innerHTML = `<h2>Üzgünüm hiçbir soruya doğru yanıt veremediniz.</h2> 
          <button onclick="location.reload()">Başa Dön</button>`;
        } else {
          quiz.innerHTML = `<h2>${soruVerisi.length} sorudan ${score} tanesini doğru yanıtladınız.</h2> 
          <button onclick="location.reload()">Başa Dön</button>`;
        }
      }
    }
  }
});
