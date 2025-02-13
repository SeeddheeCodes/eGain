import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';

export const useGuidanceStore = defineStore('guidance', () => {
  // State
  const currentStep = ref(1);
  const problemDescription = ref('');
  const currentQuestions = ref([]);
  const answeredQuestions = ref([]);
  const answers = reactive({});
  const solution = ref('');


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
    },
    {
      id: 4,
      text: 'Which device are you using?',
      type: 'image-enum',
      options: [
        { 
          id: 1, 
          label: 'Desktop', 
          value: 'desktop',
          imageUrl: '/desktop.png'  // Make sure these images exist in your public/assets folder
        },
        { 
          id: 2, 
          label: 'Mobile', 
          value: 'mobile',
          imageUrl: '/mobile.png'
        },
        { 
          id: 3, 
          label: 'Tablet', 
          value: 'tablet',
          imageUrl: '/tablet.png'
        }
      ]
    }
  ];
  
  
  const areAllQuestionsAnswered = computed(() => 
    currentQuestions.value.every(q => answers[q.id] !== undefined && answers[q.id] !== '')
  );

  // Actions
  const setProblem = (desc) => {
    problemDescription.value = desc;
  };

  const setAnswer = (questionId, answer) => {
    answers[questionId] = answer;
  };

  const nextStep = () => {
    currentStep.value = 2;
    currentQuestions.value = mockQuestions.slice(0, 2);
  };

  const submitAnswers = () => {
    if (!areAllQuestionsAnswered.value) return; //  Prevents moving forward if questions aren't answered

    //  Move answered questions to the answered section
    answeredQuestions.value = [...answeredQuestions.value, ...currentQuestions.value];

    //  Check for remaining questions
    const answeredIds = answeredQuestions.value.map(q => q.id);
    const remainingQuestions = mockQuestions.filter(q => !answeredIds.includes(q.id));

    if (remainingQuestions.length > 0) {
      currentQuestions.value = remainingQuestions;
    } else {
      generateSolution();
      currentStep.value = 3;
    }
  };

  const generateSolution = () => {
    solution.value = `Based on your responses, we recommend the following steps:
      1. ${answers[1] === 'technical' ? 'Clear your browser cache and cookies' : 
          answers[1] === 'billing' ? 'Check your latest invoice' : 
          'Verify your account settings'}
      2. If the issue persists, contact our support team.
      
      Additional Details:
      - Reported occurrences: ${answers[3] || 'Not specified'}
      - User description: ${answers[2] || 'No details provided'}`;
  };

  const editAnswer = (question) => {
    answeredQuestions.value = answeredQuestions.value.filter(q => q.id !== question.id);
    currentQuestions.value = [question, ...currentQuestions.value];
  };

  const submitFeedback = (isHelpful) => {
    console.log('Feedback submitted:', isHelpful);
    alert('Thank you for your feedback!');
  };

  return {
    // State
    currentStep,
    problemDescription,
    currentQuestions,
    answeredQuestions,
    answers,
    solution,

    // Computed
    areAllQuestionsAnswered,

    // Actions
    setProblem,
    setAnswer,
    nextStep,
    submitAnswers,
    editAnswer,
    submitFeedback
  };
});
