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

    <!--Questions -->
    <div v-else-if="currentStep === 2" class="questions-section">
      <h2>Help us understand your problem</h2>
      <div
        v-for="question in mockQuestions"
        :key="question.id"
        class="question-card"
      >
        <p class="question-text">{{ question.text }}</p>
      </div>
    </div>
  </div>
</template>




<script setup>
import { ref } from 'vue'

// State Management
const currentStep = ref(1)  // 1 for problem description, 2 for questions
const problemDescription = ref('')

// Mock questions (normally would come from backend)
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
  }
]

const startQuestionnaire = () => {
  currentStep.value = 2  // Move to questions step
}
</script>

<style scoped>
.guidance-widget {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
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


.question-card {
  background: white;
  padding: 20px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.question-text {
  margin: 0;
  font-size: 16px;
}
</style>