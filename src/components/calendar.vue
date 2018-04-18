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
                    <button class="mdi mdi-arrow-right deActive" v-ripple="'rgba(15, 72, 128, 0.57)'" v-tooltip="'هفته قبل'" @click="pervWeek"></button>
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
              <!-- {{startTime + item  * interval | formatMinute}} -->
                <div :class="['box-event']" v-for="(visit,index) in events[week.valueOf() + startTime + item  * interval]" :key="index" :style="{height:'400px'}">
                  {{ visit.name }} 
                </div>
            </div>
          </div>
      </div>
        <section class="time">
       <div v-for="(item,index) in count" :key="item.id" :class="['timeMinute']" :style="{height:'20px'}" v-if="index / 0 != 0">
            <span>
              {{startTime + item  * interval | formatMinute}}
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
export default {
  data() {
    return {
      isDay:true,
      show:true,
      fixHeader:{},
      fixColsHeader:{},
      isSroll:false,
      date: "",
      show: false,
      showTime: false,
      weeks: [],
      startTimeCalendar: "08:00",
      startTime: 0,
      count: 50,
      interval: 5,
      dataActive: "1370/03/26",
      events: {
        1524166200028: [
          // 1524166200020
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
        var H = parseInt(item / 60)
        var M = parseInt(item % 60)
         H =  H == 0 ? '00' : H && H < 10 ? '0' + H : H 
         M =  M == 0 ? '00' : M && M < 10 ? '0' + M : M 
      return H +':'+ M
      // return  moment(item).format("HH:MM");
    }
  },
  watch:{
    isSroll(val){
      if(val){
        var leftOffset = this.$refs.calendarWrapper.offsetLeft + 80
        var widthElm = this.$refs.calendarWrapper.clientWidth - 100
        var rightOffset =widthElm - leftOffset   // this.$refs.calendarWrapper.offsetLeft
        this.fixHeader = {
          width:widthElm + 'px',
          left:leftOffset +  'px',
        }
        var widthCol = this.$refs.cols[0].clientWidth
        this.fixColsHeader = {
          width:widthCol + 'px',
        }

        
      }else{
        this.fixHeader = {
          width:'',
          left:''
        }
        this.fixColsHeader = {
          width:'',
        }
      }
    }
  },
  mounted() {
    // return  moment(date, 'jYYYY/jM/jD').unix();
    // console.log(startWeek.format('dddd jMM  jYYYY'))
    // jDD
    this.getWeeks();
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    selectDate(){
      this.show=false
      console.log(this.dataActive)
      
    },
    selectTime(){
      this.showTime=false
      console.log(this.startTimeCalendar)
      
    },
    modeShow(mode){
      if(mode == 'week' && !this.isDay){
        this.isDay = true
        // heare most be hande week mode
        console.log('heare most be hande week mode')
      }else if (this.isDay && mode == 'day'){
        this.isDay = false
      }

    },
     handleScroll() {
        this.isSroll = window.scrollY > 200;
    },
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
      for (let i = 0; i < 7; i++) {
        this.weeks.push(moment(startWeek));
        startWeek.add("day", 1);
      }
    },
    pervWeek() {
      console.log("hi");
    },
    nextWeek() {
      console.log("by");
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
      border-top: 1px solid #e4e4e4;
      border-left: 1px solid #e4e4e4;
      &:first-child {
        border-right: 1px solid #e4e4e4;
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

          z-index:7;
        }
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
        > .active , .deActive{
          background-color: @green;
          color:#fff;
          cursor:not-allowed;
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

.time{
  position: absolute;
  left: 5px;
  top:150px;
  .timeMinute{
    height: 20px;
    span{
        color:#000;
        display: block;
        clear: both;
        font-size: 12px;
    }
    
  }
}
.fix-calendar{
  margin-top: 140px;
  .time{
    // top:120px;
    top:10px;
  }
  .calendar-wrapper{

  .header-calendar{
      top:0;
      position: fixed;
      // background: @green !important;
      z-index: 999;
      padding: 5px 0px !important;
      height: 40px !important;
  }
  .column{
    position: relative;
     .header{
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
</style>
