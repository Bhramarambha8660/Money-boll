<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="width: 400px;">
      <q-card-section>
        <!-- User Profile Display Section -->
        <div v-if="!isEditing" class="q-mb-md">
          <div class="text-h6">Profile Details</div>

          <!-- Display Profile Picture -->
          <div class="q-mb-md flex items-center">
            <q-img
              :src="profilePicture || 'images1.jpeg'"
              alt="Profile Picture"
              class="q-mr-md"
              style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;"
            />
            <div>
              <div class="text-body1"><strong>Name:</strong> {{ profile.name || 'Not Provided' }}</div>
              <div class="text-body1"><strong>Email:</strong> {{ profile.email || 'Not Provided' }}</div>
            </div>
          </div>

          <!-- Edit Button -->
          <q-btn @click="toggleEditMode" label="Edit Profile" color="primary" class="q-mt-md" />
        </div>

        <!-- User Profile Form Section (Edit Mode) -->
        <div v-if="isEditing">
          <div class="text-h6">Edit Profile</div>
         

          <!-- Name and Email Input -->
          <q-input
            v-model="profile.name"
            label="Name"
            outlined
            class="q-mb-md"
          />

          <q-input
            v-model="profile.email"
            label="Email"
            outlined
            class="q-mb-md"
          />

          <q-btn @click="updateProfile" label="Save Profile" color="primary" class="full-width" />
          <q-btn @click="toggleEditMode" label="Cancel" color="secondary" class="full-width q-mt-md" />
        </div>

        <!-- Theme Settings Section -->
        <div class="q-mt-md">
          <div class="text-h6">Theme Settings</div>

          <!-- Theme Switch -->
          <q-toggle
            v-model="isDarkMode"
            label="Dark Mode"
            left-label
            class="q-mb-md"
            @update:model-value="toggleTheme"
          />
        </div>

        <!-- Notification Preferences Section -->
        <div class="q-mt-md">
          <div class="text-h6">Notification Preferences</div>

          <!-- Enable Notifications Toggle -->
          <q-toggle
            v-model="notificationsEnabled"
            label="Enable Notifications"
            left-label
            class="q-mb-md"
          />

          <!-- Notification Frequency -->
          <div v-if="notificationsEnabled" class="q-mt-md">
            <q-select
              v-model="notificationFrequency"
              :options="frequencyOptions"
              label="Notification Frequency"
              outlined
              class="q-mb-md"
            />
          </div>
         

        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

// Profile data
const profile = ref({
  name: '',
  email: ''
})

// Dark mode setting
const isDarkMode = ref($q.dark.isActive)

// Editing state
const isEditing = ref(false)

// Notification Preferences
const notificationsEnabled = ref(false)
const notificationFrequency = ref('daily')
const frequencyOptions = ['Immediately', 'Daily', 'Weekly', 'Monthly']

// Profile picture state
const profilePicture = ref(null)

// Update theme dynamically
const toggleTheme = (val) => {
  $q.dark.set(val)
  isDarkMode.value = val
}

// Toggle edit mode
const toggleEditMode = () => {
  isEditing.value = !isEditing.value
}

// Handle profile picture file change
// const handleFileChange = (event) => {
//   const file = event.target.files[0]
//   if (file) {
//     const reader = new FileReader()
//     reader.onload = () => {
//       profilePicture.value = reader.result // Store the base64 image data
//     }
//     reader.readAsDataURL(file)
//   }
// }

// Watch for changes to profile and notification preferences

watch(notificationsEnabled, (newVal) => {
  console.log('Notifications Enabled:', newVal)
})

watch(notificationFrequency, (newVal) => {
  console.log('Notification Frequency:', newVal)
})

// Mock function for updating the profile
const updateProfile = () => {
  console.log('Profile updated:', profile.value)
  isEditing.value = false
}
</script>

<style scoped>
.q-card {
  max-width: 400px;
  width: 100%;
}
</style> 