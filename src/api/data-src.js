import fetch from './fetch';

export { getDataSrcList, updateDataSrc, addDataSrc, deleteDataSrc };

function getDataSrcList (ids, req) {
    return fetch('get', '/datasource/list', ids, req);
    /*
    return Promise.resolve({
        "status": "success",
        "message": {
            "list": [
                {
                    "id": 1,
                    "name": "ds1",
                    "connectionUrl": "jdbc:mysql://192.168.194.72:3306/api_db",
                    "connectionUser": "admin",
                    "connectionPwd": "123456",
                    "creatorId": 0,
                    "dtCreate": 1504664574000
                },
                {
                    "id": 2,
                    "name": "ds2",
                    "connectionUrl": "jdbc:mysql://192.168.177.79:3306/blockchain",
                    "connectionUser": "root",
                    "connectionPwd": "root",
                    "creatorId": 0,
                    "dtCreate": 1504664583000
                }
            ]
        }
    });
    */
}
function updateDataSrc (ids, req) {
    return fetch('post', '/datasource/update', ids, req);
    /*
    return Promise.resolve({ "result": "success", "message": "" });
    */
}
function addDataSrc (ids, req) {
    return fetch('post', '/datasource/add', ids, req);
    /*
    return Promise.resolve({ "result": "success", "message": "" });
    */
}
function deleteDataSrc (ids, req) {
    return fetch('delete', '/datasource/delete', ids, req);
    /*
    return Promise.resolve({ "status": "success", "message": "" });
    */
}