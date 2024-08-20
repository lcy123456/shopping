export default {
    storeUserInfo: state => state.user.userInfo,
    storeToken: state => state.user.userInfo.token,
    storeShoppingList: state => state.order.shoppingList,
    storeOrderList: state => state.order.orderList,
    storeAddressList: state => state.address.addressList,
    storeAddressId: state => state.address.addressId,
    storePreOrderList: state => state.order.preOrderList
};
