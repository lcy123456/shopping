import service from '@/utils/request';

export const shoppingAdd = data => {
    return service({
        url: '/api/shopping/add',
        method: 'post',
        data
    });
};

export const getShoppingList = data => {
    return service({
        url: '/api/shopping/list',
        method: 'post',
        data
    });
};

export const addOrder = data => {
    return service({
        url: '/api/order/add',
        method: 'post',
        data
    });
};

export const getOrderList = data => {
    return service({
        url: '/api/order/list',
        method: 'get',
        data
    });
};

export const getHistoryOrderList = data => {
    return service({
        url: '/api/order/history/list',
        method: 'get',
        data
    });
};
