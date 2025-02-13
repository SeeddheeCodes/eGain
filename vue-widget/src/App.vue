<template>
  <div class="guidance-widget">
    <!-- Logo Section -->
    <div class="widget-header">
      <img src="/logo.png" alt="Widget Logo" class="widget-logo" />
    </div>

    <!-- Step 1: Problem Description -->
    <div v-if="currentStep === 1" class="problem-description">
      <h2>What problem are you trying to solve?</h2>
      <textarea v-model="problemDescription" placeholder="Describe your problem..." class="problem-input"></textarea>
      <button @click="startQuestionnaire" class="primary-button">Start</button>
    </div>

    <!-- Step 2: Questions -->
    <div v-else-if="currentStep === 2" class="questions-section">
      <h2>Help us understand your problem</h2>

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
        <input v-else-if="question.type === 'text'" type="text" v-model="answers[question.id]" class="text-input"/>

        <!-- Number Input -->
        <input v-else-if="question.type === 'number'" type="number" v-model="answers[question.id]" class="number-input"/>

        <!-- Image Selection -->
        <div v-else-if="question.type === 'image-enum'" class="image-options">
          <div
            v-for="option in question.options"
            :key="option.id"
            @click="selectAnswer(question.id, option.value)"
            :class="{ 'selected': answers[question.id] === option.value }"
            class="image-option"
          >
            <img :src="option.imageUrl" :alt="option.label" />
            <span class="image-label">{{ option.label }}</span>
          </div>
</div>

      </div>


      <button @click="submitAnswers" :disabled="!areAllQuestionsAnswered" class="primary-button">Continue</button>

      <!-- Answered Questions Section -->
      <div class="answered-questions" v-if="answeredQuestions.length">
        <h3>Answered Questions</h3>
        <div v-for="question in answeredQuestions" :key="question.id" class="answered-question" @click="editAnswer(question)">
          <p class="question-text">{{ question.text }}</p>
          <p class="answer-text">{{ answers[question.id] }}</p>
        </div>
      </div>
    </div>

    <!-- Step 3: Solution -->
    <div v-else-if="currentStep === 3" class="solution-section">
      <h2>Suggested Solution</h2>
      <div class="solution-content">{{ solution }}</div>

      <!-- Feedback Section -->
      <div class="feedback-section">
        <p>Was this solution helpful?</p>
        <div class="feedback-buttons">
          <button @click="submitFeedback(true)" class="feedback-button">👍 Yes</button>
          <button @click="submitFeedback(false)" class="feedback-button">👎 No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useGuidanceStore } from '@/store';

const store = useGuidanceStore();
const currentStep = computed(() => store.currentStep);
const problemDescription = computed(() => store.problemDescription);
const currentQuestions = computed(() => store.currentQuestions);
const answeredQuestions = computed(() => store.answeredQuestions);
const answers = computed(() => store.answers);
const solution = computed(() => store.solution);
const areAllQuestionsAnswered = computed(() => store.areAllQuestionsAnswered);

const startQuestionnaire = () => store.nextStep();
const selectAnswer = (questionId, answer) => store.setAnswer(questionId, answer);
const submitAnswers = () => store.submitAnswers();
const editAnswer = (question) => store.editAnswer(question);
const submitFeedback = (isHelpful) => store.submitFeedback(isHelpful);
</script>


<style scoped>
@import '@/styles.css';
</style>
