import fetch from './fetch';

export { getPositionList, addPosition, deletePosition };

function getPositionList (ids, req) {
    return fetch('get', '/location/list', ids, req);
    /*
    return Promise.resolve({
        "status": "success",
        "message": {
            "list": [
                {
                    "id": 1,
                    "name": "北辰探针5层",
                    "mallId": 1,
                    "shopId": 1,
                    "floorId": 1
                },
                {
                    "id": 2,
                    "name": "回龙观探针",
                    "mallId": 1,
                    "shopId": 0,
                    "floorId": 2
                },
                {
                    "id": 3,
                    "name": "五道口探针",
                    "mallId": 1,
                    "shopId": 0,
                    "floorId": 2
                },
                {
                    "id": 4,
                    "name": "北辰探针16层",
                    "mallId": 1,
                    "shopId": 0,
                    "floorId": 2
                }
            ]
        }
    });
    */
}
function addPosition (ids, req) {
    return fetch('post', '/location/add', ids, req);
    // return Promise.resolve({ "result": "success", "message": "" });
}
function deletePosition (ids, req) {
    return fetch('delete', '/location/delete', ids, req);
    // return Promise.resolve({ "status": "success", "message": "" });
}