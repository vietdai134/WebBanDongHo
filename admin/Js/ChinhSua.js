var data = localStorage.getItem("cateproduct");
var catep = JSON.parse(data);
function add() {
    var item_id = document.getElementById("id").value
    var item_name = document.getElementById("name").value
    var item_descript = document.getElementById("Descript").value
    var item_Gia = document.getElementById("Gia").value
    var item_img = document.getElementById("img").value

    var item =
    {
        id: Number(item_id),
        "item-name": item_name,
        "item-descript2": item_descript,
        "item-price": Number(item_Gia),
        "item-img": item_img,
    }

    let index = catep.findIndex((c) => c.id == item.id)
    if (index >= 0) {
        catep.splice(index, 1, item)
    }
    else {
        catep.push(item)
    }
    render()
    clear()
}
render();
function render() {
    table = `<tr >
            <th>Mã ID</th>
            <th>Tên </th>
            <th>Giá</th>
            <th>Mô tả sản phẩm</th>
            <th>Hình Ảnh</th>
            <th>Công cụ</th>
        </tr>`


    for (let i = 0; i < catep.length; i++) {
        table += `<tr>
            <td>${catep[i].id}</td>
            <td>${catep[i]["item-name"]}</td>
            <td>${catep[i]["item-price"]} VNĐ</td>
            <td>${catep[i]["item-descript2"]} </td>
            
            <td><img src="${catep[i]["item-img"]}" style="width:90px;height:90px;"><br>
            <img src="${catep[i]["item-img1"]}" style="width:90px;height:90px;"><br>
            <img src="${catep[i]["item-img2"]}" style="width:90px;height:90px;">
            </td>
            <th>
                <button onclick="deleteItem(${catep[i].id})">Xóa</button>
                <button onclick="editItem(${catep[i].id})">Sửa</button>
            </th>
        </tr>`
    }
    document.getElementById("render").innerHTML = table;
}

function clear() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("Descript").value = "";
    document.getElementById("Gia").value = "";
    document.getElementById("img").value = "";
}

function deleteItem(x) {
    for (let i = 0; i < catep.length; i++) {
        if (catep[i].id == x) {
            if (confirm("Bạn có chắc là xóa mục này?")) {
                catep.splice(i, 1)
                render()
            }
        }
    }
}

function editItem(x) {
    for (let i = 0; i < catep.length; i++) {
        if (catep[i].id == x) {
            document.getElementById("id").value = catep[i].id;
            document.getElementById("name").value = catep[i]["item-name"];
            document.getElementById("Descript").value = catep[i]["item-descript2"];
            document.getElementById("Gia").value = catep[i]["item-price"];
            document.getElementById("img").value = catep[i]["item-img"];
        }
    }
}