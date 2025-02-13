<template>
  <div class="guidance-widget">
    <!-- Logo Section -->
    <div class="widget-header">
      <img src="/logo.png" alt="Widget Logo" class="widget-logo" />
    </div>

    <!-- Step 1: Problem Description -->
    <div v-if="currentStep === 1" class="problem-description">
      <h2>What problem are you trying to solve?</h2>
      <textarea
        v-model="problemDescription"
        placeholder="Please describe your problem..."
        class="problem-input"
      ></textarea>
      <button
        @click="startQuestionnaire"
        :disabled="!problemDescription"
        class="primary-button"
      >
        Start
      </button>
    </div>

    <!-- Step 2: Questions -->
    <div v-else-if="currentStep === 2" class="questions-section">
      <h2>Help us understand your problem</h2>
      <!-- Current Questions -->
      <div v-for="question in currentQuestions" :key="question.id" class="question-card">
        <p class="question-text">{{ question.text }}</p>
        
        <!-- Multiple Choice -->
        <div v-if="question.type === 'text-enum'" class="options-container">
          <button
            v-for="option in question.options"
            :key="option.id"
            @click="selectAnswer(question.id, option.value)"
            :class="{ 'selected': answers[question.id] === option.value }"
            class="option-button"
          >
            {{ option.label }}
          </button>
        </div>

        <!-- Text Input -->
        <div v-else-if="question.type === 'text'" class="text-input">
          <input
            type="text"
            v-model="answers[question.id]"
            :placeholder="question.placeholder"
          />
        </div>

        <!-- Number Input -->
        <div v-else-if="question.type === 'number'" class="number-input">
          <input
            type="number"
            v-model="answers[question.id]"
            :placeholder="question.placeholder"
          />
        </div>
      </div>

      <!-- Continue Button -->
      <button
        @click="submitAnswers"
        :disabled="!areCurrentQuestionsAnswered"
        class="primary-button"
      >
        Continue
      </button>

      <!-- Answered Questions Section -->
      <div class="answered-questions">
        <h3>Answered Questions</h3>
        <div
          v-for="question in answeredQuestions"
          :key="question.id"
          class="answered-question"
          @click="editAnswer(question)"
        >
          <p class="question-text">{{ question.text }}</p>
          <p class="answer-text">{{ formatAnswer(question) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, reactive, computed } from 'vue'

// State Management
const currentStep = ref(1)  // 1 for problem description, 2 for questions
const problemDescription = ref('')
const currentQuestions = ref([])  // Currently displayed questions
const answeredQuestions = ref([]) // Previously answered questions
const answers = reactive({}) 

// Mock Questions Data
const mockQuestions = [
 {
   id: 1,
   text: 'What type of issue are you experiencing?',
   type: 'text-enum',
   options: [
     { id: 1, label: 'Technical', value: 'technical' },
     { id: 2, label: 'Billing', value: 'billing' },
     { id: 3, label: 'Account', value: 'account' },
   ]
 },
 {
   id: 2,
   text: 'Please describe the issue in detail:',
   type: 'text',
   placeholder: 'Type your answer here...'
 },
 {
   id: 3,
   text: 'How many times has this occurred?',
   type: 'number',
   placeholder: 'Enter a number'
 }
]

// Computed Properties
const areCurrentQuestionsAnswered = computed(() => 
 currentQuestions.value.every(q => answers[q.id])
)

// Functions
const startQuestionnaire = () => {
 currentStep.value = 2
 // Load first two questions
 currentQuestions.value = mockQuestions.slice(0, 2)
}

const selectAnswer = (questionId, answer) => {
 answers[questionId] = answer
}

const submitAnswers = () => {
 // Move current questions to answered section
 answeredQuestions.value = [...answeredQuestions.value, ...currentQuestions.value]
 
 // Load next questions or finish
 if (answeredQuestions.value.length < mockQuestions.length) {
   const nextIndex = answeredQuestions.value.length
   currentQuestions.value = mockQuestions.slice(
     nextIndex,
     nextIndex + 2
   )
 } else {
   // Will handle solution display in next step
   console.log('All questions answered!')
 }
}

const editAnswer = (question) => {
 // Move question back to current questions
 answeredQuestions.value = answeredQuestions.value.filter(q => q.id !== question.id)
 currentQuestions.value = [question, ...currentQuestions.value]
}

const formatAnswer = (question) => {
 const answer = answers[question.id]
 if (question.type === 'text-enum') {
   const option = question.options.find(opt => opt.value === answer)
   return option ? option.label : answer
 }
 return answer
}
</script>

<style scoped>
.guidance-widget {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.widget-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.widget-logo {
  height: 40px;
  width: auto;
}

.problem-input {
  width: 100%;
  min-height: 100px;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: vertical;
}

.question-card {
  background: white;
  padding: 20px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.options-container {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.option-button {
  padding: 8px 16px;
  border: 1px solid #007bff;
  background: white;
  color: #007bff;
  border-radius: 4px;
  cursor: pointer;
}

.option-button.selected {
  background: #007bff;
  color: white;
}

.text-input input,
.number-input input {
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.primary-button {
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
}

.primary-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>