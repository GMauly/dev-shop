/**
 * Created by urielbertoche on 04/07/15.
 */

var carts = {}

function Cart () {
  this.items = {}
}

Cart.prototype.addItem = function (id, price, qty) {
  var item = this.items[id];

  if (!item) {
    this.items[id] = {
      unity_price: price,
      qty: qty,
      total_price: price * qty
    };
  } else {
    item.unity_price = price;
    item.qty = qty;
    item.total_price = price * qty;
  }
}

Cart.prototype.removeItem = function (item) {
  delete this.items[item];
}

Cart.prototype.clear = function () {
  this.items = {}
}

Cart.prototype.list = function () {
  var items_array = [];
  for (var key in this.items) {
    var item = {
      item: key,
      unity_price: this.items[key].unity_price,
      qty: this.items[key].qty,
      total_price: this.items[key].total_price,
    };

    items_array.push(item);
  }

  return items_array;
}

/**
 * A implementar as seguintes funcionalidades
 * - Adicionar item ao carrinho :  token da sessão, código do item, preço e horas
 * - Remover item do carrinho :  token da sessão, código do item
 * - Limpar carrinho : dado token da sessão
 * - Retornar carrinho : dado token da sessão
 */

var addItemToCart = function (cartId, item, price, qty) {
  if (!carts[cartId]) {
    carts[cartId] = new Cart();
  }

  var cart = carts[cartId];
  cart.addItem(item, price, qty);
}

var removeItemFromCart = function (cartId, item) {
  var cart = carts[cartId];
  if (!cart) {
    return
  }

  cart.removeItem(item);
}

var clearCart = function (cartId) {
  var cart = carts[cartId];
  if (!cart) {
    return
  }

  cart.clear();
}

var getCart = function (cartId) {
  if (!carts[cartId]) {
    carts[cartId] = new Cart();
  }

  var cart = carts[cartId];

  return cart.list();
}

var apis = {
  getCart: function (req, res) {
    var cart = getCart(req.sessionID);
    res.end(JSON.stringify(cart));
  },
  clearCart: function (req, res) {
    clearCart(req.sessionID);
    res.end('Cart cleared');
  },
  removeItem: function (req, res) {
    var item = req.params.item;
    removeItemFromCart(req.sessionID, item);
    res.send('Item deleted');
  },
  addItem: function (req, res) {
    var item = req.params.item;
    var qty = req.params.qty;
    var price = req.params.qty;
    addItemToCart(req.sessionID, item, price, qty);
    res.send('Item added');
  }
}

module.exports = apis