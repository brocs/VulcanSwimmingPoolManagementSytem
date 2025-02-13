<template>
    <div class="container mt-5">
        <h3>Opening Task Report</h3>
        <div class="d-flex justify-content-end align-items-center mt-4">
            <div class="d-flex align-items-center">
            <label for="startDate" class="form-label mb-0 me-2">Start Date:</label>
            <input
                type="date"
                id="startDate"
                class="form-control form-control-md"
                v-model="startDate"
                @change="handleDateChange"
            />
    
            <label for="endDate" class="form-label mb-0 me-2 ms-3">End Date:</label>
            <input
                type="date"
                id="endDate"
                class="form-control form-control-sm"
                v-model="endDate"
                @change="handleDateChange"
            />
    
            <button
                class="btn btn-info ms-3"
                :disabled="!startDate || !endDate"
                @click="exportTasksForDateRange"
                >
                <i class="fas fa-download"></i> <!-- Font Awesome download icon -->
                </button>

            </div>
        </div>
        <!-- Loop through each day of the tasks -->
        <div v-for="(tasks, date) in groupedTasks" :key="date" class="mb-3">
            <button
            class="btn btn-primary w-100 text-start"
            @click="toggleDay(date)"
            >
            <strong>{{ date }}</strong>
            <span v-if="!isDayExpanded(date)" class="float-end">+</span>
            <span v-if="isDayExpanded(date)" class="float-end">-</span>
            </button>
    
            <!-- Export Button for selected day -->
            <div v-if="isDayExpanded(date)" class="mt-3">
                <button
                    class="btn btn-success mb-3"
                    @click="exportTasksForDay(date)"
                >
                    Export {{ date }} Tasks
                </button>
            <!-- Table for that day, visible if expanded -->
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>Task</th>
                        <th>Status</th>
                        <th>Initials</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(task, index) in tasks" :key="index">
                        <td>{{ task.name }}</td>
                        <td>
                        <span :class="task.completed ? 'text-success' : 'text-danger'">
                            {{ task.completed ? 'Completed' : 'Not Completed' }}
                        </span>
                        </td>
                        <td>{{ task.completed ? task.initials : '-' }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    
        <!-- Date Range Picker and Export Button (Positioned Right and Smaller) -->
        
    </div>
</template>
  


<script>
export default {
  data() {
    return {
      groupedTasks: {},
      expandedDays: [],
      startDate: '', // to store the start date
      endDate: '',   // to store the end date
    };
  },
  mounted() {
    this.loadTasksFromLocalStorage();
  },
  methods: {
    loadTasksFromLocalStorage() {
      const savedOpeningTasks = localStorage.getItem("openingTasks");
      if (savedOpeningTasks) {
        const tasks = JSON.parse(savedOpeningTasks);
        this.groupedTasks = tasks.reduce((grouped, task) => {
          // Adjust for local time zone with toLocaleDateString
          const taskDate = task.date || new Date().toLocaleDateString('en-CA'); 
          if (!grouped[taskDate]) {
            grouped[taskDate] = [];
          }
          grouped[taskDate].push(task);
          return grouped;
        }, {});
      }
    },
    
    toggleDay(date) {
      if (this.isDayExpanded(date)) {
        this.expandedDays = this.expandedDays.filter(d => d !== date);
      } else {
        this.expandedDays.push(date);
      }
    },

    isDayExpanded(date) {
      return this.expandedDays.includes(date);
    },

    exportTasksForDay(date) {
      const tasksToExport = this.groupedTasks[date];
      const csvContent = this.convertToCSV(tasksToExport, date);
      this.downloadFile(csvContent, `${date}-tasks.csv`, 'text/csv');
    },

    exportTasksForDateRange() {
      const tasksToExport = [];
      
      // Loop through groupedTasks to find tasks in the date range
      for (const date in this.groupedTasks) {
        if (this.isDateInRange(date)) {
          tasksToExport.push(...this.groupedTasks[date]);
        }
      }

      const csvContent = this.convertToCSV(tasksToExport, `Tasks-${this.startDate}-to-${this.endDate}`);
      this.downloadFile(csvContent, `${this.startDate}-to-${this.endDate}-tasks.csv`, 'text/csv');
    },

    convertToCSV(tasks) {
      const headers = ['Task', 'Status', 'Initials'];
      const rows = tasks.map(task => [
        task.name,
        task.completed ? 'Completed' : 'Not Completed',
        task.initials || '-'
      ]);

      const csvData = [headers, ...rows].map(row => row.join(',')).join('\n');
      return csvData;
    },

    downloadFile(content, filename, mimeType) {
      const blob = new Blob([content], { type: mimeType });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    },

    handleDateChange() {
      // Log the start and end dates when changed
      if (this.startDate && this.endDate) {
        console.log(`Selected Date Range: ${this.startDate} to ${this.endDate}`);
      }
    },

    isDateInRange(date) {
      const currentDate = new Date(date);
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      return currentDate >= start && currentDate <= end;
    }
  }
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