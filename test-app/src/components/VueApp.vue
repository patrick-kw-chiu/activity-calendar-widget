<template>
  <div>
    <button v-on:click="generateData">Re-generate `data`</button>
    <button v-on:click="generateDaysToRender">
      Re-generate `daysToRender`
    </button>
    <ActivityCalendarWidget :data="data" :daysToRender="daysToRender" />
  </div>
</template>

<style>
button {
  margin-right: 8px;
}
</style>

<script>
import ActivityCalendarWidget from '../output/vue/src/ActivityCalendarWidget.vue';

import { getDays } from './utils';

const _generateData = (daysToRender) => {
  const data = getDays(daysToRender);
  return data;
};

export default {
  name: 'vue-app',
  components: { ActivityCalendarWidget: ActivityCalendarWidget },
  data() {
    return {
      data: _generateData(150),
      daysToRender: 150,
    };
  },
  methods: {
    generateDaysToRender() {
      const daysToRender = Math.floor(Math.random() * 50) + 125;
      console.log({ daysToRender });
      this.daysToRender = daysToRender;
    },
    generateData() {
      const data = _generateData(this.daysToRender);
      console.log({ data });
      this.data = data;
    },
  },
};
</script>
