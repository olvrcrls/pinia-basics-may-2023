<template>
  <main>
    <!-- Heading -->
    <header>
        <img src="./assets/pinia-logo.svg" alt="pinia-logo">
        <h1>Pinia Tasks</h1>
    </header>

    <!-- New Task Form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- Filter -->
    <nav class="filter">
      <button @click="filter = 'all'" 
        :class="{ active: filter == 'all'}"
      >All Tasks</button>
      <button @click="filter = 'favorites'" 
        :class="{ active: filter == 'favorites'}"
      >Favorite Tasks</button>
    </nav>

    <!-- Loading -->
    <div class="loading" v-if="loading">Loading tasks..</div>

    <!-- Task List -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have <strong>{{ totalTasks }}</strong> tasks to do</p>
      <div v-for="task in tasks" :key="task.id">
        <TaskDetails :task="task"/>
      </div>
    </div>

    <!-- Favorite Tasks -->
    <div class="task-list" v-if="filter === 'favorites'">
      <p>You have <strong>{{ totalFavoriteTasks }}</strong> favorite tasks left to do</p>
      <div v-for="task in favorites" :key="task.id">
        <TaskDetails :task="task"/>
      </div>
    </div>

    <div class="reset">
      <button class="reset" @click="taskStore.$reset">Reset Tasks</button>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue';
import TaskDetails from './components/TaskDetails.vue'
import TaskForm from './components/TaskForm.vue'
import { useTaskStore } from './stores/TaskStore'
import { storeToRefs } from 'pinia';

export default {
  components: { TaskDetails, TaskForm },
  setup() {
    const taskStore = useTaskStore();

    const { tasks, loading, favorites, totalTasks, totalFavoriteTasks } = storeToRefs(taskStore);

    // fetch all the tasks available
    taskStore.getTasks();

    const filter = ref('all'); // ['all', 'favorites']
    return { taskStore, filter, tasks, loading, favorites, totalFavoriteTasks, totalTasks }
  }
};
</script>