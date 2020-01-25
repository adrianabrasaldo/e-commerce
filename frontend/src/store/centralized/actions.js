export function setUserCookies(context, cookies) {
  context.commit('SET_COOKIES_INFO', cookies)
}
export function unsetUserCookies(context) {
  context.commit('UNSET_COOKIES_INFO')
  this.$router.push('/login')  
}

export function setCartList(context, cart_list) {
  context.commit('SET_CART_LIST', cart_list)
}
export function unsetCartList(context) {
  context.commit('UNSET_CART_LIST')
}