let productsList = [];
let cart = {};
const cartItemsSelector = '#cart .items';

axios.get('products.json').then(response => {
    productsList = response.data;
}).then(() => {
    showProductsList()
});


function showProductsList() {
    productsList.forEach(product => {
        const productElem = new Element('div', {
            'data-id': product.id,
        }, {
            click: handleProductClick,
        }, `${product.title} ${product.price}`);
        productElem.render('#products .items');
    });
}

// addProductToCart
function handleProductClick(event) {
    const id = event.target.getAttribute('data-id');
    const clickedProduct = productsList.filter(product => product.id == id);

    // cart[id] = clickedProduct;
    // cart[id].amount = 1;
    // the same thing below
    if (cart[id]) {
        cart[id].amount++;
    } else {
        cart[id] = {
            ...clickedProduct[0],
            amount: 1
        };
    }
    renderCart();
}

function renderCart() {
    document.querySelector(cartItemsSelector).innerHTML = '';
    for (let key in cart) {
        const elem = new Element('div', {}, {}, `${cart[key].title} - ${cart[key].price} - ${cart[key].amount}`);
        elem.render(cartItemsSelector);
    }

    // render checkout button
    const btn = new Element('button', { type: 'button' }, {click: handleProcessOrder}, 'Process order');
    btn.render(cartItemsSelector);
}

function handleProcessOrder() {
    let orders = [];
    if (localStorage.getItem('orders')) {
        orders = JSON.parse(localStorage.getItem('orders'));
    }

    const newOrder = {
        items: [...Object.values(cart)],
        dateTime: Date.now()
    };

    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    document.querySelector(cartItemsSelector).innerHTML = '';
    cart = {};
}