import fetch from './fetch';

export { getShopList,assignAdmin };

function getShopList (ids, req) {
    return fetch('get', '/promotion/shoplist', ids, req);
}
// 分配账号
function assignAdmin (ids, req, type) {
    return fetch('post', '/shop/'+ids[0]+'/assignAdmin', '', req, type);
}