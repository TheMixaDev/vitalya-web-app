<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <notifications position="top center"
                   classes="n-light"
                   :max="3"
                   :width="400"/>
  <RouterView />
</template>

<style>
.n-light {
  margin: 10px;
  margin-bottom: 0;

  border-radius: 3px;
  font-size: 16px;

  padding: 10px 20px;

  color: #495061;
  background: #EAF4FE;

  border: 1px solid #D4E8FD;

  .notification-title {
    letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 12px;
    color: #2589F3;
  }
}
</style>