<template>
  <div class="layout">
    <!-- <div class="el1full" v-bar>
      <div class="el2full" > -->
        <app-sidebar/>
        <div class="main-layout">
          	<router-view></router-view>
        </div>
        <app-footer/>
      <!-- </div>
    </div> -->
  </div>
</template>
<script>
import sidebar from '~/components/sidebar.vue'
import footer from '~/components/footer.vue'
export default {
 layout: 'default',
 components: {
  'app-sidebar':sidebar,
  'app-footer':footer,
},

data(){
    return {
      defaultHeight:'450px'
    }
  },
  mounted(){
    // this.defaultHeight = window.innerHeight - 338   +'px'
  }
}

</script>
<style lang="less">

body {
  margin: 0;
  // overflow: hidden;
  // padding: 0;
  // -webkit-overflow-scrolling: touch;
}
.el1full {
  display: block;
  width: auto;
  height: 100vh;
}  
.el1full {
  display: block;
  width:100%;
  height: 100vh;

}
.main-layout{
  padding: 10px 0;
  min-height: 1200px;
}
</style>
