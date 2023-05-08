import { defineStore } from "pinia"

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        loading: false
    }), // state

    getters: {
        favorites() {
            return this.tasks.filter((task) => task.isFav);
        },

        // @todo: You can do this as well for total tasks
        // totalCount: (state) => {
        //     return state.tasks.length;
        // },

        totalTasks() {
            return this.tasks.length;
        },

        totalFavoriteTasks() {
            return this.favorites.length;
        }
    }, // getters

    actions: {
        async getTasks() {
            this.loading = true;
            setTimeout(async () => {
                const response = await fetch('http://localhost:3000/tasks');
                const data = await response.json();

                this.tasks = data;
                this.loading = false;
            }, 500);
        },
        
        /** @var Object task */
        async addTask(task) {
            this.tasks.push(task);
            const response = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.error) console.log(response.error);
        },

        /** @var int id */
        async deleteTask(id) {
            this.tasks = this.tasks.filter((task) => task.id != id);
            const response = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.error) console.log(response.error);
        },

        /** @var int id */
        async toggleFavorite(id) {
            const task = this.tasks.find((task) => task.id == id);
            task.isFav = !task.isFav;
            const response = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ isFav: task.isFav }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.error) console.log(response.error);
        },
    }, // actions
});