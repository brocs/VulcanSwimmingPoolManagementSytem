<template>
  <div>
    <HeaderComponent />
    <main class="d-flex">
      <!-- Sidebar -->
      <aside class="bg-dark text-white vh-100 p-3" style="width: 250px;">
        <h4 class="text-center">Admin Dashboard</h4>
        <nav class="nav flex-column">
          <!-- Opening Task Reports Link -->
          <a href="#"
             class="nav-link text-white"
             :class="{ active: showOpeningTaskReport }"
             @click="toggleReport('OpeningTaskReport')">
            Opening Task Reports
          </a>
          <!-- Other Report Links -->
          <a href="#"
             class="nav-link text-white"
             :class="{ active: showDailyRoutineTaskReport }"
             @click="toggleReport('DailyRoutineTaskReport')">
            Daily Routine Task Report
          </a>
          <a href="#" class="nav-link text-white">Daily Task Reports</a>
          <a href="#" class="nav-link text-white">Pool Capacity Reports</a>
          <a href="#" class="nav-link text-white">Pool Water Test Reports</a>
          <a href="#" class="nav-link text-white">Other Closing Task Reports</a>
        </nav>
      </aside>

      <!-- Main Content -->
      <div class="flex-grow-1">
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <span class="navbar-brand">Welcome, Admin</span>
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link" href="#">Profile</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click="openModal('PoolCapacity')">Pool Capacity</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click="logout">Logout</a>
              </li>
            </ul>
          </div>
        </nav>

        <!-- Content Area -->
        <div class="container mt-4">
          <!-- Conditionally Render the Opening Task Report Component -->
          <div class="row">
            <div class="col-md-4">
              <div class="card text-center">
                <div class="card-body">
                  <h5 class="card-title">Users</h5>
                  <p class="card-text">250 Active Users</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card text-center">
                <div class="card-body">
                  <h5 class="card-title">Revenue</h5>
                  <p class="card-text">$10,000 This Month</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card text-center">
                <div class="card-body">
                  <h5 class="card-title">Tasks</h5>
                  <p class="card-text">15 Pending</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Opening Task Report Component -->
          <OpeningTaskReport v-if="showOpeningTaskReport" />
          <DailyRoutineTaskReport v-if="showDailyRoutineTaskReport" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import HeaderComponent from "@/components/HeaderComponent.vue";
import OpeningTaskReport from '@/components/OpeningTaskReport.vue';
import DailyRoutineTaskReport from '@/components/DailyRoutineTaskReport.vue';

const router = useRouter();

// Track the visibility of the reports
const showOpeningTaskReport = ref(false);
const showDailyRoutineTaskReport = ref(false);

// Check if the user is logged in when the component is mounted
onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.role !== 'admin') {
    router.push('/login'); // Redirect to login if no admin user is found
  }
});

// Toggle the visibility of reports
const toggleReport = (reportName) => {
  // Reset all reports to false
  showOpeningTaskReport.value = false;
  showDailyRoutineTaskReport.value = false;

  // Only show the clicked report
  if (reportName === 'OpeningTaskReport') {
    showOpeningTaskReport.value = !showOpeningTaskReport.value;
  } else if (reportName === 'DailyRoutineTaskReport') {
    showDailyRoutineTaskReport.value = !showDailyRoutineTaskReport.value;
  }
};

// Method to open modals (example for 'PoolCapacity')
const openModal = (modalType) => {
  console.log(`${modalType} modal opened`); // You can define a modal system here
};

// Method to handle logout
const logout = () => {
  localStorage.removeItem('user'); // Remove the user from localStorage
  router.push('/login'); // Redirect to login page after logging out
};
</script>

<style scoped>
/* Optional styling for the layout */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

main {
  padding-top: 0;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.active {
  background-color: #007bff;
  font-weight: bold;
}

.flex-grow-1 {
  display: flex;
  flex-direction: column;
}

/* Sidebar height adjustment */
aside {
  height: 100vh;
}
</style>
