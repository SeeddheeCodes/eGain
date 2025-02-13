<template>
  <div class="guidance-widget">
    <!-- Logo Section -->
    <div class="widget-header">
      <img src="/logo.png" alt="Widget Logo" class="widget-logo" />
    </div>
  </div>
</template>

<script setup>
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
</style>