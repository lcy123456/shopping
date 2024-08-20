export const createProductList = keyword => {
    return Array.from({ length: 100 }, (_, i) => {
        const index = i + 1;
        return {
            id: index,
            num: `${index}`,
            price: `${index}.00`,
            desc: `描述信息${index}`,
            title: `商品标题${index}`,
            content: `区块链基础: 成功的区块链项目背后的关键技术和机制。
            智能合约: 如何利用智能合约实现自动化和去中心化。
            实际应用: 金融、供应链、医疗等领域的区块链应用案例。
            挑战与前景: 区块链当前面临的挑战与未来的发展方向。${index}`,
            thumb: `https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg`,
            imgList: [`https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg`]
        };
    }).filter(
        v => !keyword || v.title.includes(keyword) || v.desc.includes(keyword)
    );
};
const getProductList = {
    url: '/api/product/list', // 请求地址
    method: 'post',
    response: ({ body }) => {
        const { id, offset = 10, keyword } = body;
        const productList = createProductList(keyword);
        const i = !id ? 0 : productList.findIndex(v => v.id === id);
        const index = i ? i + 1 : i;
        const l = i !== -1 ? productList.slice(index, index + offset) : [];
        return { code: 200, data: l };
    }
};
const getProductInfo = {
    url: '/api/product/info', // 请求地址
    method: 'get',
    response: ({ query }) => {
        const { id } = query;
        const productList = createProductList();
        const map = productList.find(v => v.id === Number(id));
        if (!map) {
            return { code: 201, data: { message: ' 商品不存在 ' } };
        }
        return { code: 200, data: map || {} };
    }
};

export default [getProductList, getProductInfo];
