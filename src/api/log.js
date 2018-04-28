import fetch from './fetch';

export { getLogs };

function getLogs (ids, req) {
    return fetch('get', '/log/search', ids, req);
}
