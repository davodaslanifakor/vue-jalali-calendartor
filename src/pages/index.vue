<template>
 <div class="home">
        <!-- <router-view></router-view> -->
      <app-calendar />
      <!-- :items="slots" -->
 </div>
</template>

<script>
import calendar from '~/components/calendar.vue'
var vm
export default {
  components: {
    'app-calendar':calendar
  },
  computed: {
  },
  data(){
    return{
      slots:[]
    }
  },
  mounted(){
    vm = this
    // axios({
    //   method:'post',
    //   url:'https://dev.tebinja.com/patient/doctor/calendarData',
    //     data:{
    //       start: 1532115000,
    //       end: 1532719800,
    //       clinicId: 1,
    //       doctorId: 1,
    //       visitId: 1,
    //     },
    // }).then(res=>{
    //   vm.slots = res.data.slots
    // })
  }
}
</script>

<style style="less">
  .home{
    padding-top: 60px;
  }
</style>
