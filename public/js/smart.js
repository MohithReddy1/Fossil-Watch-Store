let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Fossil Mens Gen 4 Explorist Smart Watch',
        tag: 'smart1',
        price: 16099,
        inCart: 0
    },
    {
        name: 'Fossil Gen 4 Sloane Womens Smart Watch',
        tag: 'smart4',
        price: 8395,
        inCart: 0
    },
    {
        name: 'Fossil Mens Gen 3 Explorist Smart Watch',
        tag: 'smart3',
        price: 19995,
        inCart: 0
    },
    {
        name: 'Fossil Gen 5 44mm Womens Smart Watch',
        tag: 'smart5',
        price: 22995,
        inCart: 0
    },
    {
        name: 'Fossil Mens Gen 5E 44mm Smart Watch',
        tag: 'smart2',
        price: 12774,
        inCart: 0
    },
    {
        name: 'Fossil Gen 5 Julianna Womens Smart Watch',
        tag: 'smart6',
        price: 22995,
        inCart: 0
    },
    {
        name: 'Fossil Gen 4 Sloane Womens Smart Watch',
        tag: 'smart4',
        price: 8395,
        inCart: 0
    },
    {
        name: 'Fossil Mens Gen 4 Explorist Smart Watch',
        tag: 'smart1',
        price:16099,
        inCart: 0
    },
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }
    else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    //console.log("My cartItems are", cartItems);

    if (cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }
    else {
        product.inCart = 1;

        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    //console.log("the product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');

    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }
    else {
        localStorage.setItem("totalCost", product.price);
    }
}

// cart js

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");
    let cartCost = localStorage.getItem('totalCost');
    console.log(cartItems);
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="container">
                <div class="product">
                    <button class="removeItem"><img onclick="removeItem('${item.tag}')" src="images/close-circle-outline.svg" width="30px"></button>
                    <img style="height: 200px; width: 150px; border-radius: 10px;" src="./images/${item.tag}.png">
                    <span class="name" >${item.name}</span>
                </div>
                <div class="price">₹ ${item.price}.00</div>
                <div class="quantitys">
                    <img id="decrease" class="decrement" onclick="decrement('${item.tag}')" src="images/backward.svg">
                    <span>${item.inCart}</span>
                    <img class="increment" onclick="increment('${item.tag}')" src="images/forward.svg">
                </div>
                
                <div class="subtotal">
                    ₹ ${item.inCart * item.price}.00
                </div>
            </div>
            `;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                
                <h4 class="basketTotalTitle">
                Total
                </h4>
                <h4 class="basketTotal">
                ₹ ${cartCost}.00
                </h4>
            
            </div>

            <a href="" class="btn">Proceed to Buy</a>
        `
    }
}

function increment(forward){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    //console.log("My cartItems are", cartItems);
    
    cartItems[forward].inCart += 1;

    //console.log(forward);

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

    let cartCost = localStorage.getItem('totalCost');
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    localStorage.setItem("totalCost", parseInt(cartItems[forward].price) + parseInt(cartCost));
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;
    
    document.querySelector('.products').innerHTML ="";
    displayCart();
}

function decrement(backward){

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    //console.log("My cartItems are", cartItems);
    
    // if (cartItems[backward].inCart < 2){
    //     document.getElementById('decrease').onclick = null;
    // }
    
    if (cartItems[backward].inCart>=2)
    {
        cartItems[backward].inCart -= 1;
        localStorage.setItem('cartNumbers', productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        let cartCost = localStorage.getItem('totalCost');
        localStorage.setItem("totalCost", parseInt(parseInt(cartCost) - cartItems[backward].price));
    }
    else{
        cartItems[backward].inCart = 1;
    }
    
    //console.log(backward);

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

    // console.log("My cartCost is", cartCost);
    // console.log(typeof cartCost);
    
    document.querySelector('.products').innerHTML ="";
    displayCart();
}

function removeItem(remove){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cartCost = localStorage.getItem('totalCost');
    

    localStorage.setItem("totalCost", parseInt(cartCost) - parseInt(cartItems[remove].price)*parseInt(cartItems[remove].inCart));

    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    localStorage.setItem('cartNumbers', productNumbers - parseInt(cartItems[remove].inCart));
    document.querySelector('.cart span').textContent = productNumbers - parseInt(cartItems[remove].inCart);
    
    delete cartItems[remove];
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

    document.querySelector('.products').innerHTML ="";
    displayCart();
    
    //window.location.reload();
}


displayCart();
onLoadCartNumbers();