let proName = document.getElementById('name');
let price = document.getElementById('price');
let count = document.getElementById('count');
let category = document.getElementById('category');
let desc = document.getElementById('desc');
let submit = document.getElementById('submit');
let search = document.getElementById('search');


// Update Mode = Change Button Create to Button Update
let mood = 'create';
// Varible Help or وهمي
let tmp;
// -------------------------------Create Product------------------------------------

let dataProduct;
if(localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product)
}else {
    dataProduct = [];
}
// let dataProduct = [];

submit.onclick = function() {
    let newProduct = {
        proName:proName.value,
        price:price.value,
        count:count.value,
        category:category.value,
        desc:desc.value,
    }
    
    /*  1- Add Number Products by Count
        2- don't create product if the mood create
    */
    if(mood === 'create') {
        if(newProduct.count > 1) {
            for(let i = 0; i <= newProduct.count; i++) {
                dataProduct.push(newProduct);
            }
        }else {
            dataProduct.push(newProduct);
        }
        // Update Data
    }else {
        dataProduct[tmp] = newProduct;
        mood = 'create';
        submit.innerHTML = 'Add Product';
        labelCount.style.display = 'block';
        count.style.display = 'block';
    }
    

    // Save LocalStorage
    localStorage.setItem('product', JSON.stringify(dataProduct))

    // Clear Data
    clearData();
    // Read Data
    showData()
}


// Clear Data

function clearData() {
        proName.value = '';
        price.value = '';
        count.value = '';
        category.value = '';
        desc.value = '';
}


// -------------------------------Read Product------------------------------------


function showData() {

    let table = '';
    for(let i = 1; i < dataProduct.length; i++) {
        table += 
        `   
            <tr>
                <td>${i}</td>
                <td>${dataProduct[i].proName}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].count}</td>
                <td>${dataProduct[i].category}</td>
                <td>${dataProduct[i].desc}</td>
                <!-- Update Date -->
                <td><i onclick ="updateProduct(${i})" class="fa-solid fa-pen-to-square up"></i></td>
                <td><i onclick ="deleteProduct(${i})" class="fa-solid fa-trash del"></i></td>
            </tr>
        ` 
    }

    document.getElementById('tbody').innerHTML = table;

    // DeleteAll
    let btnDeleteAll = document.getElementById('deleteAll');
    if(dataProduct.length > 0) {
        btnDeleteAll.innerHTML =   
        `
        <button onclick="deleteAll()"> Delete All (${dataProduct.length - 1})</button>
        `
    }else {
        btnDeleteAll.innerHTML = '';
    } 

}
showData();

// -------------------------------Delete Product------------------------------------

function deleteProduct(i) {
    dataProduct.splice(i, 1);  // 1 = number of product
    localStorage.product = JSON.stringify(dataProduct);
    showData();
}
// Delete All Product
function deleteAll() {
    localStorage.clear();
    dataProduct.splice(0);
    showData();
}



// -------------------------------Update Product------------------------------------
let labelCount = document.getElementById('labelCount')
function updateProduct(i) {
    proName.value = dataProduct[i].proName;
    price.value = dataProduct[i].price;
    labelCount.style.display = 'none'; 
    count.style.display = 'none';
    category.value = dataProduct[i].category;
    desc.value = dataProduct[i].desc;
    submit.innerHTML = 'Update Product';
    mood = 'Update';
    tmp = i;
    scroll({
        top: 0,
        behavior : 'smooth',
    })
}


// -------------------------------Search Product------------------------------------


search.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    let filteredProducts = dataProduct.filter((product, index) => index >= 1 && (
        (product.proName && product.proName.toLowerCase().includes(searchTerm)) ||
        (product.price && product.price.toString().includes(searchTerm)) ||
        (product.count && product.count.toString().includes(searchTerm)) ||
        (product.category && product.category.toLowerCase().includes(searchTerm)) ||
        (product.desc && product.desc.toLowerCase().includes(searchTerm))
    ));
    
    let table = '';
    for(let i = 0; i < filteredProducts.length; i++) {
        table += 
        `   
            <tr>
                <td>${i + 1}</td>
                <td>${filteredProducts[i].proName}</td>
                <td>${filteredProducts[i].price}</td>
                <td>${filteredProducts[i].count}</td>
                <td>${filteredProducts[i].category}</td>
                <td>${filteredProducts[i].desc}</td>
                <td><i onclick="updateProduct(${i})" class="fa-solid fa-pen-to-square up"></i></td>
                <td><i onclick="deleteProduct(${i})" class="fa-solid fa-trash del"></i></td>
            </tr>
        ` 
    }
    document.getElementById('tbody').innerHTML = table;
});