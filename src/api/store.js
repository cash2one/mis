import fetch from './fetch';

export { getStoreList, updateStore, addStore, deleteStore, getRateList,assignAdmin };

function getStoreList (ids, req) {
    return fetch('get', '/mall/list', ids, req);
}
function updateStore (ids, req) {
    return fetch('post', '/mall/update', ids, req);
    // return Promise.resolve({"result":"success","message":""});
}
function addStore (ids, req) {
    return fetch('post', '/mall/add', ids, req);
    // return Promise.resolve({"result":"success","message":""});
}
function deleteStore (ids, req) {
    return fetch('delete', '/mall/delete', ids, req);
    // return Promise.resolve({"status": "success","message":""});
}
function getRateList (ids, req) {
    return fetch('get', '/mall/rate', ids, req);
    // return Promise.resolve({"status":"success","message":{"list":[{"date":"2017-09-25","total":1627,"iosTotal":816,"iosApiRate":0.0,"iosUserRate":0.4301,"androidTotal":811,"androidUserRate":0.5771,"totalRate":0.5034}]}});
}
// 分配账号
function assignAdmin (ids, req, type) {
    return fetch('post', '/mall/'+ids[0]+'/assignAdmin', '', req, type);
}