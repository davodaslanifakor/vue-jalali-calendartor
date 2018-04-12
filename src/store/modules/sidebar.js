const state = () => ({
  isSidebar: false,
  sidebarNav: [
    {
      name: 'صفحه اصلی',
      patch: '/',
    }
  ],
})
const mutations = {
  toggleSidebar(state, val) {
    state.isSidebar = !val
  },
}
const actions = {
  toggleSidebar(context, payload) {
    context.commit('toggleSidebar', payload)
  }

}
export default {
  state,
  mutations,
  actions
}
