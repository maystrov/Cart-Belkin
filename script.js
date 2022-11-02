'use strict'

let productsList = []
let cart = {};

axios.get('products.json').then(response => {
    productsList = response.data;
    showProductsList(productsList)
})

function showProductsList(productsList) {
    productsList.forEach(product => {
        const productElem = new Element('div', {
            'data-id': `${product.id}`
        }, {
            'click': handleProductClick

        }, `${product.title} - ${product.price}`)
        productElem.render('#products .items')
    })
}

function handleProductClick(event) {
    const id = event.target.getAttribute('data-id')

    const [clickedProduct] = productsList.filter(product => product.id == id)

    if (cart[id]) {
        cart[id].amount++
    } else {
        cart[id] = {
            ...clickedProduct,
            amount: 1
        }
    }
    renderCart(cart) 
}

function renderCart(cart) {
    document.querySelector("#cart .items").innerHTML = '';
    for (const cartId in cart) {
        const cartElem = new Element('div', {}, {}, `${cart[cartId].title} - ${cart[cartId].price} - ${cart[cartId].amount}`)
        cartElem.render('#cart .items')
    }

    const btn = new Element('button', {type: 'button'}, {click: handleProcessOrder}, 'Process order')
    btn.render('#cart .items')
}

function handleProcessOrder() {
    let orders = []
    if (localStorage.getItem('orders')) {
        orders = JSON.parse(localStorage.getItem('orders'))
    }

    let  cartItems = Object.values(cart)

    const newOrder = {
        items: cartItems,
        dateTime: Date.now()
    };
    orders.push(newOrder)

    localStorage.setItem('orders', JSON.stringify(orders))
}



