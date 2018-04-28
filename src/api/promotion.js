import fetch from './fetch';

export {
    createShop,
    getShopList,
    updateShop,
    deleteShop,
    getCategoryList
};
function createShop (ids, req) {
    return fetch('post', '/promotion/createShop', ids, req);
}
function getShopList (ids, req) {
    return fetch('get', '/promotion/shoplist', ids, req);
}
function updateShop (ids, req) {
    return fetch('post', '/promotion/updateShop', ids, req);
}
function deleteShop (ids, req) {
    return fetch('delete','/promotion/deleteShopById',ids,req);
}
function getCategoryList (ids, req) {
    return fetch('get', '/category/list', ids, req);
}