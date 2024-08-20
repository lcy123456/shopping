import { createProductList } from './product';
let shoppingCartList = [];
let orderList = [];
let historyOrderList = [];
const addShoppingCart = {
    url: '/api/shopping/add',
    method: 'post',
    response: res => {
        const { body, headers } = res;
        const { id } = body;
        const { authorization } = headers;
        const productList = createProductList();
        const map = productList.find(v => v.id === Number(id));
        const isInCart = !!shoppingCartList.find(v => v.id === map.id);
        if (!isInCart) {
            shoppingCartList.push(map);
        }
        if (!authorization) {
            return { code: 503, data: { message: '请登录' } };
        }
        if (!map) {
            return { code: 201, data: { message: ' 商品不存在 ' } };
        }
        return { code: 200, data: { message: '添加成功' } };
    }
};
const getShoppingCartList = {
    url: '/api/shopping/list',
    method: 'post',
    response: ({ body }) => {
        const { id, offset = 10 } = body;
        const i = !id ? 0 : shoppingCartList.findIndex(v => v.id === id);
        const index = i ? i + 1 : i;
        const l = i !== -1 ? shoppingCartList.slice(index, index + offset) : [];
        return { code: 200, data: l };
    }
};

const addOrder = {
    url: '/api/order/add',
    method: 'post',
    response: ({ body, headers }) => {
        const { list } = body;
        const { authorization } = headers;
        if (!authorization) {
            return { code: 503, data: { message: '请登录' } };
        }
        orderList = [...orderList, ...list];
        historyOrderList = orderList;
        return { code: 200, data: { message: '购买成功' } };
    }
};
const getOrderList = {
    url: '/api/order/list',
    method: 'get',
    response: ({ headers }) => {
        const { authorization } = headers;
        if (!authorization) {
            return { code: 503, data: { message: '请登录' } };
        }
        return { code: 200, data: orderList };
    }
};

const getHistoryOrderList = {
    url: '/api/order/history/list',
    method: 'get',
    response: ({ headers }) => {
        const { authorization } = headers;
        if (!authorization) {
            return { code: 503, data: { message: '请登录' } };
        }
        return { code: 200, data: historyOrderList };
    }
};

export default [
    addShoppingCart,
    getShoppingCartList,
    addOrder,
    getOrderList,
    getHistoryOrderList
];
