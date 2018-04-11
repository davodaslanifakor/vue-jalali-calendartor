<template>
  <section class="container">
  	<div class="row">
      <!-- 'offset-3':isSidebar, ,{'col-md-9':isSidebar,'col-lg-9':isSidebar,'col-lg-12':!isSidebar}-->
  		<div :class="['aside-trans col-lg-12']"> 
       <!-- user list -->
      <last-user :items="lastUser" :type-list="'avatar-item'"/>
  		</div>
  	</div>
  </section>
</template>

<script>
import userList from '~/components/list/list-item.vue'
export default {
    layout: 'default',
    components: {
      'last-user':userList
    },
    computed: {
    // constatnts () {
    //   return this.$store.state.constatnts.url
    // },
      isSidebar(){
      return this.$store.state.sidebar.openSidebar
    }
  },
  data(){
    return{
        lastUser:[
          {name:'داود اصلانی فکور',avatar:'/img/male.png',old:26,isSubmenu:false},
          {name:'شهناز سنجری نیا',avatar:'/img/famel.png',old:24,isSubmenu:false}
        ]
    }
  },
  
  mounted(){
  }
}
</script>

<style>
.aside-trans{
  transition: all 0.4s cubic-bezier(0.63,-0.28, 0.74, 0.05);
}
</style>
