import service from '@/utils/request';

export const addAddress = data => {
    return service({
        url: '/api/address/add',
        method: 'post',
        data
    });
};

export const getAddressList = data => {
    return service({
        url: '/api/address/list',
        method: 'get',
        data
    });
};
