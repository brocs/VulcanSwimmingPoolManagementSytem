<template>
  <div class="modal fade" id="dailyroutineTaskModal" tabindex="-1" aria-labelledby="dailyroutineTaskModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="dailyroutineTaskModalLabel">Daily Routine Log</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveDailyroutineTask">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="dailyroutineTaskLogId" class="form-label">Task Log ID</label>
                <input type="text" class="form-control" id="dailyroutineTaskLogId" v-model="dailyroutineTaskData.dailyroutineTaskLogId" />
              </div>
              <div class="col-md-6 mb-3">
                <label for="employeeId" class="form-label">Employee ID / Name</label>
                <input type="text" class="form-control" id="employeeId" v-model="dailyroutineTaskData.employeeId" disabled />
              </div>
            </div>
            <div class="row">
              <div v-for="(dailyroutineTaskSet, period) in dailyroutineTaskGroups" :key="period" class="col-md-4">
                <h6>{{ period.charAt(0).toUpperCase() + period.slice(1) }}</h6>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Status</th>
                      <th>Initial</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(task, index) in dailyroutineTaskSet" :key="period + '-' + index">
                      <td>{{ task.name }}</td>
                      <td>
                        <button type="button" class="btn btn-sm" :class="task.completed ? 'btn-success' : 'btn-danger'" @click="toggleDailyroutineTask(period, index)">
                          <i :class="task.completed ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'"></i>
                        </button>
                      </td>
                      <td>{{ task.completed ? task.initials.join(', ') : '-' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
              <button type="button" class="btn btn-primary" @click="confirmOpeningDailyroutineTask">OK</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      dailyroutineTaskModalId: 'dailyroutineTaskModal',
      modalInstance: null,
      loggedInUser: '',
      dailyroutineTaskData: {
        dailyroutineTaskLogId: '',
        employeeId: '',
      },
      dailyroutineTaskGroups: {
        morning: [
          { name: 'Spot Mop', completed: false, initials: [] },
          { name: 'Swipe Floors', completed: false, initials: [] },
          { name: 'Check Bathrooms', completed: false, initials: [] },
          { name: 'Check Change Rooms', completed: false, initials: [] },
          { name: 'Squeegee Floors', completed: false, initials: [] },
          { name: 'Check Pool Debris', completed: false, initials: [] },
        ],
        afternoon: [
          { name: 'Spot Mop', completed: false, initials: [] },
          { name: 'Swipe Floors', completed: false, initials: [] },
          { name: 'Check Bathrooms', completed: false, initials: [] },
          { name: 'Check Change Rooms 1', completed: false, initials: [] },
          { name: 'Check Change Rooms 2', completed: false, initials: [] },
          { name: 'Squeegee Floors 1', completed: false, initials: [] },
          { name: 'Squeegee Floors 2', completed: false, initials: [] },
          { name: 'Check Pool Debris', completed: false, initials: [] },
        ],
        evening: [
          { name: 'Check Bathrooms', completed: false, initials: [] },
          { name: 'Check Change Rooms', completed: false, initials: [] },
          { name: 'Squeegee Floors', completed: false, initials: [] },
          { name: 'Check Pool Debris', completed: false, initials: [] },
        ],
      },
    };
  },
  mounted() {
    const modalElement = document.getElementById(this.dailyroutineTaskModalId);
    this.modalInstance = new Modal(modalElement);
    this.setLoggedInUser();
    this.generateDailyroutineTaskLogId();
    this.loadUserDailyroutineTasks();
  },
  methods: {
    openModal() {
      this.modalInstance.show();
    },
    closeModal() {
      this.modalInstance.hide();
    },
    setLoggedInUser() {
      const loggedInUser = JSON.parse(localStorage.getItem('user'));
      if (loggedInUser && loggedInUser.username) {
        this.loggedInUser = loggedInUser.username;
        this.dailyroutineTaskData.employeeId = this.loggedInUser;
      }
    },
    loadUserDailyroutineTasks() {
      const tasks = localStorage.getItem('dailyroutineTasks');
      if (tasks) {
        this.dailyroutineTaskGroups = JSON.parse(tasks);
      }
    },

    generateDailyroutineTaskLogId() {
      const today = new Date();
      const year = today.getFullYear();
      const storedTaskLog = JSON.parse(localStorage.getItem('dailyroutineTaskLogId')) || { lastDate: '', lastId: `${year}099` };

      if (storedTaskLog.lastDate !== today.toISOString().split('T')[0]) {
        // New day, increment taskLogId
        const lastNumber = parseInt(storedTaskLog.lastId.slice(4), 10);
        const newNumber = lastNumber + 1;
        const newDailyroutineTaskLogId = `${year}${newNumber}`;

        this.dailyroutineTaskData.dailyroutineTaskLogId = newDailyroutineTaskLogId;
        localStorage.setItem('dailyroutineTaskLogId', JSON.stringify({ lastDate: today.toISOString().split('T')[0], lastId: newDailyroutineTaskLogId }));
      } else {
        this.dailyroutineTaskData.dailyroutineTaskLogId = storedTaskLog.lastId;
      }
    },
    toggleDailyroutineTask(timeOfDay, index) {
      const taskList = this.dailyroutineTaskGroups[timeOfDay];
      const task = taskList[index];
      task.completed = !task.completed;

      if (task.completed && !task.initials.includes(this.loggedInUser)) {
        task.initials.push(this.loggedInUser);
      } else if (!task.completed) {
        task.initials = [];
      }
      this.saveDailyroutineTask();
    },
    saveDailyroutineTask() {
      // Add logId to each task before saving
      Object.keys(this.dailyroutineTaskGroups).forEach(period => {
        this.dailyroutineTaskGroups[period].forEach(task => {
          task.logId = task.logId || this.generateDailyroutineTaskLogId(); // Ensure each task has a logId
        });
      });

      // Save both tasks and taskLogId to localStorage
      localStorage.setItem('dailyroutineTasks', JSON.stringify(this.dailyroutineTaskGroups));
      localStorage.setItem('dailyroutineTaskLogId', JSON.stringify({ lastDate: new Date().toISOString().split('T')[0], lastId: this.dailyroutineTaskData.dailyroutineTaskLogId }));
    },
    confirmOpeningDailyroutineTask() {
      this.saveDailyroutineTask();
      alert('Daily routine tasks saved successfully!');
      this.closeModal();
    },
  },
};
</script>
<style scoped>
.modal-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
}

.table {
  margin-bottom: 0;
}
</style>