<template>
  <div class="modal fade" :id="poolCapacityModalId" tabindex="-1" aria-labelledby="capacityModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="capacityModalLabel">Pool Capacity</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <!-- Capacity ID & Employee Fields -->
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="capacityId" class="form-label">Capacity ID</label>
                <input type="text" class="form-control" v-model="capacityId" disabled />
              </div>
              <div class="col-md-6">
                <label for="employee" class="form-label">Employee</label>
                <input type="text" class="form-control" v-model="employee" disabled />
              </div>
            </div>

            <!-- Date, Time & Capacity Count Fields -->
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="dateTime" class="form-label">Date and Time</label>
                <input type="text" class="form-control" :value="dateTime" disabled />
              </div>
              <div class="col-md-6">
                <label for="capacityCount" class="form-label">Capacity Count</label>
                <input type="number" class="form-control" v-model="capacityCount" />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" @click="confirmCapacity">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap"; // Import Bootstrap Modal

export default {
  props: {
    poolCapacityModalId: {
      type: String,
      required: true
    },
    currentCapacity: {  // Receives the current capacity from DashBoard.vue
      type: Number,
      required: true
    },
    loggedInEmployee: {  // Receives the logged-in employee name as a prop
      type: String,
      required: true
    }
  },
  data() {
    return {
      capacityCount: this.currentCapacity, // Initialize with current value
      modalInstance: null,
      employee: this.loggedInEmployee, // Use the passed prop for the logged-in employee
      dateTime: new Date().toLocaleString(), // Get the current date and time
      capacityId: 'CAP001' // Example capacity ID, you can generate or pass dynamically
    };
  },
  watch: {
    currentCapacity(newCapacity) {
      this.capacityCount = newCapacity; // Keep it updated if changed externally
    }
  },
  methods: {
    openModal() {
      if (this.modalInstance) {
        this.capacityCount = this.currentCapacity; // Reset to current value when opened
        this.modalInstance.show();
      }
    },
    confirmCapacity() {
      this.$emit("update-capacity", this.capacityCount);
      if (this.modalInstance) {
        this.modalInstance.hide();
      }
    }
  },
  mounted() {
    const modalElement = document.getElementById(this.poolCapacityModalId);
    if (modalElement) {
      this.modalInstance = new Modal(modalElement);
    }
  },
  beforeUnmount() {
    if (this.modalInstance) {
      this.modalInstance.dispose();
    }
  }
};
</script>

<style scoped>
.bg-success {
  background-color: green !important;
}
.bg-warning {
  background-color: orange !important;
}
.bg-danger {
  background-color: red !important;
}
</style>
