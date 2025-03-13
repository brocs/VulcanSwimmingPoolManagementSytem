<template>
  <div>
    <div>
      <HeaderComponent />
      <main>

      </main>
    </div>

    <div class="row">
      <!-- Task Sidebar / Card Style Button -->
      <div class="col-md-3 p-3">
        <h5 class="mb-3">TASK CARDS</h5>
        
        <div class="container mt-2 card-custom-container">
          <div class="d-grid gap-3 h-100">
            <button class="btn btn-success btn-lg" id="openingTaskButton" @click="openModal('opening')">Opening</button>
          </div>
        </div>

        <div class="container mt-2 card-custom-container">
          <div class="d-grid gap-3 h-100">
            <button class="btn btn-success btn-lg" id="modalToggle" @click="openModal('daily')">Daily</button>
          </div>
        </div>

        <div class="container mt-2 card-custom-container">
          <div class="d-grid gap-3 h-100">
            <button class="btn btn-success btn-lg" id="modalToggle" @click="openModal('otherclosing')">Closing</button>
          </div>
        </div>

        <div class="container mt-2 card-custom-container">
          <div class="d-grid gap-3 h-100">
            <button class="btn btn-success btn-lg" id="modalToggle" @click="openModal('cap')">Weekly Capacity</button>
          </div>
        </div>

        <div class="container mt-2 card-custom-container">
          <div class="d-grid gap-3 h-100">
            <button class="btn btn-success btn-lg" id="modalToggle" @click="openModal('test')">Water Test</button>
          </div>
        </div>

        <div class="container mt-2 card-custom-container">
          <div class="d-grid gap-3 h-100">
            <button class="btn btn-success btn-lg" id="modalToggle" @click="openModal('adhoc')">Incident Reports</button>
          </div>
        </div>

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
      <!-- End of Task Sidebar / Card Style Button -->

      <!-- Dashboard Section -->
      <div class="col-md-5 p-3">
        <div class="col-12">
          <!-- Dashboard view -->
          <h5 class="mb-3">DASHBOARD</h5>
          <div class="card mt-2 card-custom-container">
            <div class="card-body h-100">
              <div class="d-flex justify-content-center align-items-center">
                <div class="d-flex align-items-center" style="width: 20%; justify-content: start;">
                  <h2 class="text-success progNum desc mb-0">85%</h2>
                </div>
                <div class="d-flex align-items-center" style="justify-content: start;">
                  <p class="mb-0 ms-3">Opening Task Done</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 mt-2">
          <div class="card card-custom-container">
            <div class="card-body h-100">
              <div class="d-flex justify-content-center align-items-center">
                <div class="d-flex align-items-center" style="width: 20%; justify-content: start;">
                  <h2 class="text-success progNum desc mb-0">85%</h2>
                </div>
                <div class="d-flex align-items-center" style="justify-content: start;">
                  <p class="mb-0 ms-3">Throughout The Day Task Done</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 mt-2">
          <div class="card card-custom-container">
            <div class="card-body h-100">
              <div class="d-flex justify-content-center align-items-center">
                <div class="d-flex align-items-center" style="width: 20%; justify-content: start;">
                  <h2 class="text-success progNum desc mb-0">85%</h2>
                </div>
                <div class="d-flex align-items-center" style="justify-content: start;">
                  <p class="mb-0 ms-3">Closing Task Done</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 mt-2">
          <div class="card card-custom-container">
            <div class="card-body h-100">
              <div class="d-flex justify-content-center align-items-center">
                <div class="d-flex align-items-center" style="width: 20%; justify-content: start;">
                  <h2 class="text-success progNum desc mb-0">85%</h2>
                </div>
                <div class="d-flex align-items-center" style="justify-content: start;">
                  <p class="mb-0 ms-3">Weekly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End of Dashboard view--> 



        <!-- pH and Chlorine Levels -->
        <div class="col-12 mt-2">
          <div class="card text-center bg-primary text-white customer-con-1">
            <div class="card-body h-100">
              <div class="row">
                <div class="col-6">
                  <h2 class="card-title progNum desc">7.2</h2>
                  <p class="card-text progNumdesc">pH Level</p>
                </div>
                <div class="col-6">
                  <h2 class="card-title progNum desc">4</h2>
                  <p class="card-text progNumdesc">Chlorine Level</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End of pH and Chlorine Levels -->
      </div>
      <!-- End of Dashboard Section -->


      <!-- Notification Sidebar -->
      <div class="col-md-4 p-3">
        <h5 class="mb-3">NOTIFICATION</h5>
        <!-- Daily Routine Task Card -->
        <div class="card mb-2">
          <div class="card-header bg-primary text-white">Daily Routine Task</div>
          <!-- Scrollable List -->
          <ul class="list-group list-group-flush" style="max-height: 660px; overflow-y: auto; padding-right: 10px;">
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Pool Water Check <span class="badge bg-warning text-dark">Pending</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Counter People <span class="badge bg-warning text-dark">Pending</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Bathroom Check <span class="badge bg-warning text-dark">Pending</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Sanitary Check <span class="badge bg-warning text-dark">Pending</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Changing Room Check <span class="badge bg-warning text-dark">Pending</span>
            </li>
            <!-- Repeat Items -->
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Pool Water Check <span class="badge bg-warning text-dark">Pending</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Counter People <span class="badge bg-warning text-dark">Pending</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Bathroom Check <span class="badge bg-warning text-dark">Pending</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Sanitary Check <span class="badge bg-warning text-dark">Pending</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Changing Room Check <span class="badge bg-warning text-dark">Pending</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Changing Room Check <span class="badge bg-warning text-dark">Pending</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Changing Room Check <span class="badge bg-warning text-dark">Pending</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Changing Room Check <span class="badge bg-warning text-dark">Pending</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Changing Room Check <span class="badge bg-warning text-dark">Pending</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Changing Room Check <span class="badge bg-warning text-dark">Pending</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Changing Room Check <span class="badge bg-warning text-dark">Pending</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Changing Room Check <span class="badge bg-warning text-dark">Pending</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Changing Room Check <span class="badge bg-warning text-dark">Pending</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Changing Room Check <span class="badge bg-warning text-dark">Pending</span>
            </li>
            <!-- Continue as needed -->
          </ul>
        </div>


        <!-- Current Occupancy -->
        <div class="card text-center bg-primary text-white mt-2 customer-con-1" :style="capacityCardStyle" @click="enableEdit">
          <div class="card-body h-100">
            <!-- Display Mode: Show capacity when not in edit mode -->
            <h5 v-if="!editMode" class="card-title progNum desc">{{ formData.capacityCount }}</h5>

            <!-- Input field to enter a new capacity when in edit mode -->
            <input v-if="editMode" v-model.number="newCapacity" type="number" class="form-control" ref="capacityInput" placeholder="Enter capacity"/>
            
            <!-- Buttons to submit or cancel edit, only visible when input has a value -->
            <div v-if="editMode && newCapacity !== 0" class="mt-2">
              <button @click.stop="saveCapacity" class="btn btn-primary btn-sm mr-2">Submit</button>
              <button @click.stop="cancelEdit" class="btn btn-secondary btn-sm">Cancel</button>
            </div>

            <p class="card-text progNumdesc">Current Occupancy</p>
          </div>
        </div>
        <!-- End Current Occupancy -->

      </div>

  

    </div> <!-- End Of Row -->
    



  </div> <!-- End of First Div-->
</template>

<script>
import { onMounted } from 'vue';  // Import onMounted hook
import { useRouter } from 'vue-router';  // Import useRouter for routing


import HeaderComponent from "@/components/HeaderComponent.vue";
import OpeningTaskModal from '@/components/OpeningTaskModal.vue';
import DailyTaskModal from '@/components/DailyTaskModal.vue';
import AdhocTaskModal from '@/components/AdhocTaskModal.vue';
//import ClosingTaskModal from '@/components/ClosingTaskModal.vue';
import OtherClosingTaskModal from '@/components/OtherClosingTaskModal.vue';
//import PoolCapacityModal from '@/components/PoolCapacityModal.vue';
import PoolWaterTestModal from '@/components/PoolWaterTestModal.vue';

//import AdminDashboard from '@/components/Admin-Dashboard.vue';

export default {
  components: {
    HeaderComponent,

    //AdminDashboard,

    OpeningTaskModal,
    DailyTaskModal,
    AdhocTaskModal,
    //ClosingTaskModal,
    OtherClosingTaskModal,
    //PoolCapacityModal,
    PoolWaterTestModal,
  },
  data() {
    return {
      currentDate: new Date().toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      }),
      modalTitle: '',
      employeeId: '',
      password: '',
      users: [],  // Populate with actual user data
      errorMessage: null,
      editMode: false, // Flag to toggle input field
      newCapacity: null,

      formData: {
        capacityCount: 0,
        // Other data fields as defined previously
      },
    };
  },
  methods: {
      
    enableEdit() {
      if (!this.editMode) {
        this.editMode = true;
        this.newCapacity = this.formData.capacityCount; // Load current value
        this.$nextTick(() => {
          this.$refs.capacityInput.focus(); // Auto-focus input
        });
      }
    },
    saveCapacity() {
      if (!isNaN(this.newCapacity) && this.newCapacity !== null) {
        this.formData.capacityCount = parseInt(this.newCapacity); // Ensure integer conversion
      }
      this.editMode = false; // Exit edit mode after saving
    },
    cancelEdit() {
      this.editMode = false; // Exit edit mode without saving
      this.newCapacity = 0;  // Reset the newCapacity
    },
    
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
.card-custom-container{
  height: 170px;
}
.customer-con-1{
  height: 350px;
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

/*@media (max-width: 1024px) {
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
    font-size: 4vw; 
  }

  .huge-height {
    height: 200px; 
  }

  .card-body {
    padding: 10px;
  }
}*/
</style>
