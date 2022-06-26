document.querySelectorAll("input").forEach(input => {
    input.onfocus = function() {
        let attr = this.getAttribute("placeholder");
        this.setAttribute("placeholder", "");
        input.onblur = function() {
            this.setAttribute("placeholder", attr);
        }
    }
});

let title = document.querySelector("#title");
let price = document.querySelector("#price")
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector(".total");
let count = document.querySelector("#count");
let category = document.querySelector("#category")
let tbody = document.querySelector("tbody");
let deleteAllBtn = document.querySelector(".deleteAllBtn");
let searchBtn = document.querySelector("#search");

function calcTotal() {
    if (price.value != "") {
        total.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value
        if (total.innerHTML <= 0) {
            total.style.backgroundColor = "red";
        } else {
            total.style.backgroundColor = "green";
        }
    }
}

    if (localStorage.datas) {
        arrayData = JSON.parse(localStorage.datas);
    } else {
        arrayData = [];
    }
    showData();

let createBtn = document.querySelector('button[type="submit"]');
createBtn.addEventListener("click", function() {
        let data = {
            title:title.value,
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value,
        }
        if (data.count > 1) {
            for (i = 0 ; i < data.count ; i++) {
                arrayData.push(data);
            }
        } else {
            arrayData.push(data);
        }
        localStorage.setItem("datas", JSON.stringify(arrayData));
        showData();
        clearInput()
        calcTotal();
        deleteAllBtn.innerHTML= `delete all (${arrayData.length})`;
    })

    function clearInput() {
        document.querySelectorAll("input").forEach(function(input) {
            input.value = ""
        })
    }

    function showData() {
        tbody.innerHTML = "";
        for (i = 0; i < arrayData.length; i++) {
            let tr =
            `
            <tr>
                <td>${i}</td>
                <td>${arrayData[i].title}</td>
                <td>${arrayData[i].price}</td>
                <td>${arrayData[i].taxes}</td>
                <td>${arrayData[i].ads}</td>
                <td>${arrayData[i].discount}</td>
                <td>${arrayData[i].total}</td>
                <td>${arrayData[i].count}</td>
                <td>${arrayData[i].category}</td>
                <td><button class="btn" onclick = "updateItem(${i})">update</button></td>
                <td><button class="btn" onclick ="deleteItem(${i})">delete</button></td>
            </tr>
            ` 
            tbody.innerHTML += tr;
            
            if (arrayData.length > 0) {
                deleteAllBtn.style.display = "block";
            } else {
                deleteAllBtn.style.display = "none";
            }
        }
    }

    function deleteItem(i) {
        arrayData.splice(i,1);
        localStorage.datas = JSON.stringify(arrayData);
        if (arrayData.length > 0) {
                deleteAllBtn.style.display = "block";
            } else {
                deleteAllBtn.style.display = "none";
            }
        deleteAllBtn.innerHTML= `delete all (${arrayData.length})`;
        showData();
    }

    updateBtn = document.querySelector(".update");
    exitUpdateBtn = document.querySelector(".update span");
    exitUpdateBtn.addEventListener("click", function() {
        this.parentNode.style.display = "none";
    })
    
    deleteAllBtn.addEventListener("click", function() {
        arrayData = [];
        localStorage.removeItem("datas")
        showData();
        deleteAllBtn.style.display = "none"
        updateBtn.style.display= "none"
        clearInput()
    })

    let tmp;
    
    function updateItem(i) {
        tmp = i;
        updateBtn.style.display = 'block';
        count.style.display = "none";
        title.value = arrayData[i].title;
        price.value = arrayData[i].price;
        taxes.value = arrayData[i].taxes
        ads.value = arrayData[i].ads;
        discount.value = arrayData[i].discount;
        total.innerHTML = arrayData[i].total;
        count.value = arrayData[i].count;
        category.value = arrayData[i].category;

        calcTotal();
    }

    updateBtn.addEventListener("click", function() {
        let newData = {
            title:title.value,
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value,
        }
        arrayData[tmp] = newData;
        showData();
        localStorage.datas = JSON.stringify(arrayData);
        this.style.display = "none";
        document.querySelectorAll("input").forEach(function(input) {
            input.value = ""
        })
        count.style.display = "block";
    })

    function search(value) {
        tbody.innerHTML = "";
        for (i=0; i<arrayData.length; i++) {
            if(arrayData[i].title.includes(value)) {
                let tr =
            `
            <tr>
                <td>${i}</td>
                <td>${arrayData[i].title}</td>
                <td>${arrayData[i].price}</td>
                <td>${arrayData[i].taxes}</td>
                <td>${arrayData[i].ads}</td>
                <td>${arrayData[i].discount}</td>
                <td>${arrayData[i].total}</td>
                <td>${arrayData[i].count}</td>
                <td>${arrayData[i].category}</td>
                <td><button class="btn" onclick = "updateItem(${i})">update</button></td>
                <td><button class="btn" onclick ="deleteItem(${i})">delete</button></td>
            </tr>
            ` 
            tbody.innerHTML += tr;

            if (arrayData.length > 0) {
                deleteAllBtn.style.display = "block";
            } else {
                deleteAllBtn.style.display = "none";
            }
            } else {
            }
        }
    }