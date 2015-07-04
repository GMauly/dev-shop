/**
 * Created by urielbertoche on 03/07/15.
 */

var express = require('express');
var router = express.Router();

var api = require('../../api/cart/cart');

router.get('/', api.getCart);
router.put('/', api.clearCart);

router.post('/:item/:price/:qty/', api.addItem);
router.delete('/:item/', api.removeItem);


module.exports = router