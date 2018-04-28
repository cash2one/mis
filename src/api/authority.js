import fetch from './fetch';

export {
    addRole,
    getRoleList,
    deleteRole,
    assignUsers,
    getRolePms,
    getPmsTree,
    configPms,
    addAdmin,
    getAdminList,
    deleteAdmin
};
// 添加角色
function addRole (ids, req, type) {
    return fetch('post', '/role/add', ids, req, type);
}
// 角色列表
function getRoleList (ids, req) {
    return fetch('get', '/role/list', ids, req);
}
// 删除角色
function deleteRole (ids, req) {
    return fetch('delete', '/role/'+ids[0]+'/delete', '', req);
}
// 分配账号
function assignUsers (ids, req, type) {
    return fetch('post', '/role/'+ids[0]+'/assignUsers', '', req, type);
}
// 角色权限
function getRolePms (ids, req) {
    return fetch('get', '/role/'+ids[0]+'/listPermission', '', req);
}
// 权限列表
function getPmsTree (ids, req) {
    return fetch('get', '/permission/showTree', ids, req);
}
// 分配权限
function configPms (ids, req, type) {
    return fetch('post', '/role/'+ids[0]+'/configPermissions', '', req, type);
}
// 添加账号
function addAdmin (ids, req, type) {
    return fetch('post', '/admin/add', ids, req, type);
}
// 账号用户
function getAdminList (ids, req) {
    return fetch('get', '/admin/list', ids, req);
}
// 删除账号
function deleteAdmin (ids, req) {
    return fetch('delete', '/admin/delete', ids, req);
}