// VARIABLES

const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDom = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');


let cart =[];
let buttonsDOM = [];

// GETTING PRODUCTS
class Products{
async getProducts(){ // Wait for fetch
    try{
        let result = fetch("products.json");
        let data = await (await result).json()
       // return data; // Gets all information on JSON file

       let products = data.items;
       products = products.map(item =>{
           const {title,price} = item.fields;
           const {id} = item.sys;
           const image = item.fields.image.fields.file.url;
           return {title,price,id,image};
       })
       return products;
    }
    catch(error){
        console.log(error);
    }
}
}

// Display Products (Get items from class Products)
class UI{
displayProducts(products){
let result = '';

products.forEach(product => {
    result += ` <!-- SINGLE PRODUCT-->
    <article class="product">
        <div class="img-container">
            <img src=${product.image} alt="product" class="product-img">
            <button class="bag-btn" data-id=${product.id}>
                <i class="fas fa-shopping-cart"></i>
                Add to bag
            </button>
        </div>
        <h3>${product.title}</h3>
        <h4>$${product.price}</h4>
    </article>
    <!-- SINGLE PRODUCTS END-->`;
});
productsDOM.innerHTML = result;
}

getBagButtons(){
    const buttons = [...document.querySelectorAll('.bag-btn')]; // Turns it into array (spread operator)
    buttonsDOM = buttons; // That way outside buttonsDOM is updated with this method.
    buttons.forEach(button =>{
        let id = button.dataset.id; // array property "1", "2"
        let inCart = cart.find(item => item.id === id); // If item ID in cart is same as button id
        if(inCart){
            button.innerText = 'In Cart';
            button.disabled = true;
        }
        else{
            button.addEventListener('click', (event)=>{
                event.target.disabled = true;
                // Get product from Products (class)
                let cartItem = Storage.getProduct(id)
                console.log(cartItem)

                // Add product to cart

                // Save cart in local storage

                // Set cart values
                
                // Display cart item

                // Show the cart
                
            })        
        }
    })
    }
}

// Local Storage

class Storage{
    static saveProducts(products){  // parameter
        localStorage.setItem("products", JSON.stringify(products)); // JS object into JSON string
    } 

    static getProduct(id){
        let products = JSON.parse(localStorage.getItem('products')); // JSON string => JS obnject
        return products.find(product => product.id === id);
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    const ui = new UI();
    const products = new Products();

    //Get All Products

    products.getProducts().then(products =>{
        ui.displayProducts(products); // display each product
        Storage.saveProducts(products);
    }).then(() =>{
        ui.getBagButtons();
    })

});
