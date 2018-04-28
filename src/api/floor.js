import fetch from './fetch';

export { getFloorList, addFloor, deleteFloor };

function getFloorList (ids, req) {
    return fetch('get', '/floor/list', ids, req);
    /*
    return Promise.resolve({
        "status": "success",
        "message": {
            "list": [
                {
                    "id": 1,
                    "name": "五层",
                    "floor": 1,
                    "mallId": 1
                },
                {
                    "id": 2,
                    "name": "16层",
                    "floor": 16,
                    "mallId": 1
                }
            ]
        }
    });
    */
}
function addFloor (ids, req) {
    return fetch('post', '/floor/add', ids, req);
    // return Promise.resolve({ "result": "success", "message": "" });
}
function deleteFloor (ids, req) {
    return fetch('delete', '/floor/delete', ids, req);
    // return Promise.resolve({ "status": "success", "message": "" });
}