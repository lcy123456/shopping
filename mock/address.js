let addressList = [];
const addAddress = {
    url: '/api/address/add',
    method: 'post',
    response: ({ body, headers }) => {
        const { authorization } = headers;
        if (!authorization) {
            return { code: 503, data: { message: '请登录' } };
        }
        if (body.id) {
            const index = addressList.findIndex(
                v => Number(v.id) === Number(body.id)
            );
            if (index === -1) {
                return { code: 201, data: { message: '地址不存在' } };
            }
            addressList[index] = body;
        } else {
            addressList.push(body);
        }
        return {
            code: 200,
            data: { message: body.id ? '修改成功' : '添加成功' }
        };
    }
};
const getAddressList = {
    url: '/api/address/list',
    method: 'get',
    response: ({ headers }) => {
        const { authorization } = headers;
        if (!authorization) {
            return { code: 503, data: { message: '请登录' } };
        }
        addressList.forEach((v, i) => {
            v.id = i + 1;
        });
        return { code: 200, data: addressList };
    }
};

export default [addAddress, getAddressList];
