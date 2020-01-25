export function SET_COOKIES_INFO(state, user_cookies) {
  state.user_cookies = user_cookies;
}

export function UNSET_COOKIES_INFO(state) {
  state.user_cookies = [];
}

export function UNSET_CART_LIST(state) {
  state.cart_list = []
}

export function SET_CART_LIST(state, cart_list) {
  state.cart_list.push({
    product_id:           cart_list.product_id,
    product_name:         cart_list.product_name,
    product_price:        cart_list.product_price,
    product_quantity:     cart_list.product_quantity,
    product_max_qty:      cart_list.product_max_qty,
    product_current_qty:  cart_list.product_current_qty,
    product_images:       cart_list.product_images
  });
  // state.cart_list.push(cart_list)
}

