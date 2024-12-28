<template>
  <q-layout view="hHh lpR lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
        <div class="absolute-center">
          <q-icon name="savings" />
          Moneybolles
          </div>
        </q-toolbar-title>

     
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      class="bg-primary"
      :width="250"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
        class="text-white"
          header
        >
          Navigation
        </q-item-label>

        <NavLink
          v-for="link in navLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import NavLink from 'src/components/Nav/NavLink.vue';

defineOptions({
  name: 'MainLayout'
})

const navLinks = [
  {
    title: 'Entries..',
    icon: 'savings',
    link: '/'
  },
  {
    title: 'Settings..',
    icon: 'settings',
    link: '/settings'
  },
  {
    title: 'About',
    icon: 'info',
    link: '/about'
    },

]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
