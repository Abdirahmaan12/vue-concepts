<template>
  <div class="quiz-app bg-white dark:bg-gray-900 dark:text-gray-200">
    <h2 v-if="!quizFinished">🧠 Quiz App</h2>

    <div v-if="!quizFinished">
      <div class="question-box">
        <p>
          <strong>Question {{ currentIndex + 1 }}:</strong>
          {{ currentQuestion.question }}
        </p>
        <ul>
          <li
            v-for="(option, i) in currentQuestion.options"
            :key="i"
            @click="selectAnswer(option)"
            :class="[
              'option bg-gray-100 dark:bg-gray-800',
              selectedAnswer === option
                ? 'selected text-black dark:text-black'
                : 'text-gray-800 dark:text-gray-200',
            ]"
          >
            {{ option }}
          </li>
        </ul>
        <button
          :disabled="!selectedAnswer"
          class="btn bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          @click="nextQuestion"
        >
          {{ isLastQuestion ? "Finish" : "Next" }}
        </button>
      </div>
    </div>

    <div v-if="quizFinished" class="result-box">
      <h2>🎉 Quiz Completed!</h2>
      <p>Your Score: {{ score }} / {{ questions.length }}</p>
      <button
        @click="restartQuiz"
        class="btn bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
      >
        Retry
      </button>
    </div>

    <div v-if="showPopup" class="popup">
      <div class="popup-content bg-white dark:bg-gray-800 dark:text-gray-200">
        <h3>{{ resultMessage }}</h3>
        <button
          @click="closePopup"
          class="btn bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        {
          question: "What does HTML stand for?",
          options: [
            "HyperText Markup Language",
            "Home Tool Markup Language",
            "Hyper Transfer Language",
          ],
          answer: "HyperText Markup Language",
        },
        {
          question: "Which language runs in a web browser?",
          options: ["Java", "C", "Python", "JavaScript"],
          answer: "JavaScript",
        },
        {
          question: "What is CSS used for?",
          options: ["Styling", "Logic", "Data Storage", "Networking"],
          answer: "Styling",
        },
      ],
      currentIndex: 0,
      selectedAnswer: null,
      score: 0,
      quizFinished: false,
      showPopup: false,
      resultMessage: "",
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex];
    },
    isLastQuestion() {
      return this.currentIndex === this.questions.length - 1;
    },
  },
  methods: {
    selectAnswer(option) {
      this.selectedAnswer = option;
    },
    nextQuestion() {
      if (this.selectedAnswer === this.currentQuestion.answer) {
        this.score++;
      }
      if (this.isLastQuestion) {
        this.quizFinished = true;
        this.showFinalPopup();
      } else {
        this.currentIndex++;
        this.selectedAnswer = null;
      }
    },
    restartQuiz() {
      this.currentIndex = 0;
      this.selectedAnswer = null;
      this.score = 0;
      this.quizFinished = false;
      this.showPopup = false;
      this.resultMessage = "";
    },
    showFinalPopup() {
      if (this.score === this.questions.length) {
        this.resultMessage = "🎓 Waad guuleysatay! Hambalyo!";
      } else if (this.score < this.questions.length - 1) {
        this.resultMessage = "❌ Waad guuldareysatay. Isku day mar kale.";
      } else {
        this.resultMessage =
          "👏 Waqti fiican, laakin waxaad khalday hal su'aal.";
      }
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
    },
  },
};
</script>

<style scoped>
.quiz-app {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.option {
  list-style: none;
  padding: 10px;
  margin: 6px 0;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.selected {
  background-color: #d1e7dd !important;
  font-weight: bold;
}

.btn {
  margin-top: 15px;
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup-content {
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
