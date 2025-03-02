<template>
  <div>
    <div>
      <HeaderComponent />
      <main>
        <!-- Page Content -->
         
      </main>
    </div>

    <div class="row">
      <!-- Left Sidebar for Buttons (on larger screens) -->
      <div class="col-md-3 col-12">
        <!-- BUTTONS -->
        <div class="container mt-4">
          <div class="d-grid gap-3">
            <button class="btn btn-success btn-lg" id="openingTaskButton" @click="openModal('opening')">Opening Task</button>
          </div>
        </div>

        <div class="container mt-4">
          <div class="d-grid gap-3">
            <button class="btn btn-success btn-lg" id="modalToggle" @click="openModal('daily')">Daily Routine Task</button>
          </div>
        </div>

        <div class="container mt-4">
          <div class="d-grid gap-3">
            <button class="btn btn-success btn-lg" id="modalToggle" @click="openModal('adhoc')">Adhoc Reports</button>
          </div>
        </div>

        <div class="container mt-4">
          <div class="d-grid gap-3">
            <button class="btn btn-success btn-lg" id="modalToggle" @click="openModal('closing')">Closing Task</button>
          </div>
        </div>

        <div class="container mt-4">
          <div class="d-grid gap-3">
            <button class="btn btn-success btn-lg" id="modalToggle" @click="openModal('cap')">Capacity</button>
          </div>
        </div>

        <div class="container mt-4">
          <div class="d-grid gap-3">
            <button class="btn btn-success btn-lg" id="modalToggle" @click="openModal('test')">Pool Water Test</button>
          </div>
        </div>

        <div class="container mt-4">
          <div class="d-grid gap-3">
            <button class="btn btn-success btn-lg" id="modalToggle" @click="openModal('otherclosing')">Other Closing Task</button>
          </div>
        </div>

        <!--<div>
           Other buttons and components 
          <PoolCapacityModal
            ref="poolCapacityModal"
            :poolCapacityModalId="'poolCapacityModal'"
            @update-capacity="updateCapacity"
          />
        </div>-->
        <!-- Modals -->
        <OpeningTaskModal ref="openingModal" />
        <DailyTaskModal ref="dailyModal" />
        <AdhocTaskModal ref="adhocModal" />
        <ClosingTaskModal ref="closingModal" />
        <OtherClosingTaskModal ref="otherclosingModal" />
        <!--<PoolCapacityModal ref="capModal" />-->
        <PoolCapacityModal ref="capModal" :poolCapacityModalId="'poolCapacityModal'" :currentCapacity="formData.capacityCount" @update-capacity="updateCapacity" />

        <PoolWaterTestModal ref="testModal" />
        <!-- End of Modals -->
        
      </div>

      <!-- Main Content -->
      <div class="col-md-9 col-12">
        <div class="row">
          <!-- Daily Routine Task Card -->
          <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="card mb-3">
              <div class="card-header bg-primary text-white">Daily Routine Task</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between">
                  Pool Water Check <span class="badge bg-warning text-dark">Pending</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  Counter People <span class="badge bg-warning text-dark">Pending</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  Bathroom Check <span class="badge bg-warning text-dark">Pending</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  Sanitary Check <span class="badge bg-warning text-dark">Pending</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  Changing Room Check <span class="badge bg-warning text-dark">Pending</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Task Progress Cards -->
          <div class="col-md-9">
            <div class="row u">
              <div class="col-4">
                <div class="card text-center mb-3 huge-height">
                  <div class="card-body">
                    <h5 class="card-title progNum">80%</h5>
                    <p class="card-text">Opening Task Done</p>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="card text-center mb-3 huge-height">
                  <div class="card-body">
                    <h5 class="card-title progNum">85%</h5>
                    <p class="card-text">Throughout The Day Task Done</p>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="card text-center mb-3 huge-height">
                  <div class="card-body">
                    <h5 class="card-title progNum">90%</h5>
                    <p class="card-text">Closing Task Done</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <!--<div class="card text-center bg-danger text-white huge-height">
                  <div class="card-body">
                    <h5 class="card-title progNum desc">160</h5>
                    <p class="card-text progNumdesc">Customer Capacity</p>
                  </div>
                </div>-->
                <div class="card text-center huge-height" :style="capacityCardStyle">
                  <div class="card-body">
                    <h5 class="card-title progNum desc">{{ formData.capacityCount }}</h5>
                    <p class="card-text progNumdesc">Customer Capacity</p>
                  </div>
                </div>


              </div>
              <div class="col-4">
                <div class="card text-center bg-primary text-white huge-height">
                  <div class="card-body">
                    <h5 class="card-title progNum desc">7.2</h5>
                    <p class="card-text progNumdesc">pH Level</p>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="card text-center bg-primary text-white huge-height">
                  <div class="card-body">
                    <h5 class="card-title progNum desc">4</h5>
                    <p class="card-text progNumdesc">Chlorine Level</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';  // Import onMounted hook
import { useRouter } from 'vue-router';  // Import useRouter for routing


import HeaderComponent from "@/components/HeaderComponent.vue";
import OpeningTaskModal from '@/components/OpeningTaskModal.vue';
import DailyTaskModal from '@/components/DailyTaskModal.vue';
import AdhocTaskModal from '@/components/AdhocTaskModal.vue';
import ClosingTaskModal from '@/components/ClosingTaskModal.vue';
import OtherClosingTaskModal from '@/components/OtherClosingTaskModal.vue';
import PoolCapacityModal from '@/components/PoolCapacityModal.vue';
import PoolWaterTestModal from '@/components/PoolWaterTestModal.vue';
//import AdminDashboard from '@/components/Admin-Dashboard.vue';

export default {
  components: {
    HeaderComponent,
    //AdminDashboard,
    OpeningTaskModal,
    DailyTaskModal,
    AdhocTaskModal,
    ClosingTaskModal,
    OtherClosingTaskModal,
    PoolCapacityModal,
    PoolWaterTestModal,
  },
  data() {
    return {
      currentDate: new Date().toLocaleDateString('en-CA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      modalTitle: '',
      employeeId: '',
      password: '',
      users: [],  // Populate with actual user data
      errorMessage: null,
      formData: {
        capacityCount: 0,
        // Other data fields as defined previously
      },
    };
  },
  methods: {
    /*openModal(modalType) {
      this.$refs[`${modalType}Modal`].openModal();
    },*/

    
    // This method will be called when the event is emitted from PoolCapacityModal
    updateCapacity(newCapacity) {
      console.log("Updated Capacity:", newCapacity);
      this.formData.capacityCount = newCapacity;
    },
    
    openModal(modalType) {
      const modalRef = this.$refs[`${modalType}Modal`];
      if (modalRef && modalRef.openModal) {
        modalRef.openModal(); // This should trigger the modal's opening logic
      } else {
        console.error(`${modalType}Modal is not accessible via ref.`);
      }
    },

    handleLogin() {
      this.errorMessage = null;
      if (this.employeeId && this.password) {
        const user = this.users.find(
          (user) => user.username === this.employeeId && user.password === this.password
        );

        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          this.$router.push({ name: 'Dashboard' });  // Using named route (recommended)
        } else {
          this.errorMessage = "Invalid Employee ID or Password.";
        }
      } else {
        this.errorMessage = "Please enter your Employee ID and Password.";
      }
    }
  },

  // FOR POOL CAPACITY
  computed: {
  capacityCardStyle() {
    const capacity = this.formData.capacityCount;
    const maxCapacity = 160;

    // Normalize capacity between 0 and 1
    const normalized = Math.min(Math.max(capacity / maxCapacity, 0), 1);

    // Define RGB values for blue, orange, and red
    const blue = [0, 122, 255];    // #007AFF (Low capacity)
    const orange = [255, 165, 0];  // #FFA500 (Mid capacity)
    const red = [255, 0, 0];       // #FF0000 (Max capacity)

    let startColor, endColor, mix;

    if (normalized <= 0.5) {
      startColor = blue;
      endColor = orange;
      mix = normalized * 2; // Scale between 0-1
    } else {
      startColor = orange;
      endColor = red;
      mix = (normalized - 0.5) * 2; // Scale between 0-1
    }

    // Calculate interpolated color
    const interpolatedColor = startColor.map((start, i) =>
      Math.round(start + (endColor[i] - start) * mix)
    );

    return {
      background: `rgb(${interpolatedColor.join(",")})`,
      color: "#fff", // Ensure text contrast
      transition: "background 0.5s ease-in-out"
    };
  }
},


  setup() {
    const router = useRouter();

    onMounted(() => {
      if (localStorage.getItem('user')) {
        router.push({ name: 'Dashboard' });  // Redirect to Dashboard if user is logged in
      }
    });
  }
};
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.container, .row, .col-md-3, .col-md-9 {
  margin: 0;
  padding: 0;
}

header {
  margin-bottom: 0;
}

main {
  padding-top: 0;
}

.card {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.card-body {
  padding: 50px;
  height: 100%;
  text-align: center;
}

.progNum {
  font-size: 3vw;  /* Use relative font sizing for responsiveness */
  font-weight: bold;
  color: rgba(16, 168, 84, 1);
  font-family: Montserrat;
}

.huge-height {
  height: 250px;
}

@media (max-width: 1024px) {
  .col-md-3 {
    margin-bottom: 20px;
  }
}

@media (max-width: 768px) {
  .col-lg-3 {
    flex: 1 0 100%;
  }

  .btn-lg {
    font-size: 1rem;
    padding: 10px;
  }

  .card-body {
    padding: 20px;
  }

  .progNum {
    font-size: 4vw;  /* Slightly larger for smaller devices */
  }

  .huge-height {
    height: 200px; /* Reduce height for smaller screens */
  }

  .card-body {
    padding: 10px;
  }
}
</style>
