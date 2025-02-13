<template>
    <div class="container mt-4">
      <h2>Register Employee</h2>
      <form @submit.prevent="registerEmployee">
        <div class="mb-3">
          <label for="Emp_FName" class="form-label">First Name</label>
          <input type="text" class="form-control" v-model="employee.Emp_FName" required>
        </div>
        <div class="mb-3">
          <label for="Emp_LName" class="form-label">Last Name</label>
          <input type="text" class="form-control" v-model="employee.Emp_LName" required>
        </div>
        <div class="mb-3">
          <label for="Emp_Email" class="form-label">Email</label>
          <input type="email" class="form-control" v-model="employee.Emp_Email" required>
        </div>
        <div class="mb-3">
          <label for="Emp_Phone" class="form-label">Phone</label>
          <input type="text" class="form-control" v-model="employee.Emp_Phone" required>
        </div>
        <div class="mb-3">
          <label for="EmpRole_ID" class="form-label">Role</label>
          <input type="number" class="form-control" v-model="employee.EmpRole_ID" required>
        </div>
        <div class="mb-3">
          <label for="Emp_Status" class="form-label">Status</label>
          <select class="form-control" v-model="employee.Emp_Status" required>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
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
          Emp_Status: 'Active'
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
            Emp_Status: 'Active'
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
  </style>
  