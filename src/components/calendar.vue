<template>
<div :class="['calendar',{'fix-calendar':isSroll}]">
  <section class="container">
    <div class="calendar-wrapper" ref="calendarWrapper">
      <div class="row">
        <div class="col-sm-12">
          <div class="header-calendar" :style="fixHeader">
            <div class="row no-gutters">
                <div class="col-sm-2">
                  <div class="action-calendar">
                    <button
                      type="button"
                      class="mdi mdi-calendar"
                      v-ripple="'rgba(15, 72, 128, 0.57)'" v-tooltip="'انتخاب تاریخ'"
                      @click="show=true">
                  </button>
                  <date-picker
                      :auto-submit="true"
                      v-model="dataActive"
                      format="jYYYY/jMM/jDD"
                      element="my-custom-editable-input"
                      :editable="true"
                      :show="show"
                      :color="'#41d3be'"
                      @close="selectDate">
                  </date-picker>
                  <label  @click="show=true" v-tooltip="'انتخاب تاریخ'" v-ripple="'rgba(15, 72, 128, 0.57)'">{{dataActive}}</label>
                  <!-- <div class="form-group">
                        <input type="text" :class="{active:dataActive != ''}" v-model="dataActive">
                        <span class="bar"></span>
                        <label>انتخاب روز</label>
                  </div> -->
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="action-calendar">
                      <button
                        type="button"
                        class="mdi mdi-clock"
                        v-ripple="'rgba(15, 72, 128, 0.57)'" v-tooltip="'انتخاب شروع ساعت تقویم'"
                        @click="showTime = true">
                     </button>
                    <label v-ripple="'rgba(15, 72, 128, 0.57)'" v-tooltip="'انتخاب شروع ساعت تقویم'" @click="showTime = true">
                          نمایش تقویم از ساعت {{startTimeCalendar}}
                    </label>
                    <date-picker
                      type="time"
                      v-model="startTimeCalendar"
                      :show="showTime"
                        element="inputTime"
                        :color="'#41d3be'"
                        @close="selectTime">
                      <!-- min="08:08"
                      max="22:00" -->
                  </date-picker>
                  </div>
                </div>
                <div class="col-sm-4"  v-if="false">
                  <div class="action-calendar">
                    <label> نمایش  از شنبه تا جمعه</label>
                    <button class="mdi mdi-plus" v-ripple="'rgba(15, 72, 128, 0.57)'" v-tooltip="'اضافه کردن'" @click="nextWeek"></button>
                    <button class="mdi mdi-minus" v-ripple="'rgba(15, 72, 128, 0.57)'" v-tooltip="'کم کردن'" @click="pervWeek"></button>
                  </div>
                </div>
                 <div class="col-sm-4">
                  <div class="action-calendar text-left">
                    <label>نمایش تقویم به صورت</label>
                    <button class="mdi mdi-calendar-today" :class="{'active':!isDay}" v-ripple="'rgba(15, 72, 128, 0.57)'" v-tooltip="'روزانه'" @click="modeShow('day')"></button>
                    <button class="mdi mdi-calendar-text" :class="{'active':isDay}" v-ripple="'rgba(15, 72, 128, 0.57)'" v-tooltip="'هفتگی'" @click="modeShow('week')"></button>
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="action-calendar text-left">
                    <!-- deActive -->
                    <button class="mdi mdi-arrow-right " v-ripple="'rgba(15, 72, 128, 0.57)'" v-tooltip="'هفته قبل'" @click="pervWeek"></button>
                    <button class="mdi mdi-arrow-left" v-ripple="'rgba(15, 72, 128, 0.57)'" v-tooltip="'هفته بعد'" @click="nextWeek"></button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row no-gutters">
          <div v-for="(week,index) in weeks" :key="index" class="cols col-sm column" ref="cols">
            <div class="header" :style="fixColsHeader">
                <div class="row">
                  <div class="col-sm-12">
                    <p class="text-center">{{ week.timestamp  | Date}}</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <p class="text-center">{{ week.timestamp  | Dialect}} </p>
                  </div>
                </div>
            </div>
            <div v-for="(item,i) in count" :key="i" :style="{height:scale+'px'}" v-if="(startTime + i * interval) < 24 * 60 " :class="['minute',{'border':item%2==0},{'before-time':(startTime * 60  + week.timestamp + i * interval * 60) < now }]" >
                <!-- {{week.timestamp.valueOf() + (startTime + i  * interval)*60 }} -->

                <div :class="['box-event']" v-for="(visit,index) in events[week.timestamp.valueOf() + (startTime + i  * interval)*60]" :key="index + i" :style="{height: (visit.visitType.duration/interval)*scale+'px'}" v-if="visit.visitType">
                  
                  {{visit.visitType.name}}
                </div>
            </div>
          </div>
      </div>
        <section class="time">
       <div v-for="(item,index) in count" :key="index" :class="['timeMinute']" :style="{height:4*scale+'px'}" v-if="index % 4 == 0 && (startTime + index * interval) < 24 * 60">
            <span>
              {{startTime + (index  * interval) | formatMinute}}
            </span>
        </div>
  </section>
    </div>
  </section>

</div>
</template>
<script>
// import moment from "moment";
import moment from "moment-jalali";
moment.loadPersian({ dialect: "persian-modern" });

var vm
export default {
  data() {
    return {
      isDay: true,
      show: true,
      fixHeader: {},
      now: 0,
      fixColsHeader: {},
      isSroll: false,
      date: "",
      show: false,
      showTime: false,
      weeks: [],
      startTimeCalendar: "08:00",
      startTime: 0,
      realStartWeek: null,
      count: 100,
      interval: 80,
      startWeek: null,
      dataActive: "1397/05/02",
      numberOfDay: 7,
      reloadDate:true,
      scale: 10,
      events: {
        1532151300: [
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
      return moment.unix(date).format("jYYYY/jMM/jD");
    },
    Dialect: function(date) {
      return moment.unix(date).format("dddd");
    },
    
    formatMinute: item => {
      var H = parseInt(item / 60);
      var M = parseInt(item % 60);
      H = H == 0 ? "00" : H && H < 10 ? "0" + H : H;
      M = M == 0 ? "00" : M && M < 10 ? "0" + M : M;
      return H + ":" + M;
      // return  moment(item).format("HH:MM");
    }
  },
  watch: {
    isSroll(val) {
      if (val) {
        var leftOffset = this.$refs.calendarWrapper.offsetLeft + 80;
        var widthElm = this.$refs.calendarWrapper.clientWidth - 100;
        var rightOffset = widthElm - leftOffset; // this.$refs.calendarWrapper.offsetLeft
        this.fixHeader = {
          width: widthElm + "px",
          left: leftOffset + "px"
        };
        var widthCol = this.$refs.cols[0].clientWidth;
        this.fixColsHeader = {
          width: widthCol + "px"
        };
      } else {
        this.fixHeader = {
          width: "",
          left: ""
        };
        this.fixColsHeader = {
          width: ""
        };
      }
    }
  },
  mounted() {
    // return  moment(date, 'jYYYY/jM/jD').unix();
    // console.log(startWeek.format('dddd jMM  jYYYY'))
    // jDD
    vm = this
    this.getWeeks();
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    selectDate() {
      this.show = false;
      console.log(this.dataActive);
      var fromDate = moment(this.dataActive, "jYYYY/jM/jD").format("YYYY/M/D");
      this.getWeeks(fromDate);
    },
    selectTime() {
      this.showTime = false;
      console.log(this.startTimeCalendar);
    },

    pervWeek() {
      this.startWeek.add(-2 * this.numberOfDay, "day");
      this.generateWeeks();
    },
    nextWeek() {
      this.generateWeeks();
    },
    modeShow(mode) {
      if (mode == "week" && !this.isDay) {
        this.isDay = true;
        this.numberOfDay = 7
        this.generateWeeks()
        // heare most be hande week mode
        console.log("heare most be hande week mode");
      } else if (this.isDay && mode == "day") {
        this.numberOfDay = 1
        this.generateWeeks()
        this.isDay = false;
      }
    },
    handleScroll() {
      this.isSroll = window.scrollY > 200;
    },
    moment: function() {
      return moment();
    },
    getWeeks(date) {
      var toDay = new moment();
      if (date) {
        toDay = new moment(date);
      }
      toDay.startOf("day");
      this.startWeek = moment(toDay);
      if (this.numberOfDay == 7 && toDay.day() != 6) {
        this.startWeek = this.startWeek.day(-1);
      }

      this.now = moment().unix();
      this.generateWeeks();
    },

    ///////////////////////////////////////////
    generateWeeks() {
      this.weeks = [];
      this.realStartWeek = moment(this.startWeek);
      for (let i = 0; i < this.numberOfDay; i++) {
        var timestamp = moment(this.startWeek).unix();
        this.weeks.push({
          timestamp: timestamp,
          visitCount: 0
        });
        this.startWeek.add("day", 1);
      }
      this.getSlots();
    },
    processData(data) {
      
      var visitMap = {};
      var slotCount = {};
      data.visitTypes.forEach(function(e) {
        e.visits.forEach(function(d) {
          let startdate = moment(d.start * 1000);
          startdate.startOf("day");
          startdate = startdate.unix();
          if (!visitMap[startdate]) visitMap[startdate] = [];
          d.visitType = e;
          visitMap[startdate].push(d);
        });
      });



      this.interval =5
      if (data.slots.length > 0) {
      // data.slots[0].visitType.duration=5
        if (data.slots[0].visitType.duration <= 15) this.interval = 0.625;else this.interval = 5;
        // this.interval = 5;
        // this.interval = data.slots[0].visitType.duration / 2;
      }
      
      const minMaxSlotHour = { min: 4679951130, max: -1 };
      data.slots.forEach(function(e) {
        // console.log(e)
        // e.visitType.duration =5
        let slotStart = moment(e.start * 1000);
        let startOfDay = moment(slotStart);
        startOfDay.startOf('day')
        var count = e.count;
        var newstart = 0;
      
        var i = -1;
        l1: while (true) {
          
          i++;
          //box_name_day
          var starVisit = i * e.visitType.duration * 60 + (e.start - newstart);
          
          // var endVisit ;
          var endVisit = moment((starVisit + e.visitType.duration * 60) * 1000);
          if (endVisit.unix() > slotStart.unix() + count * e.visitType.duration * 60 ) break l1;

        

          var hasConflict = vm.maxIntersect3(visitMap[startOfDay.unix()] || [],starVisit, endVisit.unix(),e.portion);

          if (hasConflict.possible && vm.now < starVisit) {
            slotCount[startOfDay] = slotCount[startOfDay] ? slotCount[startOfDay] + 1 : 1;
            // vm.events[starVisit] = [{start:starVisit,duration: e.visitType.duration , name:'hsdasda' }];
            vm.$set(vm.events, starVisit , [{start:starVisit , visitType: e.visitType}])

            // vm.reloadDate = reloadDate
            // addTime(id, startdate, starttime, endtime, visittypeid, visittypename, visittypecolor, visittypeduration, condition);

            const minuteStart = vm.timeStampToMinute(starVisit)
            const minuteEnd = minuteStart+e.visitType.duration
            if (minMaxSlotHour.min > minuteStart) minMaxSlotHour.min = minuteStart;
            if (minMaxSlotHour.max < minuteEnd) minMaxSlotHour.max = minuteEnd
          } else {
            if (hasConflict.cursor) {
              newstart += endVisit.unix() - (hasConflict.cursor + 5 * 60);
              console.log(newstart);
            }
          }
          // console.log(id, startdate, starttime, endtime, visittypeid, visittypename, visittypecolor, visittypeduration, condition);
        }
      });
      console.log(minMaxSlotHour.min)
      console.log(minMaxSlotHour.max)
      vm.startTime = minMaxSlotHour.min!=4679951130? minMaxSlotHour.min:0 ;
      if(vm.startTime>8*vm.interval) vm.startTime-=8*vm.interval
      console.log(minMaxSlotHour.max ,vm.startTime ,vm.interval)
      vm.count = minMaxSlotHour.max==-1?288:Math.ceil((minMaxSlotHour.max  - vm.startTime) / vm.interval)
      vm.count+=(vm.count%4)+4
      console.log(vm.count)
      // vm.startTime = 0
      // vm.count=500
      // vm.interval = 5
    },

    timeStampToMinute(timestamp) {
      // console.log(timestamp)
      if(timestamp == 4679951130) return 0
      if(timestamp == -1) return 288
      const d = moment(timestamp * 1000);
      return d.hour() * 60 + d.minute();
    },
    getSlots() {
      axios({
        method: "post",
        url: "https://dev.tebinja.com/patient/doctor/calendarData",
        data: {
          start: this.realStartWeek.unix(),
          end: this.weeks[this.weeks.length - 1].timestamp,
          clinicId: 1,
          doctorId: 1,
          visitId: 1
        }
      }).then(res => {
        console.log(res);
        // vm.maxIntersect3(visits, start, end, slotAgents)
        vm.processData(res.data)
      });
    },

    /////////////////

    maxIntersect3(visits, start, end, slotAgents) {
      console.log('in visits ', visits);
      var startexex = new Date().getTime();
      var cursor = start;
      var maxAgentSum = 0;
      var maxLCM = 1;
      var greatestCursor = void 0;
      var isPossibleVisit = true;

      var _loop = function _loop() {
        var confs = vm.checkConflictIntersect(
          { id: -1, start: cursor, visitType: { duration: 5 } },
          visits
        );
        var lcm = 1;
        var agentSum = 0;
        confs.forEach(function(conf) {
          if (!conf.slot) return;
          lcm = vm.lcm_two_numbers(conf.slot.portion, lcm);
        });
        confs.map(function(conf) {
          if (!conf.slot) return;
          agentSum += lcm / conf.slot.portion;
        });

        if ((lcm - agentSum) * slotAgents < lcm) {
          // there is period of time that occupied whit more than requested agents
          isPossibleVisit = false;
          greatestCursor = cursor;
          console.log("in new if of maxIntersect3");
        }

        var intersect = confs.length;
        if (agentSum / lcm >= maxAgentSum / maxLCM) {
          maxAgentSum = agentSum;
          maxLCM = lcm;
          // greatestCursor = cursor
        }
        cursor += 5 * 60;
      };

      while (cursor < end) {
        _loop();
      }

      var newLCM = vm.lcm_two_numbers(maxLCM, slotAgents);
      maxAgentSum = newLCM / maxLCM * maxAgentSum;
      maxLCM = newLCM;

      // console.log("Requested is : ",maxLCM/slotAgents, maxLCM)
      // console.log("We have just : ",maxLCM - maxAgentSum, maxLCM)
      // console.log("Detail : ",slotAgents, maxAgentSum, maxLCM)
      // const endexec = new Date().getTime()
      // console.log('time is : ', endexec-startexex)
      return { possible: isPossibleVisit, cursor: greatestCursor };
    },

    checkConflictIntersect(visit, visits) {
      visit.end = visit.start + visit.visitType.duration * 60;
      var confs = visits.filter(function(v) {
        v.end = v.start + v.visitType.duration * 60;
        if (v.id != visit.id && v.start < visit.end && v.end > visit.start) {
          return v;
        }
      });
      return confs;
    },
    lcm_array(nums) {
      while (nums.length > 1) {
        var _lcm = vm.lcm_two_numbers(nums[0], nums[1]);
        nums.shift();
        nums.shift();
        nums.unshift(_lcm);
      }
      return nums[0];
    },

    lcm_two_numbers(x, y) {
      if (typeof x !== "number" || typeof y !== "number") return false;
      return !x || !y ? 0 : Math.abs(x * y / vm.gcd_two_numbers(x, y));
    },

    gcd_two_numbers(x, y) {
      x = Math.abs(x);
      y = Math.abs(y);
      while (y) {
        var t = y;
        y = x % y;
        x = t;
      }
      return x;
    }
  }
};
</script>

<style lang="less">
@import (reference) "../assets/css/variable.less";
.calendar {
  .box-clear;
  position: relative;
  margin: 30px;
  .calendar-wrapper {
    .box-clear;
    background: @lightColor;
    padding: 10px 50px;
    position: relative;
    .column {
      .box-clear;
      border-top: 1px solid #ccc;
      border-left: 1px solid #ccc;
      &:first-child {
        border-right: 1px solid #ccc;
      }
      .header {
        background-color: #f5f5f5;
        padding: 5px 0;
        // transition: all 0.3s ease-in;
        p {
          font-size: 14px;
          margin-bottom: 0;
        }
      }
      .border{
        border-bottom: 1px solid #f3f3f3;
      }
      .minute {
        
        position: relative;
        .box-event {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          background-color: #999;
          color: #fff;
          box-shadow: 0 0 5px 0 rgba(0,0,0,.3);
          z-index: 7;
        }
      }
      .before-time {
        background: #f3f3f3;
      }
    }
    .header-calendar {
      .box-clear;
      height: 80px;
      // line-height: 80px;
      background: #fff;
      transition: all 0.3s ease-in;
      padding: 30px 0px;
      .action-calendar {
        .box-clear;
        > button {
          .btn-t-i-circle;
        }
        > label {
          .output;
        }
        > .active {
          background-color: @green;
          color: #fff;
          cursor: not-allowed;
        }
        > .deActive {
          background-color: #ccc;
          // display: none;
          color: #fff;
          cursor: not-allowed;
        }
      }
      // .select-some-date {
      //   .box-clear;
      //   .mdi-calendar,
      //   .mdi-clock {
      //     .btn-t-i-circle;
      //     z-index: 3;
      //   }
      //   > label {
      //     .output;
      //   }
      // }
    }
  }
}

.time {
  position: absolute;
  right: 5px;
  top: 150px;
  .timeMinute {
    height: 20px;
    span {
      color: #000;
      display: block;
      clear: both;
      font-size: 12px;
    }
  }
}
.fix-calendar {
  margin-top: 140px;
  .time {
    // top:120px;
    top: 10px;
  }
  .calendar-wrapper {
    .header-calendar {
      top: 0;
      position: fixed;
      // background: @green !important;
      z-index: 999;
      padding: 5px 0px !important;
      height: 40px !important;
    }
    .column {
      position: relative;
      .header {
        position: fixed;
        z-index: 8;
        top: 40px;
        height: 40px;
        p {
          font-size: 12px;
          height: 15px;
        }
      }
    }
  }
}

.scale-enter-active {
  animation: scale-in 0.2s;
}
.scale-leave-active {
  animation: scale-in 0.3s ease-in-out;
  display: none;

  // reverse
}

.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
@keyframes scale-in {
  0% {
    transform: rotateX(90deg);
    // transform: translateY(-100px);
    opacity: 0;
    visibility: hidden;
  }
  100% {
    visibility: visible;

    opacity: 0.9;
    // transform: translateY(0);

    transform: rotateX(0);
  }
}
</style>
