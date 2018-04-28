import fetch from './fetch';

export { getWifiList, updateWifi, addWifi, deleteWifi };

function getWifiList (ids, req) {
    return fetch('get', '/probe/list', ids, req);
    /*
    return Promise.resolve({
        "status": "success",
        "message": {
            "list": [
                {
                    "id": 1,
                    "mmac": "20:f4:1b:7d:b8:16",
                    "name": "007db816",
                    "lat": 0,
                    "lng": 11,
                    "locationId": 1,
                    "mark":""
                },
                {
                    "id": 2,
                    "mmac": "20:f4:1b:7d:b7:25",
                    "name": "007db725",
                    "lat": 0,
                    "lng": 0,
                    "locationId": 1,
                    "mark":""
                },
                {
                    "id": 3,
                    "mmac": "20:f4:1b:7d:b7:23",
                    "name": "007db723",
                    "lat": 0,
                    "lng": 0,
                    "locationId": 2,
                    "mark":""
                },
                {
                    "id": 4,
                    "mmac": "20:f4:1b:7d:b7:24",
                    "name": "007db724",
                    "lat": 0,
                    "lng": 0,
                    "locationId": 4,
                    "mark":""
                },
                {
                    "id": 5,
                    "mmac": "20:f4:1b:7d:b7:22",
                    "name": "007db722",
                    "lat": 0,
                    "lng": 0,
                    "locationId": 3,
                    "mark":""
                }
            ]
        }
    });
    */
}
function updateWifi (ids, req) {
    return fetch('post', '/probe/update', ids, req);
    // return Promise.resolve({ "result": "success", "message": "" });
}
function addWifi (ids, req) {
    return fetch('post', '/probe/add', ids, req);
    // return Promise.resolve({ "result": "success", "message": "" });
}
function deleteWifi (ids, req) {
    return fetch('delete', '/probe/delete', ids, req);
    // return Promise.resolve({ "status": "success", "message": "" });
}