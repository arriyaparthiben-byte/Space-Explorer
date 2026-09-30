/* ==========================================================================
   SPACE EXPLORER - Gamified Space Quiz Engine
   ========================================================================== */

const QUIZ_QUESTIONS = [
  {
    question: "Which planet in our Solar System is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    answer: 1,
    explanation: "Mars is known as the Red Planet due to large amounts of iron oxide (rust) covering its surface."
  },
  {
    question: "What is the hottest planet in the Solar System?",
    options: ["Mercury", "Venus", "Mars", "Sun"],
    answer: 1,
    explanation: "Venus is the hottest planet due to a dense carbon dioxide greenhouse atmosphere trapping heat at 465°C."
  },
  {
    question: "Which moon is known to have liquid methane rivers and lakes on its surface?",
    options: ["Europa", "Titan", "Ganymede", "Enceladus"],
    answer: 1,
    explanation: "Saturn's giant moon Titan has a thick atmosphere with liquid methane and ethane rain, rivers, and seas."
  },
  {
    question: "How long does sunlight take to reach planet Earth?",
    options: ["8 seconds", "8 minutes & 20 seconds", "8 hours", "Instantaneous"],
    answer: 1,
    explanation: "Travelling at 300,000 km/s, light from the Sun takes roughly 8 minutes and 20 seconds to reach Earth."
  },
  {
    question: "What is the largest volcano in the Solar System?",
    options: ["Mount Everest", "Mauna Kea", "Olympus Mons", "Caloris Basin"],
    answer: 2,
    explanation: "Olympus Mons on Mars is a massive shield volcano 22 km high—nearly 3 times higher than Mount Everest!"
  },
  {
    question: "Which space telescope was launched in December 2021 to observe the early universe in infrared?",
    options: ["Hubble", "Spitzer", "Kepler", "James Webb Space Telescope"],
    answer: 3,
    explanation: "The James Webb Space Telescope (JWST) is humanity's most powerful infrared space observatory."
  },
  {
    question: "What type of galaxy is our home galaxy, the Milky Way?",
    options: ["Elliptical", "Barred Spiral", "Irregular", "Lenticular"],
    answer: 1,
    explanation: "The Milky Way is a barred spiral galaxy containing over 100 to 400 billion stars."
  },
  {
    question: "What boundary around a black hole marks the point of no return for light and matter?",
    options: ["Singularity", "Photon Sphere", "Event Horizon", "Accretion Disk"],
    answer: 2,
    explanation: "The Event Horizon is the boundary where the gravitational pull is so strong that even light cannot escape."
  },
  {
    question: "Which planet has the most confirmed natural moons in the Solar System?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    answer: 1,
    explanation: "Saturn leads the Solar System with 146 confirmed moons, edging ahead of Jupiter's 95 moons."
  },
  {
    question: "What was the first human-made object to reach interstellar space?",
    options: ["Sputnik 1", "Apollo 11", "Voyager 1", "New Horizons"],
    answer: 2,
    explanation: "NASA's Voyager 1 crossed the heliopause into interstellar space in August 2012."
  }
];

class QuizEngine {
  constructor() {
    this.currentIdx = 0;
    this.score = 0;
    this.selectedOption = null;
    this.isAnswered = false;

    this.qCounter = document.getElementById('quiz-counter');
    this.qProgress = document.getElementById('quiz-progress-fill');
    this.qText = document.getElementById('question-text');
    this.optionsGrid = document.getElementById('options-grid');
    this.feedbackBox = document.getElementById('feedback-box');
    this.nextBtn = document.getElementById('quiz-next-btn');

    this.quizCard = document.getElementById('quiz-active-card');
    this.resultCard = document.getElementById('quiz-result-card');

    if (this.qText && this.optionsGrid) {
      this.init();
    }
  }

  init() {
    this.currentIdx = 0;
    this.score = 0;
    if (this.quizCard) this.quizCard.style.display = 'block';
    if (this.resultCard) this.resultCard.style.display = 'none';

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        if (!this.isAnswered) return;
        this.currentIdx++;
        if (this.currentIdx < QUIZ_QUESTIONS.length) {
          this.loadQuestion();
        } else {
          this.showResults();
        }
      });
    }

    this.loadQuestion();
  }

  loadQuestion() {
    this.isAnswered = false;
    this.selectedOption = null;

    const qData = QUIZ_QUESTIONS[this.currentIdx];

    // Meta update
    if (this.qCounter) this.qCounter.textContent = `QUESTION ${String(this.currentIdx + 1).padStart(2, '0')} / ${QUIZ_QUESTIONS.length}`;
    if (this.qProgress) this.qProgress.style.width = `${((this.currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%`;

    // Question Text
    if (this.qText) this.qText.textContent = qData.question;

    // Reset Feedback and Next Button
    if (this.feedbackBox) {
      this.feedbackBox.className = 'feedback-box';
      this.feedbackBox.style.display = 'none';
    }
    if (this.nextBtn) this.nextBtn.style.display = 'none';

    // Populate Options
    this.optionsGrid.innerHTML = '';
    qData.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `<span>${optText}</span><span style="font-family: var(--font-display); opacity: 0.6;">0${idx + 1}</span>`;

      btn.addEventListener('click', () => this.handleAnswer(idx, btn));
      this.optionsGrid.appendChild(btn);
    });
  }

  handleAnswer(idx, clickedBtn) {
    if (this.isAnswered) return;
    this.isAnswered = true;

    const qData = QUIZ_QUESTIONS[this.currentIdx];
    const isCorrect = idx === qData.answer;

    if (isCorrect) {
      this.score++;
      clickedBtn.classList.add('correct');
      if (window.spaceSound) window.spaceSound.playSuccess();
    } else {
      clickedBtn.classList.add('incorrect');
      // Highlight correct answer
      const buttons = this.optionsGrid.querySelectorAll('.option-btn');
      if (buttons[qData.answer]) {
        buttons[qData.answer].classList.add('correct');
      }
    }

    // Disable all options
    this.optionsGrid.querySelectorAll('.option-btn').forEach(btn => btn.classList.add('disabled'));

    // Show Feedback Box
    if (this.feedbackBox) {
      this.feedbackBox.className = `feedback-box show ${isCorrect ? 'correct' : 'incorrect'}`;
      this.feedbackBox.innerHTML = `
        <div class="feedback-title">${isCorrect ? '✓ CORRECT COMMANDER!' : '✗ INCORRECT'}</div>
        <div class="feedback-text">${qData.explanation}</div>
      `;
      this.feedbackBox.style.display = 'block';
    }

    // Show Next Button
    if (this.nextBtn) {
      this.nextBtn.style.display = 'inline-flex';
      this.nextBtn.textContent = (this.currentIdx === QUIZ_QUESTIONS.length - 1) ? 'VIEW RESULTS 🏆' : 'NEXT QUESTION ➔';
    }
  }

  showResults() {
    if (this.quizCard) this.quizCard.style.display = 'none';
    if (this.resultCard) {
      this.resultCard.style.display = 'block';

      let rank = 'Astronomy Novice 🔭';
      if (this.score >= 9) rank = 'Master Astronomer 🌌';
      else if (this.score >= 7) rank = 'Cosmic Voyager 🚀';
      else if (this.score >= 5) rank = 'Stargazer ⭐️';

      document.getElementById('final-score-val').textContent = `${this.score} / ${QUIZ_QUESTIONS.length}`;
      document.getElementById('final-rank-title').textContent = rank;

      const retryBtn = document.getElementById('quiz-retry-btn');
      if (retryBtn) {
        retryBtn.onclick = () => this.init();
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new QuizEngine();
});
