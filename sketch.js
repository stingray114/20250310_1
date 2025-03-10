let radio;
let submitButton;
let resultP;
let questionP;
let table;
let currentQuestionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;

function preload() {
  table = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#feeafa");

  // 題目
  questionP = createP('');
  questionP.position(windowWidth / 2 - 100, windowHeight / 2 - 100);
  questionP.style('font-size', '30px');

  // 選項
  radio = createRadio();
  radio.position(windowWidth / 2 - 100, windowHeight / 2 - 30);
  radio.style('font-size', '30px');

  // 送出按鈕
  submitButton = createButton('送出');
  submitButton.position(windowWidth / 2 - 50, windowHeight / 2 + 20);
  submitButton.style('font-size', '30px');
  submitButton.mousePressed(checkAnswer);

  // 結果顯示
  resultP = createP('');
  resultP.position(windowWidth / 2 - 100, windowHeight / 2 + 50);
  resultP.style('font-size', '30px');

  loadQuestion();
}

function draw() {
  background("#ffd6ff");
  textSize(30);
  text('答對題數: ' + correctCount, 10, 30);
  text('答錯題數: ' + incorrectCount, 10, 70);  
  text("413730283陳虹羽", 10, 110);
}

function loadQuestion() {
  if (currentQuestionIndex < table.getRowCount()) {
    let row = table.getRow(currentQuestionIndex);
    questionP.html(row.get('question'));
    radio.elt.innerHTML = ''; // 清空選項
    radio.option(row.get('option1'));
    radio.option(row.get('option2'));
    radio.option(row.get('option3'));
    radio.option(row.get('option4'));
  } else {
    questionP.html('測驗結束');
    radio.hide();
    submitButton.hide();
    resultP.html(`答對題數: ${correctCount}, 答錯題數: ${incorrectCount}`);
  }
}

function checkAnswer() {
  let answer = radio.value();
  let correctAnswer = table.getString(currentQuestionIndex, 'answer');
  if (answer === correctAnswer) {
    correctCount++;
    resultP.style('color', "#0fa3b1");
    resultP.html('答對了！');
    setTimeout(() => {
      currentQuestionIndex++;
      loadQuestion();
    }, 1000); // 延遲1秒
  } else {
    incorrectCount++;
    resultP.style('color', "#f6bd60");
    resultP.html('答錯了。');
  }
}