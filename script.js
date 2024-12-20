    let timerInterval;
    let time = 720; // 12 minutes in seconds
    let scores = Array(17).fill(0);
    let selectedGenerator = '';
    let currentQuestionIndex = 0;

    const teacherQuestions = [
      'Игрок спросил как получить БП, ему ответил игрок в личное сообщение Быстро пропиши 2 раза /clear и получишь БП ! Тут есть нарушение, если да, то какое? | /mute 5h 2.7',
      'Игрок на лайте написал (Хочешь, скину всем твою фамилию и телефон?) ! Тут есть нарушение, если да, то какое? | /muteip 2.15',
      'Игрок во сделки отказывается скидывать чек покупки ! Тут есть нарушение, если да, то какое? | /ban 10d 1.8',
      'Игрок попросил игроков в чате написать (Античит хуйня полная) ! Тут есть нарушение, если да, то какое? | ban 7d 2.6',
      'Игрок написал в чат (Прости, но твой отец овца дохлая) ! Тут есть нарушение, если да, то какое? | mute 7h 3.6',
      'Игрок написал в чат (Я ваш личный казино-бот, отправляйте мне монеты, я напишу вам, вы вайграли или нет, баланс бота на данный момент:93 000 000 монет) | 3.14, 1 нарушение mute 8h, 2-е нарушение ban 3d, 3-е ban навсегда',
      'Игрок используя чат написал (Кто тим? Пишите я) ! Тут есть нарушение, если да, то какое? | mute 3h 3.7',
      'Игрок написал в чат (только что был вайп на проекте СуперМайн, все заходите!) ! Тут есть нарушение, если да, то какое? | ban 14d 3.1',
      'Игрок на лайте Во время пвп встал в высокую траву около серверного данжа с регионом ! Тут есть нарушение, если да, то какое? | ban от 3d дней 2.13',
      'Игрок замутил своего тимейта на 1 час по причине Оскорбление. и забыл предоставить доказательства в архив, но вспомнил через 2часа ! Тут есть нарушение, если да, то какое? | ban 7d 4.1',
      'Игрок забанил другого игрока по причине 2.4 и сразу предоставил доказательства на бан в архив ! Тут есть нарушение, если да, то какое? | ban 7d 4.2',
      'Игрок написал тебе в личное сообщение (Привет, я администатор сервер!) ! Тут есть нарушение, если да, то какое? | ban 14d 2.1',
      'Во время ПВП ты увидел игрока с ник-неймом (egorhack9_LOX_) ! Тут есть нарушение, если да, то какое? | /warn 2h после /ban 1.5',
      'Игрок создал гарант с описанием (куплю 500 рубинов за 1000монет) ! Тут есть нарушение, если да, то какое? | 6.1 При первом нарушении 5d, 2-е навсегда',
      'Игрок с изменённым ник-неймом (Makson1gg) в муте за нарушение 2.8 после зашел с аккаунта (Makson111) и дальше продолжает общаться ! Тут есть нарушение, если да, то какое? | 2.9, наказание x2 по ip 1. /duepip, 2. /checkban 3. Скриншот того, что пишет в чат',
      'Игрок используя чат написал (Украинца дура) ! Тут есть нарушение, если да, то какое? | mute 9h 3.9',
      'Игрок используя /broadcast написал (Твоя мама такая дура..) ! Тут есть нарушение, если да, то какое? | ban 2d 4.3'
    ];

    const attestationQuestions = [
      'Игрок спросил у игрока как получить ДК ему ответил игрок (пропиши /suicide 2 раза и получишь ДК) ! Тут есть нарушение, если да, то какое?| mute 5h 2.7',
      'Игрок на классической анархии написал (Я знаю, где ты живешь, у тебя адрес Пушкина дом 8) ! Тут есть нарушение, если да, то какое?| /banip 2.15 (В лобби сервера)',
      'Во время сделки одному из игроков не пришёл Дк, ты попросил чек покупки у игрока, который покупал - Но он отказывается его давать ! Тут есть нарушение, если да, то какое?| ban 10d 1.8',
      'Игрок написал в чат (Отправь мне по одной монетке 5 раз подряд, я тебе топку дам) ! Тут есть нарушение, если да, то какое? | ban 7d 2.6',
      'Игрок написал в чат (ты сынок Мамы овцы) ! Тут есть нарушение, если да, то какое? | mute 7h 3.6',
      'Игрок написал в чат (Я ваш личный казино-бот, отправляйте мне монеты, я напишу вам, вы вайграли или нет, баланс бота на данный момент:93 000 000 монет) ! Тут есть нарушение, если да, то какое? | 3.14, 1 нарушение mute 8h, 2-е нарушение ban 3d, 3-е ban навсегда',
      'Игрок написал в чат (Кто угадает сколько мне лет получит 100 монет) ! Тут есть нарушение, если да, то какое? | mute 3h 3.7',
      'Игрок написал в чат (Пошли на сатурн и через 4секунды Продублировал такой-же сообщение) ! Тут есть нарушение, если да, то какое?  | ban 14d 3.1 (Призыв пойти)',
      'Игрок на лайте написал в чат (Продам дюп сфер, писать в дс) ! Тут есть нарушение, если да, то какое? | ban 3d 2.13',
      'Игрок выдал блокировку чата игроку с указан причиной (Флуд) и отправил доказательства в архив через 1 час ! Тут есть нарушение, если да, то какое? | ban 7d 4.1',
      'Игрок замутил своего твинка по причине (test) ! Тут есть нарушение, если да, то какое? | ban 7d 4.2?',
      'Игрок забанил своего твинка по причине 1.2 ! Тут есть нарушение, если да, то какое? | ban 14d 2.1',
      'Тебе обращается игрок с просьбой построить дом, имея ник-нейм (Администрацию_ебал) ! Тут есть нарушение, если да, то какое? | /warn 2h, /ban 1.5',
      'Игрок написал в чат (Кто купит Рубины за ресы + монеты, писать в VK) ! Тут есть нарушение, если да, то какое?  | 6.1 При первом нарушении ban 5d, 2-е навсегда',
      'Игрок используя чат написал (отсоси по дружески аттестатору) ! Тут есть нарушение, если да, то какое? | mute 2h 3.8',  
      'Игрок (ДваВи228) получил бан за нарушение правил 3.14, после чего зашёл с другого аккаунта (ДваВи1) и дальше продолжает играть ! Тут есть нарушение, если да, то какое? | 2.9, наказание x2 по ip 1. /duepip, 2. /checkmut  3. Скриншот того, что обходит',    
      'Игрок используя /broadcast написал (у тебя мама просто тупая) ! Тут есть нарушение, если да, то какое? | ban 2d 4.3'
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
	
	 // Код, который будет проверять правильность введенного пароля
    const correctPassword = '1hw';  // Задайте правильный набор букв
    const modal = document.getElementById('password-modal');
    const errorMessage = document.getElementById('error-message');
    const passwordInput = document.getElementById('password-input');

    // Показать модальное окно при загрузке страницы
    window.onload = function() {
      modal.style.display = 'flex';
      modal.classList.add('show');
    }

    // Функция для проверки введенного пароля
    function checkPassword() {
      const userPassword = passwordInput.value.trim();
      if (userPassword === correctPassword) {
        modal.classList.remove('show'); // Скрыть окно
        document.body.style.overflow = 'auto'; // Разрешить прокрутку страницы
      } else {
        errorMessage.style.display = 'block'; // Показать сообщение об ошибке
        passwordInput.value = ''; // Очистить поле ввода
        passwordInput.focus(); // Вернуть фокус в поле ввода
      }
    }
	
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

  // Split text at "!" and apply green color after "!"
  const [textBeforeExclamation, textAfterExclamation] = beforePipe.split('!');
  
    questionDiv.innerHTML = `
      <div class="question">
        <span>Вопрос ${index + 1}: 
        ${textBeforeExclamation || ''} 
        <span class="highlight-green">${textAfterExclamation || ''}</span> 
        <span class="highlight-red">${afterPipe}</span>
      </span>
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
  questionsResults.innerHTML = ''; // Очищаем предыдущее содержимое

  scores.forEach((score, index) => {
    const resultDiv = document.createElement('p');
    resultDiv.textContent = `Вопрос ${index + 1}: ${score}`;

    // Применяем класс, который установит оранжевый цвет
    resultDiv.classList.add('score-high');

    questionsResults.appendChild(resultDiv); // Добавляем новый элемент в результат
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
