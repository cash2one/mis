import fetch from './fetch';

export { getMessageList,approvalMessage,getAppealMessage };

function getMessageList (ids, req) {
    // return new Promise(resolve => {
    //     setTimeout(() => resolve({
    //         "status":"success","message":{
    //             "list":[
    //                 {"id":1,"userPin":"datajingdo","mallid":123,"modelName":"测试模板","modelContent":"这就是个测试的模板！","useTime":1,"modelStatus": 0,"approvalSug":"同意","approvalerPin":"leader","createDate":"2017-12-25","approvalTime":"2017-12-26"},
    //                 {"id":2,"userPin":"datajingdo","mallid":123,"modelName":"测试模板","modelContent":"这就是个测试的模板！","useTime":1,"modelStatus": 1,"approvalSug":"同意","approvalerPin":"leader","createDate":"2017-12-25","approvalTime":"2017-12-26"},
    //                 {"id":3,"userPin":"datajingdo","mallid":123,"modelName":"测试模板","modelContent":"这就是个测试的模板！","useTime":1,"modelStatus": 2,"approvalSug":"同意","approvalerPin":"leader","createDate":"2017-12-25","approvalTime":"2017-12-26"},
    //                 {"id":4,"userPin":"datajingdo","mallid":123,"modelName":"测试模板","modelContent":"这就是个测试的模板！","useTime":1,"modelStatus": 3,"approvalSug":"同意","approvalerPin":"leader","createDate":"2017-12-25","approvalTime":"2017-12-26"}
    //             ]
    //         }
    //     }));
    // });
    return fetch('get', '/shortMessage/listall', ids, req);
}
function approvalMessage (ids, req) {
    // return new Promise((resolve) => setTimeout(() => resolve({"status":"success","message":""}), 1000));
    return fetch('post', '/shortMessage/toapproval', ids, req, 'form');
}

function getAppealMessage (ids, req) {
    return fetch('get', '/shortMessage/appeal', ids, req);
}