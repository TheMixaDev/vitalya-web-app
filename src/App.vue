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
.dp__input {
  background-color: #efefef!important;
  border-radius: 0.3rem!important;
  border-bottom: 1px solid #d7d7d7!important;
  border-top: none!important;
  border-left: none!important;
  border-right: none!important;
  padding: 0.3rem!important;
  width: 100%!important;
  height: 100%!important;
  max-height: 26.4px!important;
  max-width: 60vw!important;
  text-align: center!important;
}
.dp__action_select {
  background: #f44336!important;
  font-weight: 500!important;
  font-size: 1rem!important;
  padding: 1rem!important;
}
.dp__action_button {
  font-weight: 500!important;
  font-size: 1rem!important;
  padding: 1rem!important;
}
.dp__selection_preview {
  display: none!important;
}
.dp__today {
  border: 1px solid #f44336!important;
}
.dp__active_date {
  background: #f44336!important;
}
.dp--tp-wrap {
  display: none!important;
}
.dp__action_row {
  display: flex!important;
  justify-content: center!important;
  align-items: center!important;
}
.dp__action_buttons {
  justify-content: center!important;
  align-items: center!important;
  margin-inline-start: unset!important;
}
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