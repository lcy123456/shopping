import md5 from 'md5';
export const createUserList = () => {
    return [
        {
            userID: 1,
            username: 'admin', // 用户名
            password: md5('123456'), // 用户密码
            token: 'token',
            avatar: 'http://oss.shop.eduwork.cn/ad/2020-0820-5f3dfe9530bfd.png'
        }
    ];
};
const login = {
    url: '/api/user/login',
    method: 'post',
    response: ({ body }) => {
        const { username, password } = body;
        const checkUser = createUserList().find(
            item => item.username === username && item.password === password
        );
        if (!checkUser) {
            return { code: 201, data: { message: ' 账号或密码不正确 ' } };
        }
        const { token } = checkUser;
        return { code: 200, data: { token } };
    }
};
const getUserInfo = {
    url: '/api/user/info', // 请求地址
    method: 'post',
    response: res => {
        const { headers } = res;
        const { authorization } = headers;
        const checkUser = createUserList().find(
            item => `Bear ${item.token}` === authorization
        );
        if (!authorization) {
            return { code: 503, data: { message: '请登录' } };
        }
        return { code: 200, data: checkUser };
    }
};
const logout = {
    url: '/api/user/logout',
    method: 'post',
    response: () => {
        return { code: 200, data: { message: '登出成功' } };
    }
};

export default [login, logout, getUserInfo];
