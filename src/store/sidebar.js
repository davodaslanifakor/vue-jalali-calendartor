export const state = () => ({
  openSidebar:false,
  sidebarNav: [
  	{
  		text:'صفحه اصلی',
  		path:'/',
  	}  
  ],
})

export const mutations = {
  toggelSidebar(state,val){
    state.openSidebar = !val
  },
 

}

