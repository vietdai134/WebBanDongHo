var xArray = ["Casio", "Casio Edifice", "Casio G-Shock", "Citizen", "Seiko", "Olym Pianus", "Daniel Wellington", "Orient"];
var yArray = [20, 49, 34, 22, 15, 23, 43, 2];
var data = [{
  x: xArray,
  y: yArray,
  type: "bar"
}];
var layout = { title: "SỐ ĐỒNG HỒ BÁN RA THEO LOAI TRONG 3 THÁNG" };
Plotly.newPlot("myPlot", data, layout);


/*************************************acclist**************************** */
var acc = []
for (i = 0; i < localStorage.length; i++) {

  acc[i] = JSON.parse(localStorage.getItem(localStorage.key(i)))

}
console.log(acc)
table = `<tr>
          <th>Tên Tài Khoản</th>
          <th>Email</th>
          <th>Mật Khẩu</th>
        </tr>`
for (let i = 0; i < acc.length; i++) {
  if (acc[i]["username"] != undefined) {
    table +=
      `<tr>
        <td>${acc[i]["username"]}</td>
        <td>${acc[i]["email"]}</td>
        <td>${acc[i]["password"]}</td> 
    </tr>`
  }
}
document.getElementById("account").innerHTML = table;