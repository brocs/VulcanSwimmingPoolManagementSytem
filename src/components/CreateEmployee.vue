<template>
  <div class="container mt-4">
    <h2>Register User</h2>
    <form @submit.prevent="registerUser">
      <div class="row mb-3">
        <!--<div class="col-6">
          <label for="User_Username" class="form-label">Username</label>
          <input type="text" class="form-control" v-model="user.User_Username" required>
        </div>
        <div class="col-6">
          <label for="User_Password" class="form-label">Password</label>
          <input type="password" class="form-control" v-model="user.User_Password" required>
        </div>-->
        <div class="col-6">
          <label for="User_FName" class="form-label">First Name</label>
          <input type="text" class="form-control" v-model="user.User_FName" required>
        </div>
        <div class="col-6">
          <label for="User_LName" class="form-label">Last Name</label>
          <input type="text" class="form-control" v-model="user.User_LName" required>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-6">
          <label for="User_Email" class="form-label">Email</label>
          <input type="email" class="form-control" v-model="user.User_Email" required>
        </div>
        <div class="col-6">
          <label for="User_Phone" class="form-label">Phone</label>
          <input type="text" class="form-control" v-model="user.User_Phone" required>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-6">
          <label for="UserRole_ID" class="form-label">Role</label>
          <input type="number" class="form-control" v-model="user.UserRole_ID" required>
        </div>
        <div class="col-6">
          <label for="User_Status" class="form-label">Status</label>
          <select class="form-control" v-model="user.User_Status" required>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
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
      user: {
        User_FName: '',
        User_LName: '',
        User_Email: '',
        User_Phone: '',
        UserRole_ID: '',
        User_Status: 'Active',
        //User_Username: '',
        //User_Password: ''
      }
    };
  },
  methods: {
    async registerUser() {
      try {
        await axios.post('http://localhost:5000/api/employee', this.employee); // Updated API endpoint to 'users'
        alert('User registered successfully!');
        this.user = {
          User_FName: '',
          User_LName: '',
          User_Email: '',
          User_Phone: '',
          UserRole_ID: '',
          User_Status: 'Active',
          //User_Username: '',
          //User_Password: ''
        };
      } catch (error) {
        console.error('Error registering user:', error);
        alert('Failed to register user.');
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
