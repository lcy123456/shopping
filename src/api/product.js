import service from '@/utils/request';

export const getProductList = data => {
    return service({
        url: '/api/product/list',
        method: 'post',
        data
    });
};
export const getProductInfo = id => {
    return service({
        url: `/api/product/info?id=${id}`,
        method: 'get'
    });
};
