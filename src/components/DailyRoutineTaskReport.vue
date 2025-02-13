<template>
    <div class="container mt-5">
      <h3>Daily Routine Task Report</h3>
  
      <div v-if="dailyroutineTaskGroups && Object.keys(dailyroutineTaskGroups).length > 0">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Period</th>
              <th>Task</th>
              <th>Status</th>
              <th>Initials</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(tasks, period) in dailyroutineTaskGroups" :key="period">
              <tr>
                <td :rowspan="tasks.length" class="align-middle">{{ period.charAt(0).toUpperCase() + period.slice(1) }}</td>
                <td>{{ tasks[0].name }}</td>
                <td>
                  <span :class="tasks[0].completed ? 'text-success' : 'text-danger'">
                    {{ tasks[0].completed ? 'Completed' : 'Pending' }}
                  </span>
                </td>
                <td>{{ tasks[0].completed ? tasks[0].initials.join(', ') : '-' }}</td>
              </tr>
              <template v-for="(task, index) in tasks.slice(1)" :key="period + '-' + index">
                <tr>
                  <td>{{ task.name }}</td>
                  <td>
                    <span :class="task.completed ? 'text-success' : 'text-danger'">
                      {{ task.completed ? 'Completed' : 'Pending' }}
                    </span>
                  </td>
                  <td>{{ task.completed ? task.initials.join(', ') : '-' }}</td>
                </tr>
              </template>
            </template>
          </tbody>
        </table>
  
        <!-- Single Export Button for All Tasks -->
        <button
          class="btn btn-success mb-3"
          @click="exportAllTasks"
        >
          Export All Tasks
        </button>
  
        <div class="d-flex justify-content-between">
          <button class="btn btn-secondary" @click="previousPage" :disabled="currentPage === 1">Back</button>
          <button class="btn btn-primary" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
      </div>
  
      <div v-else>
        <p>No data found for daily routine tasks.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dailyroutineTaskGroups: {},
        currentPage: 1,
        itemsPerPage: 10, // Adjust the number of items per page
      };
    },
    computed: {
      totalPages() {
        const totalItems = Object.values(this.dailyroutineTaskGroups).reduce((acc, tasks) => acc + tasks.length, 0);
        return Math.ceil(totalItems / this.itemsPerPage);
      },
    },
    mounted() {
      this.loadDailyroutineTasks();
    },
    methods: {
      loadDailyroutineTasks() {
        const tasks = localStorage.getItem('dailyroutineTasks');
        if (tasks) {
          this.dailyroutineTaskGroups = JSON.parse(tasks);
        }
      },
      previousPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
      exportAllTasks() {
        // Flatten all tasks from all periods into one array
        const allTasks = [];
        for (const period in this.dailyroutineTaskGroups) {
          const tasks = this.dailyroutineTaskGroups[period];
          tasks.forEach(task => {
            allTasks.push({
              period,
              taskName: task.name,
              status: task.completed ? 'Completed' : 'Pending',
              initials: task.completed ? task.initials.join(', ') : '-',
            });
          });
        }
        this.downloadCSV(allTasks);
      },
        downloadCSV(data) {
            const csvContent = this.convertToCSV(data);
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);

            // Get today's date in the format YYYY-MM-DD
            const today = new Date();
            const dateStr = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD

            link.setAttribute('href', url);
            link.setAttribute('download', `daily_routine_report_${dateStr}.csv`); // Append the date
            link.click();
        },

      convertToCSV(data) {
        let csv = 'Period,Task,Status,Initials\n';
        data.forEach(task => {
          csv += `${task.period},${task.taskName},${task.status},${task.initials}\n`;
        });
        return csv;
      },
    },
  };
  </script>
  
  <style scoped>
  h3 {
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
  }
  .table {
    width: 100%;
  }
  .text-success {
    color: green;
  }
  .text-danger {
    color: red;
  }
  </style>
  