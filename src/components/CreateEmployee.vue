<template>
  <div class="container mt-5">
    <div class="card shadow-sm">
      <div class="card-header bg-primary text-white">
        <h2 class="mb-0">Register Employee</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="openAdminValidationModal">
          

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="Emp_FName" class="form-label">First Name</label>
              <input
                type="text"
                id="Emp_FName"
                class="form-control"
                placeholder="Enter First Name"
                v-model="emp.Emp_FName"
                required
              />
            </div>
            <div class="col-md-6">
              <label for="Emp_LName" class="form-label">Last Name</label>
              <input
                type="text"
                id="Emp_LName"
                class="form-control"
                placeholder="Enter Last Name"
                v-model="emp.Emp_LName"
                required
              />
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="Emp_Email" class="form-label">Email</label>
              <input
                type="email"
                id="Emp_Email"
                class="form-control"
                placeholder="example@domain.com"
                v-model="emp.Emp_Email"
                required
              />
            </div>
            <div class="col-md-6">
              <label for="Emp_Phone" class="form-label">Phone</label>
              <input
                type="text"
                id="Emp_Phone"
                class="form-control"
                placeholder="(123) 456-7890"
                v-model="emp.Emp_Phone"
                required
              />
            </div>
          </div>

          <div class="row mb-3">
            <!-- Employee ID: Visible but Disabled -->
            <div class="col-md-6">
              <label for="Emp_ID" class="form-label">Employee ID</label>
              <input
                type="text"
                id="Emp_ID"
                class="form-control"
                v-model="emp.empID"
                disabled
              />
            </div>
            <div class="col-md-6">
              <label for="Emp_Password" class="form-label">Password</label>
              <input
                type="password"
                id="Emp_Password"
                class="form-control"
                placeholder="Enter Password"
                v-model="emp.Emp_Password"
                required
              />
            </div>
            
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="EmpRole_ID" class="form-label">Role</label>
                <input
                  type="number"
                  id="EmpRole_ID"
                  class="form-control"
                  placeholder="Enter Role ID"
                  v-model="emp.EmpRole_ID"
                  required
                />
              </div>
            <div class="col-md-6">
              <label for="Emp_Status" class="form-label">Status</label>
              <select
                id="Emp_Status"
                class="form-select"
                v-model="emp.Emp_Status"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <button type="submit" class="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>

    <!-- Admin Validation Modal -->
    <div v-if="showAdminModal" class="modal d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow">
          <div class="modal-header bg-secondary text-white">
            <h5 class="modal-title">Admin Validation</h5>
            <button type="button" class="btn-close" @click="closeAdminValidationModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="adminPassword" class="form-label">Admin Password</label>
              <input
                type="password"
                id="adminPassword"
                class="form-control"
                placeholder="Enter Admin Password"
                v-model="adminCredentials.password"
                required
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeAdminValidationModal">
              Cancel
            </button>
            <button type="button" class="btn btn-primary" @click="validateAdmin">
              Validate
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // nextEmpID is used to generate an incremental and unique employee ID.
      nextEmpID: 1,
      emp: {
        empID: "", // Visible but non-editable.
        Emp_FName: "",
        Emp_LName: "",
        Emp_Email: "",
        Emp_Phone: "",
        Emp_Password: "",
        EmpRole_ID: "",
        Emp_Status: "Active",
      },
      // Only the admin password is required for validation.
      adminCredentials: {
        password: "",
      },
      showAdminModal: false,
    };
  },
  methods: {
    openAdminValidationModal() {
      // Generate an incremental empID when the form is submitted.
      this.emp.empID = this.nextEmpID;
      this.nextEmpID++;
      this.showAdminModal = true;
    },
    closeAdminValidationModal() {
      this.showAdminModal = false;
      this.adminCredentials.password = "";
    },
    async validateAdmin() {
      try {
        // Validate admin credentials by sending only the password.
        const response = await axios.post(
          "http://localhost:5000/api/admin/validate",
          this.adminCredentials
        );
        if (response.data.success) {
          this.closeAdminValidationModal();
          this.registerEmployee();
        } else {
          alert("Admin validation failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("Error during admin validation:", error);
        alert("Failed to validate admin credentials.");
      }
    },
    async registerEmployee() {
      try {
        // API call to register the employee with the provided data.
        await axios.post("http://localhost:5000/api/employee", this.emp);
        alert("Employee registered successfully!");
        // Reset the employee object (except the nextEmpID, which increments independently).
        this.emp = {
          empID: "",
          Emp_FName: "",
          Emp_LName: "",
          Emp_Email: "",
          Emp_Phone: "",
          Emp_Password: "",
          EmpRole_ID: "",
          Emp_Status: "Active",
        };
      } catch (error) {
        console.error("Error registering employee:", error);
        alert("Failed to register employee.");
      }
    },
  },
};
</script>

<style scoped>
/* Modern modal backdrop and centering for a cleaner look */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}
.btn-close {
  background: transparent;
  border: 0;
}
</style>
