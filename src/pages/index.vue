<template>
 <div class="home">
        <!-- <router-view></router-view> -->
          <app-calendar/>
 </div>
</template>

<script>
import calendar from '~/components/calendar.vue'
export default {
  components: {
    'app-calendar':calendar
  },
  computed: {
  },
  data(){
    return{
    }
  },
  mounted(){
  }
}
</script>

<style style="less">
  .home{
    padding-top: 60px;
  }
</style>
