<template>
  <div class="shared-badge" :class="`shared-badge--${color}`">
    <span class="badge-count">{{ count }}</span>
    <span class="badge-label">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  count: number;
  label: string;
  color?: 'blue' | 'green' | 'red' | 'orange';
}

withDefaults(defineProps<Props>(), {
  color: 'blue',
});
</script>

<style scoped>
.shared-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 25px;
  font-weight: 600;
  color: white;
  transition: all 0.3s ease;
}

.shared-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.shared-badge--blue {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.shared-badge--green {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.shared-badge--red {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.shared-badge--orange {
  background: linear-gradient(135deg, #ff9a56 0%, #ffb26f 100%);
}

.badge-count {
  font-size: 1.5rem;
  font-weight: 700;
}

.badge-label {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>
