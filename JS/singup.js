let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let checkpass = document.getElementById("checkpassword");
let btnSignup = document.querySelector(".btn-signup");
var reg = /^\w+@[a-zA-Z]+\.com$/i;
btnSignup.addEventListener("click", (e) => {
  e.preventDefault();
  let user = {
    username: username.value,
    email: email.value,
    password: password.value,
  };
  let json = JSON.stringify(user);
  if (!username.value || !email.value || !password.value) {
    alert("Vui lòng nhập đầy đủ thông tin");
  }
  else if (checkpass.value != password.value) {
    alert("Vui lòng kiểm tra lại mật khẩu");
  }
  else if (password.value.length < 6) {
    alert("Mật khẩu quá ngắn");
  }
  else if (username.value.length <= 4) {
    alert("Tên đăng nhập quá ngắn");
  }
  else if (reg.test(email.value) == false) {
    alert('Email không hợp lệ');
  }
  else {
    localStorage.setItem(username.value, json);
    alert("dang ky thanh cong");
    window.location.href = "login.html";
  }
});




