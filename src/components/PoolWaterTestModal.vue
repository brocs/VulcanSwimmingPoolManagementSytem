<template>
    <div>  
      <!-- Modal -->
        <div class="modal fade" :id="poolCapacityModalId" tabindex="-1" aria-labelledby="capacityModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="capacityModalLabel">Pool Water Test</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <form>
                    <div class="row">
                    <!-- Pool Test ID -->
                    <div class="col-md-6 mb-3">
                        <label for="poolTestId" class="form-label">Pool Test ID</label>
                        <input type="text" v-model="formData.poolTestId" id="poolTestId" class="form-control" tabindex="1" />
                    </div>
                        <!-- PH -->
                    <div class="col-md-6 mb-3">
                        <label for="ph" class="form-label">PH</label>
                        <input type="number" step="0.1" v-model="formData.ph" id="ph" class="form-control" tabindex="9" />
                    </div>
                    <!-- Employee ID -->
                    <div class="col-md-6 mb-3">
                        <label for="employeeId" class="form-label">Employee ID</label>
                        <input type="text" v-model="formData.employeeId" id="employeeId" class="form-control" tabindex="2" disabled/>
                    </div>
                    <!-- Temperature -->
                    <div class="col-md-6 mb-3">
                        <label for="temperature" class="form-label">Temperature</label>
                        <input type="number" step="0.1" v-model="formData.temperature" id="temperature" class="form-control" tabindex="10" />
                    </div>
                    <!-- Pool Name -->
                    <div class="col-md-6 mb-3">
                        <label for="poolName" class="form-label">Pool Name</label>
                        <input type="text" v-model="formData.poolName" id="poolName" class="form-control" tabindex="3" />
                    </div>
                    <!-- Flow Rate -->
                    <div class="col-md-6 mb-3">
                        <label for="flowRate" class="form-label">Flow Rate</label>
                        <input type="number" step="0.01" v-model="formData.flowRate" id="flowRate" class="form-control" tabindex="11" />
                    </div>
                    <!-- Test Date -->
                    <div class="col-md-6 mb-3">
                        <label for="testDate" class="form-label">Test Date</label>
                        <input type="date" v-model="formData.testDate" id="testDate" class="form-control" tabindex="4" />
                    </div>
                    <!-- Bather Load -->
                    <div class="col-md-6 mb-3">
                        <label for="batherLoad" class="form-label">Bather Load</label>
                        <input type="number" v-model="formData.batherLoad" id="batherLoad" class="form-control" tabindex="12" />
                    </div>
                    <!-- Test Time -->
                    <div class="col-md-6 mb-3">
                        <label for="testTime" class="form-label">Test Time</label>
                        <input type="time" v-model="formData.testTime" id="testTime" class="form-control" tabindex="5" />
                    </div>
                    <!-- Alkalinity -->
                    <div class="col-md-6 mb-3">
                        <label for="alkalinity" class="form-label">Alkalinity</label>
                        <input type="number" step="0.1" v-model="formData.alkalinity" id="alkalinity" class="form-control" tabindex="13" />
                    </div>
                    <!-- Free Chlorine -->
                    <div class="col-md-6 mb-3">
                        <label for="freeChlorine" class="form-label">Free Chlorine</label>
                        <input type="number" step="0.1" v-model="formData.freeChlorine" id="freeChlorine" class="form-control" tabindex="6" />
                    </div>
                    <!-- Cyanuric Acid -->
                    <div class="col-md-6 mb-3">
                        <label for="cyanuricAcid" class="form-label">Cyanuric Acid</label>
                        <input type="number" step="0.1" v-model="formData.cyanuricAcid" id="cyanuricAcid" class="form-control" tabindex="14" />
                    </div>
                    <!-- Combined Chlorine -->
                    <div class="col-md-6 mb-3">
                        <label for="combinedChlorine" class="form-label">Combined Chlorine</label>
                        <input type="number" step="0.1" v-model="formData.combinedChlorine" id="combinedChlorine" class="form-control" tabindex="7" />
                    </div>
                    <!-- Disinfectant Add -->
                    <div class="col-md-6 mb-3">
                        <label for="disinfectantAdd" class="form-label">Disinfectant Add</label>
                        <input type="number" step="0.1" v-model="formData.disinfectantAdd" id="disinfectantAdd" class="form-control" tabindex="15" />
                    </div>
                    <!-- Total Chlorine -->
                    <div class="col-md-6 mb-3">
                        <label for="totalChlorine" class="form-label">Total Chlorine</label>
                        <input type="number" step="0.1" v-model="formData.totalChlorine" id="totalChlorine" class="form-control" tabindex="8" />
                    </div>
                    
                    <!-- Chemical Add -->
                    <div class="col-md-6 mb-3">
                        <label for="chemicalAdd" class="form-label">Chemical Add</label>
                        <input type="number" step="0.1" v-model="formData.chemicalAdd" id="chemicalAdd" class="form-control" tabindex="16" />
                    </div>
                    </div>
    
                    <div class="row">
                    
                    <!-- Comment -->
                    <div class="col-12 mb-3">
                        <label for="comment" class="form-label">Comment</label>
                        <textarea v-model="formData.comment" id="comment" class="form-control" rows="3"></textarea>
                    </div>
                    </div>

                </form>
                </div>
                <div class="modal-footer">
                    <span v-if="lastUpdatedUser && lastUpdatedTime" class="ms-2 text-muted">
                        Last updated by {{ lastUpdatedUser }} at {{ lastUpdatedTime }}
                    </span>
                    <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="confirmWaterTest">Submit</button>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>
  
<script>
    import { Modal } from 'bootstrap';
    
    export default {
        props: {
        poolCapacityModalId: {
            type: String,
            default: "poolWaterTestModal",
        },
        },
        data() {
        return {
            formData: {
            poolTestId: "",
            employeeId: "",
            poolName: "",
            testDate: "",
            testTime: "",
            batherLoad: "",
            ph: "",
            temperature: "",
            flowRate: "",
            alkalinity: "",
            cyanuricAcid: "",
            disinfectantAdd: "",
            freeChlorine: "",
            combinedChlorine: "",
            totalChlorine: "",
            chemicalAdd: "",
            comment: "",
            },
            modalInstance: null,
            lastWaterTestUpdatedUser: "",  // Renamed
            lastWaterTestUpdatedTime: "",  // Renamed
            loggedInUser: "",
        };
    },
    mounted() {
        const modalElement = document.getElementById(this.poolCapacityModalId);
        if (modalElement) {
            this.modalInstance = new Modal(modalElement);
        }
        this.setLoggedInUser();
    },
    methods: {
        openModal() {
            this.modalInstance.show();
        },
        closeModal() {
            this.modalInstance.hide();
        },
        setLoggedInUser() {
            const loggedInUser = JSON.parse(localStorage.getItem("user"));
            if (loggedInUser && loggedInUser.username) {
                this.loggedInUser = loggedInUser.username;
                this.formData.employeeId = this.loggedInUser;
            } else {
                this.loggedInUser = "Unknown";
                this.formData.employeeId = "Unknown";
            }
        },
        confirmWaterTest() {
            this.lastWaterTestUpdatedUser = this.loggedInUser;
            this.lastWaterTestUpdatedTime = new Date().toLocaleTimeString();

            localStorage.setItem(
                "lastWaterTestUpdate",  // Renamed
                JSON.stringify({
                    user: this.lastWaterTestUpdatedUser,
                    time: this.lastWaterTestUpdatedTime,
                })
            );

            alert("Pool Water Test Successfully!");
            this.closeModal();
        },
    },
};
</script>
  
<style scoped>
  .modal-title {
    font-family: "Montserrat", sans-serif;
    font-weight: bold;
  }
  </style>
  