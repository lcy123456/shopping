import service from '@/utils/request';

export const login = data => {
    return service({
        url: '/api/user/login',
        method: 'post',
        data
    });
};

export const logout = data => {
    return service({
        url: '/api/user/logout',
        method: 'post',
        data
    });
};

export const getUserInfo = data => {
    return service({
        url: '/api/user/info',
        method: 'post',
        data
    });
};
