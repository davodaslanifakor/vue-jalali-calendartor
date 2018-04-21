<template>
    <div>

    </div>
</template>

<script>
import moment from "moment";
import momentJalali from "moment-jalaali";
momentJalali.loadPersian({ dialect: "persian-modern" });
export default {
  data() {
    return {
      week: []
    };
  },
  mounted() {
    var toDay = new momentJalali();
    var startWeek = momentJalali(toDay)
    if (toDay.day() != 6) {
      startWeek = startWeek.day(-1)
    }
    for (let i = 0; i < 7; i++) {
        startWeek.add(1)
    }
    console.log(startWeek.format('dddd jMM  jYYYY'))
    // jDD
  },
  methods: {}
};
</script>

<style>

</style>