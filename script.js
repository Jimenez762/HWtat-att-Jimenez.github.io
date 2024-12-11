    let timerInterval;
    let time = 720; // 12 minutes in seconds
    let scores = Array(17).fill(0);
    let selectedGenerator = '';
    let currentQuestionIndex = 0;

    const teacherQuestions = [
      'Как получить донат кейс?, ему ответил игрок Пропиши /suicide 2 раза, новый промокод от Нефора | /mute 5h 2.7',
      'Игрок на лайт анархии написал (Жди докс, еблан) | /muteip 2.15',
      'Во время сделки один из участников сбелки пытается её сорвать | /ban 10d 1.8',
      'Игрок пишет в чат (Напиши, Админу в лс, что он долбаеб, тебе ничего не будет) | ban 7d 2.6',
      'Игрок написал в чат (сын тотема) | mute 7h 3.6',
      'Игрок написал в чат (Я ваш личный казино-бот, отправляйте мне монеты, я напишу вам, вы вайграли или нет, баланс бота на данный момент:93 000 000 монет) | 3.14, 1 нарушение mute 8h, 2-е нарушение ban 3d, 3-е ban навсегда',
      'Игрок написал в чат (Кто сейчас может на замок тепнуть? Напишите 1 в чат, я к вам тепнусь) | mute 3h 3.7',
      'Игрок написал в чат (Все заходите на ФТ, там сейчас вайп) | ban 14d 3.1',
      'Игрок на классике написал (Продам дюп шлатков, писать в дс) | ban 14d 2.13',
      'Игрок замутил своего лучшего тимейта по причине (Osk rodni) и не предоставил доказательства в архив на мут | ban 7d 4.1',
      'Игрок забанил другого игрока по причине 2.4 и сразу предоставил доказательства на бан в архив | ban 7d 4.2',
      'Игрок написал в чат (Я Админ) | ban 14d 2.1',
      'Игрок с ником "AdolfGiller" был забанен за 1.5 навсегда, зашел с твинка с ником "SashaJuce123" и продолжил играть. | Нарушений нету',
      'Игрок предлагает обмен 500 рубинов за 1kk? | 6.1 При первом нарушении 5d, 2-е навсегда',
      'Во время проверки через дюпайпи вы увидели забаненый аккаунт за 2.4 | 2.9, наказание x2 по ip (banip 2.9 60d) 1. /chekban 2. Скриншот его активности',
      'Игрок написал другому игроку (Я тебя забаню сейчас, не мешай строить фармилку) | mute 5h 3.10',
      'Игрок написал в /broadcast (Valera, ты вообще тупой) | ban 2d 4.3'
    ];

    const attestationQuestions = [
      'Игрок спросил в чате, Когда вайп?, ему ответили Вайп будет завтра. Но при этом информации на официальных источниках нету | mute 5h 2.7',
      'Игрок на классической анархии написал Жди докс, еблан | /banip 2.15 (В лобби сервера)',
      'Во время сделки один из игроков отказывается скидывать чек покупки | ban 10d 1.8',
      'Игрок написал в чат " Если вы ходите получить от меня дк?! для этого просто скажите что модер уебан!| ban 7d 2.6',
      'Игрок написал в чат (Ну ты и сынище еблана с софтом) | mute 7h 3.6',
      'Игрок написал в чат (Я ваш личный казино-бот, отправляйте мне монеты, я напишу вам, вы вайграли или нет, баланс бота на данный момент:93 000 000 монет) | 3.14, 1 нарушение mute 8h, 2-е нарушение ban 3d, 3-е ban навсегда',
      'Игрок написал в чат (Кто поможет мне развиться, напишите (SOSO) в чат) | mute 3h 3.7',
      'Игрок написал в чат (Заходите на Спуки Тайм) Там сейчас вайп! | ban 14d 3.1',
      'Игрок на лайте написал в чат (Продам дюп на железо, писать в дс) | ban 3d 2.13',
      'Игрок Замутил своего тимейта по причине 3.7 и отправил доказательства в архив через 18 минут | ban 7d 4.1',
      'Игрок замутил своего тимейта по причине (TEST) | ban 7d 4.2?',
      'Игрок пишет в чат скидывай анидеск, проверим тебя на читы | mute 3d 2.1',
      'Ты увидел в чате игрока с ником (HW_GOVNO) | выдать /warn 2h, потом /ban 1.5',
      'Игрок написал в чат (Кто купит дк или рубины за ресы + монеты, писать в дс) | 6.1 При первом нарушении ban 5d, 2-е навсегда',
      'Игрок с ником (CAMAPA) получил Mut на 3 дня по пункту 2.1, после чего зашёл с твинка (CAMAPA111) и дальше продолжает играть | 2.9, наказание x2 по ip (banip 2.9 60d) 1. /duepip, 2. /checkban HapyKot 3. Скриншот того, что обходит',
      'Игрок написал в чат (Хохол иди работай) | mute 9h 3.9',
      'Игрок используя /broadcast написал (СЕЙЧАС БУДЕТ ЖЁСТКАЯ РАЗДАЧА НА СПАВНЕ) (Уточните, что капсом!) | ban 2d 4.3'
    ];
	
    const particlesConfig = {
      particles: {
        number: {
          value: 50
        },
        size: {
          value: 3
        },
        move: {
          direction: "none",
          speed: 1
        }
      }
    };

    particlesJS("particles-js", particlesConfig);
	
    function selectGenerator(generator) {
      selectedGenerator = generator;
      document.getElementById('generator-selection').style.display = 'none';
      document.getElementById('name-input-section').style.display = 'block';
    }

function startQuestions() {
  const traineeName = document.getElementById('traineeName').value;
  const teacherName = document.getElementById('teacherName').value; // Get teacher's name
  const attesterName = document.getElementById('attesterName').value; // Get attester's name

  if (traineeName) {
    // Hide name input section and show questions section
    document.getElementById('name-input-section').style.display = 'none';
    document.getElementById('questions-section').style.display = 'block';

    // Update trainee name in the results section
    document.getElementById('result-trainee').textContent = traineeName;

    // Update teacher and attester names in the results section
    document.getElementById('result-teacher').textContent = teacherName || 'Не указан';
    document.getElementById('result-attester').textContent = attesterName || 'Не указан';

    loadQuestions(); // Load the questions
  } else {
    alert('Пожалуйста, введите имя.');
  }
}
	
// Function to go back to the input section
function goBack() {
  // Hide questions section and show input section
  document.getElementById('questions-section').style.display = 'none';
  document.getElementById('name-input-section').style.display = 'block';
}

function loadQuestions() {
  const questionsList = document.getElementById('questions-list');
  const questions = selectedGenerator === 'Учитель' ? teacherQuestions : attestationQuestions;

  // Перемешиваем вопросы
  const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);

  // Берем первые 17 вопросов
  const selectedQuestions = shuffledQuestions.slice(0, 17);

  questionsList.innerHTML = '';

  // Генерация 17 вопросов без повторений
  selectedQuestions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-frame';

    // Разделяем вопрос на две части (до | и после |)
    const splitQuestion = question.split('|');
    const beforePipe = splitQuestion[0];
    const afterPipe = splitQuestion[1] ? splitQuestion[1] : ''; // Если после | нет текста, то ничего не добавляем

    questionDiv.innerHTML = `
      <div class="question">
        <span>Вопрос ${index + 1}: ${beforePipe} <span class="highlight-red">${afterPipe}</span></span>
        <div class="score-buttons">
          <button onclick="selectScore(${index}, 1)">1</button>
          <button onclick="selectScore(${index}, 0.5)">0.5</button>
          <button onclick="selectScore(${index}, 0)">0</button>
        </div>
      </div>
    `;
    questionsList.appendChild(questionDiv);
  });
}

    function selectScore(index, score) {
      scores[index] = score;
      const buttons = document.querySelectorAll(`.question-frame:nth-child(${index + 1}) .score-buttons button`);
      buttons.forEach(button => button.classList.remove('selected'));
      if (score === 0) {
        buttons.forEach(button => {
          if (parseFloat(button.textContent) === 0) {
            button.classList.add('selected');
          }
        });
      } else if (score === 1) {
        buttons.forEach(button => {
          if (parseFloat(button.textContent) === 1) {
            button.classList.add('selected');
          }
        });
      } else if (score === 0.5) {
        buttons.forEach(button => {
          if (parseFloat(button.textContent) === 0.5) {
            button.classList.add('selected');
          }
        });
      }
    }

    function showResults() {
      const resultsSection = document.getElementById('results-section');
      document.getElementById('questions-section').style.display = 'none';
      resultsSection.style.display = 'block';

      const questionsResults = document.getElementById('questions-results');
      questionsResults.innerHTML = '';
      scores.forEach((score, index) => {
        const resultDiv = document.createElement('p');
        resultDiv.textContent = `Вопрос ${index + 1}: ${score}`;
        resultDiv.classList.add(`score-${score}`);
        questionsResults.appendChild(resultDiv);
      });

      const totalScore = scores.reduce((sum, score) => sum + score, 0);
      document.getElementById('total-score').textContent = totalScore.toFixed(1);
      document.getElementById('time-spent').textContent = formatTime(time);
    }

    function goBackToQuestions() {
      document.getElementById('results-section').style.display = 'none';
      document.getElementById('questions-section').style.display = 'block';
    }

    function downloadResults() {
      const traineeName = document.getElementById('result-trainee').textContent;
      const teacherName = document.getElementById('result-teacher').textContent;
      const attesterName = document.getElementById('result-attester').textContent;
      const totalScore = document.getElementById('total-score').textContent;
      const timeSpent = document.getElementById('timer').textContent;

      let results = `Итоговые данные:\n`;
      results += `Ник стажёра: ${traineeName}\n`;
      results += `Ник учителя: ${teacherName}\n`;
      results += `Ник аттестатора: ${attesterName}\n\n`;
      results += `Результаты по вопросам:\n`;
      scores.forEach((score, index) => {
        results += `Вопрос ${index + 1}: ${score}\n`;
      });
      results += `\nОбщее количество баллов: ${totalScore}\n`;
      results += `Оставшееся время: ${timeSpent}\n`;

      const blob = new Blob([results], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `results_${traineeName}.txt`;
      a.click();
    }

    function startTimer() {
      timerInterval = setInterval(() => {
        time--;
        document.getElementById('timer').textContent = formatTime(time);
        if (time <= 0) {
          clearInterval(timerInterval);
        }
      }, 1000);
    }

    function stopTimer() {
      clearInterval(timerInterval);
    }

    function resetTimer() {
      time = 720;
      document.getElementById('timer').textContent = formatTime(time);
    }

    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }
