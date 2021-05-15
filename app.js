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
}

// Local Storage

class Storage{

}

document.addEventListener('DOMContentLoaded',()=>{
    const ui = new UI();
    const products = new Products();

    //Get All Products

    products.getProducts().then(products => ui.displayProducts(products)) // display each product
})