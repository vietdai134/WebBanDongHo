const header = document.querySelector("#header")
window.addEventListener("scroll", function () {
  x = window.pageYOffset
  if (x > 0) {
    header.classList.add("sticky")

  }
  else {
    header.classList.remove("sticky")
  }
})

/******************************category****************************************************** */


const itemslidebar = document.querySelectorAll(".category-left-li")
itemslidebar.forEach(function (menu, index) {
  menu.addEventListener("click", function () {
    menu.classList.toggle("block")
  })
})


/**********************************************cart********************************** */
var modal = document.getElementById("myModal");
var btn = document.getElementById("cart");
var close = document.getElementsByClassName("close")[0];

var close_footer = document.getElementsByClassName("close-footer")[0];
var order = document.getElementsByClassName("order")[0];
btn.onclick = function () {
  modal.style.display = "block";
}
close.onclick = function () {
  modal.style.display = "none";
}
close_footer.onclick = function () {
  modal.style.display = "none";
}
order.onclick = function () {
  alert("Cảm ơn bạn đã thanh toán đơn hàng")
  window.location.href = "category.html"
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var remove_cart = document.getElementsByClassName("btn-danger");
for (var i = 0; i < remove_cart.length; i++) {
  var button = remove_cart[i]
  button.addEventListener("click", function () {
    var button_remove = event.target
    button_remove.parentElement.parentElement.remove()
    updatecart();
  })
}

// update cart 
function updatecart() {
  var cart_item = document.getElementsByClassName("cart-items")[0];
  var cart_rows = cart_item.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cart_rows.length; i++) {
    var cart_row = cart_rows[i]
    var price_item = cart_row.getElementsByClassName("cart-price ")[0]
    var quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0]
    var price = parseFloat(price_item.innerText)// chuyển một chuổi string sang number để tính tổng tiền.
    var quantity = quantity_item.value // lấy giá trị trong thẻ input
    total = total + (price * quantity)
  }
  document.getElementsByClassName("cart-total-price")[0].innerText = total + 'VNĐ'

}


var quantity_input = document.getElementsByClassName("cart-quantity-input");
for (var i = 0; i < quantity_input.length; i++) {
  var input = quantity_input[i];
  input.addEventListener("change", function (event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updatecart()
  })
}
function addItemToCart(title, price, img) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cart_title = cartItems.getElementsByClassName('cart-item-title')


  for (var i = 0; i < cart_title.length; i++) {
    if (cart_title[i].innerText == title) {
      alert('Sản Phẩm Đã Có Trong Giỏ Hàng')
      return
    }
  }

  var cartRowContents = `
  <div class="cart-item cart-column">
      
      <span class="cart-item-title">${title}</span>
      
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1">
      <button class="btn btn-danger" type="button">Xóa</button>
  </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', function () {
    var button_remove = event.target
    button_remove.parentElement.parentElement.remove()
    updatecart()
  })
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', function (event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updatecart()
  })
}
/*******************************************cart*********************** */
function addcart() {
  var add_cart = document.getElementsByClassName("btn-cart");
  for (var i = 0; i < add_cart.length; i++) {
    var add = add_cart[i];
    add.addEventListener("click", function (event) {

      var button = event.target;
      var product = button.parentElement.parentElement;
      var img = product.parentElement.getElementsByClassName("item-img")[0].src
      var title = product.getElementsByClassName("item-name")[0].innerText
      var price = product.getElementsByClassName("item-price")[0].innerText
      addItemToCart(title, price, img)
      // Khi thêm sản phẩm vào giỏ hàng thì sẽ hiển thị modal
      modal.style.display = "block";

      updatecart()
    })
  }
}

/**********************************find***************************** */
function findProduct() {
  var search = document.getElementById("search").value
  //console.log(search)
  if (search == "") {
    showAll();
    return false;
  }
  html_cateproducts = ""
  cateproducts.filter(cateproduct => (cateproduct['item-name'].toUpperCase()).includes(search.toUpperCase())).forEach(cateproduct => {
    html_cateproducts += `<div class="category-right-content-item" id="` + cateproduct["id"] + `">
      <div class="item-img"><img src=`+ cateproduct["item-img"] + `></div>
          <div class="item-name"><p>`+ cateproduct["item-name"] + `</p></div>
      <div class="item-price"><p>`+ cateproduct["item-price"] + ` VNĐ</p></div>
      <button onclick="toggleModal(`+ cateproduct["id"] + `)"><a href="#sort">Chi tiết sản phẩm</a></button>
      <button  class="btn btn-cart"> <p> Thêm Vào Giỏ Hàng</p></button>
          </div>`
  })
  document.getElementById("cateproducts").innerHTML = html_cateproducts

  //thêm
  addcart();
}

/***********************************sort******************************** */
function sapxep(num) {
  var value = num.value;
  if (value === "1") {
    cateproducts.sort(function (a, b) {
      var n1 = a["item-name"].toLowerCase();
      var n2 = b["item-name"].toLowerCase();
      if (n1 < n2) {
        return -1;
      }
      if (n1 > n2) {
        return 1;
      }
      return 0;
    });
  }
  else if (value === "2") {
    cateproducts.sort(function (a, b) {
      var n1 = a["item-name"].toLowerCase();
      var n2 = b["item-name"].toLowerCase();
      if (n1 < n2) {
        return 1;
      }
      if (n1 > n2) {
        return -1;
      }
      return 0;
    });
  }
  else if (value === "3") {
    cateproducts.sort((a, b) => -a["item-price"] + b["item-price"])
  }
  else if (value === "4") {
    cateproducts.sort((a, b) => a["item-price"] - b["item-price"])
  }
  showAll();
  addcart();
}

/*****************************************filter brand******************** */
function showBrand(ele) {
  html_cateproducts = ""
  cateproducts.filter(cateproduct => (cateproduct['item-name']).includes(ele)).forEach(cateproduct => {
    html_cateproducts += `<div class="category-right-content-item" id="` + cateproduct["id"] + `">
      <div class="item-img"><img src=`+ cateproduct["item-img"] + `></div>
          <div class="item-name"><p>`+ cateproduct["item-name"] + `</p></div>
      <div class="item-price"><p>`+ cateproduct["item-price"] + ` VNĐ</p></div>
      <button onclick="toggleModal(`+ cateproduct["id"] + `)"><a href="#sort">Chi tiết sản phẩm</a></button>
      <button  class="btn btn-cart"> <p> Thêm Vào Giỏ Hàng</p></button>
          </div>`
  })
  document.getElementById("cateproducts").innerHTML = html_cateproducts
}
function selectBrand(element) {
  var ele = element.value;
  let tabs = document.getElementsByClassName('brand');
  for (i = 0; i < tabs.length; i++) {
    tabs[i].style.color = 'black';
  }
  element.style.color = 'orange';
  ///////////////////////////////////
  if (ele === "Casio") {
    showBrand(ele);
  }
  else if (ele === "Casio G-SHOCK") {
    showBrand(ele);
  }
  else if (ele === "Casio Edifice") {
    showBrand(ele);
  }
  else if (ele === "Citizen") {
    showBrand(ele);
  }
  else if (ele === "Citizen") {
    showBrand(ele);
  }
  else if (ele === "Olym Pianus") {
    showBrand(ele);
  }
  else if (ele === "Daniel Wellington") {
    showBrand(ele);
  }
  else if (ele === "Orient") {
    showBrand(ele);
  }
  else if (ele === "Seiko") {
    showBrand(ele);
  }
  addcart();
}
/******************************************************Gender**************************** */
function selectGender(elemore) {
  var elem = elemore.value;
  var ne1 = cateproducts.filter(function (a) {
    return (a["item-name"].includes(" Nữ"));
  })
  var ne2 = cateproducts.filter(function (a) {
    return (a["item-name"].includes(" Nam"));
  })
  if (elem === "Nữ") {
    html_ne1 = ""
    ne1.forEach(newpr => {
      html_ne1 += `<div class="category-right-content-item" id="` + newpr["id"] + `">
                <div class="item-img"><img src=`+ newpr["item-img"] + `></div>
                    <div class="item-name"><p>`+ newpr["item-name"] + `</p></div>
                <div class="item-price"><p>`+ newpr["item-price"] + ` VNĐ</p></div>
                <button onclick="toggleModal(`+ newpr["id"] + `)"><a href="#sort">Chi tiết sản phẩm</a></button>
                <button  class="btn btn-cart"> <p> Thêm Vào Giỏ Hàng</p></button>
                </div>`
    })
    document.getElementById("cateproducts").innerHTML = html_ne1

  }
  else if (elem === "Nam") {
    html_ne2 = ""
    ne2.forEach(newpr => {
      html_ne2 += `<div class="category-right-content-item" id="` + newpr["id"] + `">
                <div class="item-img"><img src=`+ newpr["item-img"] + `></div>
                    <div class="item-name"><p>`+ newpr["item-name"] + `</p></div>
                <div class="item-price"><p>`+ newpr["item-price"] + ` VNĐ</p></div>
                <button onclick="toggleModal(`+ newpr["id"] + `)"><a href="#sort">Chi tiết sản phẩm</a></button>
                <button  class="btn btn-cart"> <p> Thêm Vào Giỏ Hàng</p></button>
                </div>`
    })
    document.getElementById("cateproducts").innerHTML = html_ne2
  }

  addcart();
}
/************************************************Brand Female***************************** */
function semorebrandFemale(a) {
  var thisbrand = a.value;
  var ne1 = cateproducts.filter(function (a) {
    return (a["item-name"].includes(" Nữ"));
  })
  let tabs = document.getElementsByClassName('brand');
  for (i = 0; i < tabs.length; i++) {
    tabs[i].style.color = 'black';
  }
  a.style.color = 'orange';
  if (thisbrand === "Casio") {
    var ne11 = ne1.filter(function (a) {
      return (a["item-name"].includes("Casio"));
    })
    html_ne11 = ""
    ne11.forEach(newpr => {
      html_ne11 += `<div class="category-right-content-item" id="` + newpr["id"] + `">
                <div class="item-img"><img src=`+ newpr["item-img"] + `></div>
                    <div class="item-name"><p>`+ newpr["item-name"] + `</p></div>
                <div class="item-price"><p>`+ newpr["item-price"] + ` VNĐ</p></div>
                <button onclick="toggleModal(`+ newpr["id"] + `)"><a href="#sort">Chi tiết sản phẩm</a></button>
                <button  class="btn btn-cart"> <p> Thêm Vào Giỏ Hàng</p></button>
                </div>`
    })
    document.getElementById("cateproducts").innerHTML = html_ne11
  }
  if (thisbrand === "Citizen") {
    var ne12 = ne1.filter(function (a) {
      return (a["item-name"].includes("Citizen"));
    })
    html_ne12 = ""
    ne12.forEach(newpr => {
      html_ne12 += `<div class="category-right-content-item" id="` + newpr["id"] + `">
                <div class="item-img"><img src=`+ newpr["item-img"] + `></div>
                    <div class="item-name"><p>`+ newpr["item-name"] + `</p></div>
                <div class="item-price"><p>`+ newpr["item-price"] + ` VNĐ</p></div>
                <button onclick="toggleModal(`+ newpr["id"] + `)"><a href="#sort">Chi tiết sản phẩm</a></button>
                <button  class="btn btn-cart"> <p> Thêm Vào Giỏ Hàng</p></button>
                </div>`
    })
    document.getElementById("cateproducts").innerHTML = html_ne12
  }
  if (thisbrand === "Seiko") {
    var ne13 = ne1.filter(function (a) {
      return (a["item-name"].includes("Seiko"));
    })
    html_ne13 = ""
    ne13.forEach(newpr => {
      html_ne13 += `<div class="category-right-content-item" id="` + newpr["id"] + `">
                <div class="item-img"><img src=`+ newpr["item-img"] + `></div>
                    <div class="item-name"><p>`+ newpr["item-name"] + `</p></div>
                <div class="item-price"><p>`+ newpr["item-price"] + ` VNĐ</p></div>
                <button onclick="toggleModal(`+ newpr["id"] + `)"><a href="#sort">Chi tiết sản phẩm</a></button>
                <button  class="btn btn-cart"> <p> Thêm Vào Giỏ Hàng</p></button>
                </div>`
    })
    document.getElementById("cateproducts").innerHTML = html_ne13
  }
  if (thisbrand === "Olym Pianus") {
    var ne14 = ne1.filter(function (a) {
      return (a["item-name"].includes("Olym Pianus"));
    })
    html_ne14 = ""
    ne14.forEach(newpr => {
      html_ne14 += `<div class="category-right-content-item" id="` + newpr["id"] + `">
                <div class="item-img"><img src=`+ newpr["item-img"] + `></div>
                    <div class="item-name"><p>`+ newpr["item-name"] + `</p></div>
                <div class="item-price"><p>`+ newpr["item-price"] + ` VNĐ</p></div>
                <button onclick="toggleModal(`+ newpr["id"] + `)"><a href="#sort">Chi tiết sản phẩm</a></button>
                <button  class="btn btn-cart"> <p> Thêm Vào Giỏ Hàng</p></button>
                </div>`
    })
    document.getElementById("cateproducts").innerHTML = html_ne14
  }
  if (thisbrand === "Daniel Wellington") {
    var ne15 = ne1.filter(function (a) {
      return (a["item-name"].includes("Daniel Wellington"));
    })
    html_ne15 = ""
    ne15.forEach(newpr => {
      html_ne15 += `<div class="category-right-content-item" id="` + newpr["id"] + `">
                <div class="item-img"><img src=`+ newpr["item-img"] + `></div>
                    <div class="item-name"><p>`+ newpr["item-name"] + `</p></div>
                <div class="item-price"><p>`+ newpr["item-price"] + ` VNĐ</p></div>
                <button onclick="toggleModal(`+ newpr["id"] + `)"><a href="#sort">Chi tiết sản phẩm</a></button>
                <button  class="btn btn-cart"> <p> Thêm Vào Giỏ Hàng</p></button>
                </div>`
    })
    document.getElementById("cateproducts").innerHTML = html_ne15
  }
  if (thisbrand === "Orient") {
    var ne16 = ne1.filter(function (a) {
      return (a["item-name"].includes("Orient"));
    })
    html_ne16 = ""
    ne16.forEach(newpr => {
      html_ne16 += `<div class="category-right-content-item" id="` + newpr["id"] + `">
                <div class="item-img"><img src=`+ newpr["item-img"] + `></div>
                    <div class="item-name"><p>`+ newpr["item-name"] + `</p></div>
                <div class="item-price"><p>`+ newpr["item-price"] + ` VNĐ</p></div>
                <button onclick="toggleModal(`+ newpr["id"] + `)"><a href="#sort">Chi tiết sản phẩm</a></button>
                <button  class="btn btn-cart"> <p> Thêm Vào Giỏ Hàng</p></button>
                </div>`
    })
    document.getElementById("cateproducts").innerHTML = html_ne16
  }
  addcart();
}
/*********************************************Brand Male***************************** */
function semorebrandMale(b) {
  var thisbrand = b.value;
  var ne2 = cateproducts.filter(function (b) {
    return (b["item-name"].includes(" Nam"));
  })
  let tabs = document.getElementsByClassName('brand');
  for (i = 0; i < tabs.length; i++) {
    tabs[i].style.color = 'black';
  }
  b.style.color = 'orange';
  if (thisbrand === "Casio") {
    var ne21 = ne2.filter(function (b) {
      return (b["item-name"].includes("Casio"));
    })
    html_ne21 = ""
    ne21.forEach(newpr => {
      html_ne21 += `<div class="category-right-content-item" id="` + newpr["id"] + `">
                <div class="item-img"><img src=`+ newpr["item-img"] + `></div>
                    <div class="item-name"><p>`+ newpr["item-name"] + `</p></div>
                <div class="item-price"><p>`+ newpr["item-price"] + ` VNĐ</p></div>
                <button onclick="toggleModal(`+ newpr["id"] + `)"><a href="#sort">Chi tiết sản phẩm</a></button>
                <button  class="btn btn-cart"> <p> Thêm Vào Giỏ Hàng</p></button>
                </div>`
    })
    document.getElementById("cateproducts").innerHTML = html_ne21
  }
  if (thisbrand === "Casio G-SHOCK") {
    var ne22 = ne2.filter(function (b) {
      return (b["item-name"].includes("Casio G-SHOCK"));
    })
    html_ne22 = ""
    ne22.forEach(newpr => {
      html_ne22 += `<div class="category-right-content-item" id="` + newpr["id"] + `">
                <div class="item-img"><img src=`+ newpr["item-img"] + `></div>
                    <div class="item-name"><p>`+ newpr["item-name"] + `</p></div>
                <div class="item-price"><p>`+ newpr["item-price"] + ` VNĐ</p></div>
                <button onclick="toggleModal(`+ newpr["id"] + `)"><a href="#sort">Chi tiết sản phẩm</a></button>
                <button  class="btn btn-cart"> <p> Thêm Vào Giỏ Hàng</p></button>
                </div>`
    })
    document.getElementById("cateproducts").innerHTML = html_ne22
  }
  if (thisbrand === "Casio Edifice") {
    var ne23 = ne2.filter(function (b) {
      return (b["item-name"].includes("Casio Edifice"));
    })
    html_ne23 = ""
    ne23.forEach(newpr => {
      html_ne23 += `<div class="category-right-content-item" id="` + newpr["id"] + `">
                <div class="item-img"><img src=`+ newpr["item-img"] + `></div>
                    <div class="item-name"><p>`+ newpr["item-name"] + `</p></div>
                <div class="item-price"><p>`+ newpr["item-price"] + ` VNĐ</p></div>
                <button onclick="toggleModal(`+ newpr["id"] + `)"><a href="#sort">Chi tiết sản phẩm</a></button>
                <button  class="btn btn-cart"> <p> Thêm Vào Giỏ Hàng</p></button>
                </div>`
    })
    document.getElementById("cateproducts").innerHTML = html_ne23
  }
  if (thisbrand === "Citizen") {
    var ne24 = ne2.filter(function (b) {
      return (b["item-name"].includes("Citizen"));
    })
    html_ne24 = ""
    ne24.forEach(newpr => {
      html_ne24 += `<div class="category-right-content-item" id="` + newpr["id"] + `">
                <div class="item-img"><img src=`+ newpr["item-img"] + `></div>
                    <div class="item-name"><p>`+ newpr["item-name"] + `</p></div>
                <div class="item-price"><p>`+ newpr["item-price"] + ` VNĐ</p></div>
                <button onclick="toggleModal(`+ newpr["id"] + `)"><a href="#sort">Chi tiết sản phẩm</a></button>
                <button  class="btn btn-cart"> <p> Thêm Vào Giỏ Hàng</p></button>
                </div>`
    })
    document.getElementById("cateproducts").innerHTML = html_ne24
  }
  if (thisbrand === "Seiko") {
    var ne25 = ne2.filter(function (b) {
      return (b["item-name"].includes("Seiko"));
    })
    html_ne25 = ""
    ne25.forEach(newpr => {
      html_ne25 += `<div class="category-right-content-item" id="` + newpr["id"] + `">
                <div class="item-img"><img src=`+ newpr["item-img"] + `></div>
                    <div class="item-name"><p>`+ newpr["item-name"] + `</p></div>
                <div class="item-price"><p>`+ newpr["item-price"] + ` VNĐ</p></div>
                <button onclick="toggleModal(`+ newpr["id"] + `)"><a href="#sort">Chi tiết sản phẩm</a></button>
                <button  class="btn btn-cart"> <p> Thêm Vào Giỏ Hàng</p></button>
                </div>`
    })
    document.getElementById("cateproducts").innerHTML = html_ne25
  }
  if (thisbrand === "Olym Pianus") {
    var ne26 = ne2.filter(function (b) {
      return (b["item-name"].includes("Olym Pianus"));
    })
    html_ne26 = ""
    ne26.forEach(newpr => {
      html_ne26 += `<div class="category-right-content-item" id="` + newpr["id"] + `">
                <div class="item-img"><img src=`+ newpr["item-img"] + `></div>
                    <div class="item-name"><p>`+ newpr["item-name"] + `</p></div>
                <div class="item-price"><p>`+ newpr["item-price"] + ` VNĐ</p></div>
                <button onclick="toggleModal(`+ newpr["id"] + `)"><a href="#sort">Chi tiết sản phẩm</a></button>
                <button  class="btn btn-cart"> <p> Thêm Vào Giỏ Hàng</p></button>
                </div>`
    })
    document.getElementById("cateproducts").innerHTML = html_ne26
  }
  if (thisbrand === "Daniel Wellington") {
    var ne27 = ne2.filter(function (b) {
      return (b["item-name"].includes("Daniel Wellington"));
    })
    html_ne27 = ""
    ne27.forEach(newpr => {
      html_ne27 += `<div class="category-right-content-item" id="` + newpr["id"] + `">
                <div class="item-img"><img src=`+ newpr["item-img"] + `></div>
                    <div class="item-name"><p>`+ newpr["item-name"] + `</p></div>
                <div class="item-price"><p>`+ newpr["item-price"] + ` VNĐ</p></div>
                <button onclick="toggleModal(`+ newpr["id"] + `)"><a href="#sort">Chi tiết sản phẩm</a></button>
                <button  class="btn btn-cart"> <p> Thêm Vào Giỏ Hàng</p></button>
                </div>`
    })
    document.getElementById("cateproducts").innerHTML = html_ne27
  }
  if (thisbrand === "Orient") {
    var ne28 = ne2.filter(function (a) {
      return (a["item-name"].includes("Orient"));
    })
    html_ne28 = ""
    ne28.forEach(newpr => {
      html_ne28 += `<div class="category-right-content-item" id="` + newpr["id"] + `">
                <div class="item-img"><img src=`+ newpr["item-img"] + `></div>
                    <div class="item-name"><p>`+ newpr["item-name"] + `</p></div>
                <div class="item-price"><p>`+ newpr["item-price"] + ` VNĐ</p></div>
                <button onclick="toggleModal(`+ newpr["id"] + `)"><a href="#sort">Chi tiết sản phẩm</a></button>
                <button  class="btn btn-cart"> <p> Thêm Vào Giỏ Hàng</p></button>
                </div>`
    })
    document.getElementById("cateproducts").innerHTML = html_ne28
  }
  addcart();
}
/*********************************filt price************************************************ */
function filtpr(a) {
  var num = a.value;
  if (num === "1") {
    var new1 = cateproducts.filter(function (a) {
      return (a["item-price"] <= 5000000);
    })
    html_new1 = ""
    new1.forEach(newpr => {
      html_new1 += `<div class="category-right-content-item" id="` + newpr["id"] + `">
                <div class="item-img"><img src=`+ newpr["item-img"] + `></div>
                    <div class="item-name"><p>`+ newpr["item-name"] + `</p></div>
                <div class="item-price"><p>`+ newpr["item-price"] + ` VNĐ</p></div>
                <button onclick="toggleModal(`+ newpr["id"] + `)"><a href="#sort">Chi tiết sản phẩm</a></button>
                <button  class="btn btn-cart"> <p> Thêm Vào Giỏ Hàng</p></button>
                </div>`
    })
    document.getElementById("cateproducts").innerHTML = html_new1
  }
  else if (num === "2") {
    var new2 = cateproducts.filter(function (a) {
      return (a["item-price"] >= 5000000 && a["item-price"] <= 10000000);
    });
    html_new2 = ""
    new2.forEach(newpr => {
      html_new2 += `<div class="category-right-content-item" id="` + newpr["id"] + `">
                <div class="item-img"><img src=`+ newpr["item-img"] + `></div>
                    <div class="item-name"><p>`+ newpr["item-name"] + `</p></div>
                <div class="item-price"><p>`+ newpr["item-price"] + ` VNĐ</p></div>
                <button onclick="toggleModal(`+ newpr["id"] + `)"><a href="#sort">Chi tiết sản phẩm</a></button>
                <button  class="btn btn-cart"> <p> Thêm Vào Giỏ Hàng</p></button>
                </div>`
    })
    document.getElementById("cateproducts").innerHTML = html_new2
  }
  else if (num === "3") {
    var new3 = cateproducts.filter(function (a) {
      return (a["item-price"] >= 10000000);
    });
    html_new3 = ""
    new3.forEach(newpr => {
      html_new3 += `<div class="category-right-content-item" id="` + newpr["id"] + `">
                <div class="item-img"><img src=`+ newpr["item-img"] + `></div>
                    <div class="item-name"><p>`+ newpr["item-name"] + `</p></div>
                <div class="item-price"><p>`+ newpr["item-price"] + ` VNĐ</p></div>
                <button onclick="toggleModal(`+ newpr["id"] + `)"><a href="#sort">Chi tiết sản phẩm</a></button>
                <button  class="btn btn-cart"> <p> Thêm Vào Giỏ Hàng</p></button>
                </div>`
    })
    document.getElementById("cateproducts").innerHTML = html_new3
  }
  addcart();
}
/****************************************footer********************************* */
function Receive(){
  alert("Nhận tin thành công")
}

