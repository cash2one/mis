import fetch from './fetch';

function exit () {
    return fetch('get', `//sso.jdcloud.com/exit?t=${new Date()}`);
}
export {
    exit
};