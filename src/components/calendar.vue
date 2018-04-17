<template>
<div class="calendar">
  <section class="container">
    <div class="row no-gutters">
        <div v-for="(week,index) in weeks" :key="index" class="cols col-sm column">
          <div class="header">
              <div class="row">
                <div class="col-sm-12">
                  <p class="text-center">{{ week  | Date}}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12">
                  <p class="text-center">{{ week  | Dialect}} </p>
                </div>
              </div>
          </div>
          <div v-for="item in count" :key="item.id" :class="['minute']" :style="{height:'20px'}">
              <div :class="['box-event']" v-for="(visit,index) in events[week.valueOf() + startTime + item  * interval]" :key="index" :style="{height:'400px'}">
                {{ visit.name }} 
              </div>
          </div>
        </div>
    </div>
  </section>
</div>
</template>
<script>
// import moment from "moment";
import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern" });
export default {
  data() {
    return {
      weeks: [],
      startTime: 0,
      count: 50,
      interval: 5,
      events: {
        1524166200020: [
          {
            start: 300,
            name: "hi"
          }
        ]
      }
    };
  },
  filters: {
    Date: function(date) {
      return moment(date).format("jYYYY/jMM/jD");
    },
    Dialect: function(date) {
      return moment(date).format("dddd");
    },
    formatMinute: item => {
      return item; // parseInt(item / 60) +':'+ parseInt(item % 60)
    }
  },
  mounted() {
    // return  moment(date, 'jYYYY/jM/jD').unix();
    // console.log(startWeek.format('dddd jMM  jYYYY'))
    // jDD
    this.getWeeks();
  },
  methods: {
    moment: function() {
      return moment();
    },
    getWeeks() {
      var toDay = new moment();
      toDay.startOf("day");
      var startWeek = moment(toDay);
      if (toDay.day() != 6) {
        startWeek = startWeek.day(-1);
      }
      console.log(startWeek);

      for (let i = 0; i < 7; i++) {
        this.weeks.push(moment(startWeek));
        startWeek.add("day", 1);
      }
    }
  }
};
</script>

<style lang="less">
@import (reference) "../assets/css/variable.less";
.calendar {
  .box-clear;
  margin: 30px;
  .column {
    .box-clear;
    border-top: 1px solid #e4e4e4;
    border-left: 1px solid #e4e4e4;
    &:first-child {
      border-right: 1px solid #e4e4e4;
    }
    .header {
      background-color: #f5f5f5;
      padding: 5px 0;
      p {
        font-size: 14px;
        margin-bottom: 0;
      }
    }
    .minute {
      border-bottom: 1px solid #e3e3e3;
      position: relative;
      .box-event {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        background-color: #999;
        color: #fff;
      
        z-index: 9;
      }
    }
  }
}
</style>