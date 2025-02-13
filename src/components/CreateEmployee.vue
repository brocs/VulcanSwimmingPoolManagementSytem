<template>
  <div class="container mt-4">
    <h2>Register Employee</h2>
    <form @submit.prevent="registerEmployee">
      <div class="row mb-3">
        <div class="col-6">
          <label for="Emp_FName" class="form-label">First Name</label>
          <input type="text" class="form-control" v-model="employee.Emp_FName" required>
        </div>
        <div class="col-6">
          <label for="Emp_LName" class="form-label">Last Name</label>
          <input type="text" class="form-control" v-model="employee.Emp_LName" required>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-6">
          <label for="Emp_Email" class="form-label">Email</label>
          <input type="email" class="form-control" v-model="employee.Emp_Email" required>
        </div>
        <div class="col-6">
          <label for="Emp_Phone" class="form-label">Phone</label>
          <input type="text" class="form-control" v-model="employee.Emp_Phone" required>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-6">
          <label for="EmpRole_ID" class="form-label">Role</label>
          <input type="number" class="form-control" v-model="employee.EmpRole_ID" required>
        </div>
        <div class="col-6">
          <label for="Emp_Status" class="form-label">Status</label>
          <select class="form-control" v-model="employee.Emp_Status" required>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-6">
          <label for="Emp_Username" class="form-label">Username</label>
          <input type="text" class="form-control" v-model="employee.Emp_Username" required>
        </div>
        <div class="col-6">
          <label for="Emp_Password" class="form-label">Password</label>
          <input type="password" class="form-control" v-model="employee.Emp_Password" required>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      employee: {
        Emp_FName: '',
        Emp_LName: '',
        Emp_Email: '',
        Emp_Phone: '',
        EmpRole_ID: '',
        Emp_Status: 'Active',
        Emp_Username: '',
        Emp_Password: ''
      }
    };
  },
  methods: {
    async registerEmployee() {
      try {
        await axios.post('http://localhost:5000/api/employee', this.employee); // No need to store response
        alert('Employee registered successfully!');
        this.employee = {
          Emp_FName: '',
          Emp_LName: '',
          Emp_Email: '',
          Emp_Phone: '',
          EmpRole_ID: '',
          Emp_Status: 'Active',
          Emp_Username: '',
          Emp_Password: ''
        };
      } catch (error) {
        console.error('Error registering employee:', error);
        alert('Failed to register employee.');
      }
    }
  }
};
</script>

<style>
.container {
  max-width: 500px;
}

.row .col-6 {
  padding-left: 0;
  padding-right: 0;
}
</style>
