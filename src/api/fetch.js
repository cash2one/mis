import axios from 'axios';

export default (method, url, ids, req, type = 'json') => {
    const methods = method || 'get';
    return new Promise((resolve, reject) => {
        if(Array.isArray(ids) && ids.length > 0) {
            url += '/' + ids.join('/');
        }
        const options = {
            url: url,
            method: methods,
            withCredentials: true
        };
        if(type == 'json') {
            options.headers = { 'Content-Type': 'application/json' };
        } else if (type == 'form') {
            options.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        }

        if(methods == 'get') {
            options.params = req;
        } else {
            options.data = req;
            if(type == 'json') {
                options.transformRequest = [];
                options.transformRequest.push(function (data) {
                // Do whatever you want to transform the data
                    return data && JSON.stringify(data);
                });
            } else {
                options.transformRequest = [(data) => {
                    const params = new URLSearchParams();
                    Object.entries(data).forEach(entry => {
                        params.append(...entry);
                    });
                    return params.toString();
                }];
            }
        }
        
        axios(options).then(res => {
            if(res.data.status !== 'success')
                reject(res.data);
            else
                resolve(res.data);
        }).catch(error => {
            // console.dir(error);
            if(!error.response) {
                sessionStorage.clear();
                location.reload(true);
            }
            reject(error);
        });
    });
};
