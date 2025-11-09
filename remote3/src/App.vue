<template>
  <div class="remote3-app">
    <div class="remote-badge remote-badge--3">Remote 3 (Vue)</div>
    <h2>Vue Microfrontend</h2>
    <p class="description">
      This microfrontend is built with Vue 3 and demonstrates cross-framework Module Federation
    </p>

    <div class="todo-container">
      <div class="input-group">
        <input
          v-model="newTodo"
          @keyup.enter="addTodo"
          type="text"
          placeholder="Enter a new task..."
          class="todo-input"
        />
        <button @click="addTodo" class="add-button">Add Task</button>
      </div>

      <div v-if="todos.length > 0" class="todos-list">
        <div
          v-for="todo in todos"
          :key="todo.id"
          class="todo-item"
          :class="{ completed: todo.completed }"
        >
          <input
            type="checkbox"
            v-model="todo.completed"
            class="todo-checkbox"
          />
          <span class="todo-text">{{ todo.text }}</span>
          <button @click="removeTodo(todo.id)" class="delete-button">×</button>
        </div>
      </div>

      <div v-else class="empty-state">
        No tasks yet. Add one above!
      </div>

      <div class="stats">
        <Badge :count="activeCount" label="Active" color="blue" />
        <Badge :count="completedCount" label="Completed" color="green" />
      </div>
    </div>

    <div class="info-box">
      <h3>Exposed Components:</h3>
      <ul>
        <li><code>./App</code> - This Vue todo application</li>
        <li><code>./Badge</code> - Shared Badge component (Vue)</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Badge from './components/Badge.vue';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const newTodo = ref('');
const todos = ref<Todo[]>([
  { id: 1, text: 'Example task 1', completed: false },
  { id: 2, text: 'Example task 2', completed: true },
]);

let nextId = 3;

const activeCount = computed(() => todos.value.filter(t => !t.completed).length);
const completedCount = computed(() => todos.value.filter(t => t.completed).length);

const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: nextId++,
      text: newTodo.value.trim(),
      completed: false,
    });
    newTodo.value = '';
  }
};

const removeTodo = (id: number) => {
  todos.value = todos.value.filter(t => t.id !== id);
};
</script>

<style scoped>
.remote3-app {
  padding: 1.5rem;
}

.remote-badge--3 {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.remote-badge {
  display: inline-block;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.remote3-app h2 {
  margin: 0.5rem 0;
  color: #333;
}

.description {
  color: #666;
  margin: 0.5rem 0 1.5rem 0;
}

.todo-container {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  margin: 1.5rem 0;
}

.input-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.todo-input {
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
}

.todo-input:focus {
  border-color: #4facfe;
}

.add-button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.add-button:hover {
  transform: translateY(-2px);
}

.todos-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  transition: all 0.3s;
}

.todo-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  opacity: 0.5;
}

.todo-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.todo-text {
  flex: 1;
  font-size: 1rem;
  color: #333;
}

.delete-button {
  width: 32px;
  height: 32px;
  font-size: 1.5rem;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.delete-button:hover {
  background: #ff5252;
  transform: scale(1.1);
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #999;
  font-size: 1.1rem;
}

.stats {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.info-box {
  background: #e3f2fd;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #4facfe;
  margin-top: 1.5rem;
}

.info-box h3 {
  margin-top: 0;
  color: #333;
}

.info-box ul {
  margin: 0.5rem 0 0 0;
  padding-left: 1.5rem;
}

.info-box li {
  margin: 0.5rem 0;
  color: #555;
}

.info-box code {
  background: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  color: #4facfe;
}
</style>
