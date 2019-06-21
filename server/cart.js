const loger = require('./loger');

let add = (cart, req) => {
    cart.contents.push(req.body);
    loger.writeLog("add", req.body.id_product);
    return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    loger.writeLog("change", +req.params.id);
    return JSON.stringify(cart, null, 4);
};
let del = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    let index = cart.contents.indexOf(find);
    cart.contents.splice(index, 1);
    loger.writeLog("delete", +req.params.id);
    return JSON.stringify(cart, null, 4);
};
let clear = (cart) => {
    cart.contents = [];
    loger.writeLog("clear");
    return JSON.stringify(cart, null, 4);
};

module.exports = {
    add,
    change,
    del,
    clear
};