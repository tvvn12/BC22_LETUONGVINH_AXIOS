var ser = new Service();
var validate = new Validation();
//LoadingData
function loadingData() {
  ser
    .getData()
    .then((result) => {
      renderHTML(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

loadingData();
//RenderHTML
function renderHTML(data) {
  let content = "";
  for (let i = 0; i < data.length; i++) {
    content += ` <tr>
            <th>${i + 1}</th>
            <th>${data[i].taiKhoan}</th>
            <th>${data[i].matKhau}</th>
            <th>${data[i].hoTen}</th>
            <th>${data[i].email}</th>
            <th>${data[i].ngonNgu}</th>
            <th>${data[i].loaiND}</th>
            <th>
            <button onclick=Edit(${data[i].id}) data-toggle="modal"
            data-target="#myModal" class="btn btn-primary">Sửa</button>
            <button onclick=Del(${
              data[i].id
            })  class="btn btn-danger">Xóa</button>
            </th>
        </tr>
        `;
  }
  document.getElementById("tblDanhSachNguoiDung").innerHTML = content;
}
//Delete Product
function Del(id) {
  ser
    .deleteProduct(id)
    .then(() => {
      loadingData();
    })
    .catch((err) => {
      console.log(err);
    });
}
//Edit(GET old data)
function Edit(id) {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Edit Product";
  var foot = `<button onclick="updateProduct(${id})" class="btn btn-primary">Update</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = foot;
  document.getElementById("TaiKhoan").disabled = true;

  ser
    .getDetailsProduct(id)
    .then((rs) => {
      getEle("TaiKhoan").value = rs.data.taiKhoan;
      getEle("HoTen").value = rs.data.hoTen;
      getEle("MatKhau").value = rs.data.matKhau;
      getEle("Email").value = rs.data.email;
      getEle("HinhAnh").value = rs.data.hinhAnh;
      getEle("loaiNguoiDung").value = rs.data.loaiND;
      getEle("loaiNgonNgu").value = rs.data.ngonNgu;
      getEle("MoTa").value = rs.data.moTa;
    })
    .catch((err) => {
      console.log(err);
    });
}
function getOlDetail(id) {
  let taiKhoan= getEle("TaiKhoan").value;
  let hoTen = getEle("HoTen").value;
  let matKhau = getEle("MatKhau").value;
  let email = getEle("Email").value;
  let hinhAnh = getEle("HinhAnh").value;
  let loaiND = getEle("loaiNguoiDung").value;
  let ngonNgu = getEle("loaiNgonNgu").value;
  let moTa = getEle("MoTa").value;
  let isValid = true;
  isValid &=
    validate.kiemTraKiTuDacBiet(
      hoTen,
      "tbHoTen",
      "(*)Không dùng kí tự đặc biệt"
    ) && validate.kiemTraRong(hoTen, "tbHoTen", "Không được bỏ trốnng");
  isValid &=
    validate.kiemTraRong(matKhau, "tbMatKhau", "(*)Không được bỏ trống") &&
    validate.kiemTraDoDai(
      matKhau,
      "tbMatKhau",
      "(*)Độ dài từ 6 đến 8 ký tự",
      6,
      8
    ) &&
    validate.kiemTraDinhDangMatKhau(
      matKhau,
      "tbMatKhau",
      "(*)Mật khẩu có ít nhất 1 ký tự in hoa, 1 ký tự đặc biệt, 1 ký tự số"
    );
  isValid &=
    validate.kiemTraRong(email, "tbEmail", "(*)Không được bỏ trống") &&
    validate.kiemTraEmail(
      email,
      "tbEmail",
      "(*)Sai định dạng vd: FFF@gmail.com"
    );
  isValid &= validate.kiemTraRong(
    hinhAnh,
    "tbHinhAnh",
    "(*)Không được bỏ trống"
  );
  isValid &= validate.kiemTraSelectBox(
    "tbND",
    "loaiNguoiDung",
    "(*)Không được bỏ trống hãy chọn đi"
  );
  isValid &= validate.kiemTraSelectBox(
    "tbNN",
    "loaiNgonNgu",
    "(*)Không được bỏ trống hãy chọn đi"
  );
  isValid &=
    validate.kiemTraRong(moTa, "tbMoTA", "(*)Không được bỏ trống") &&
    validate.kiemTraDoDai(moTa, "tbMoTA", "(*)Không quá 60 ký tự", 0, 60);
  if (!isValid) return null;
  var pro = new Product(
    id,
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    ngonNgu,
    moTa,
    hinhAnh
  );
  return pro;
}
//Update product
function updateProduct(id) {
  
  let update = getOlDetail(id);
  

  if (update) {
    ser
      .updateProduct(update)
      .then((rs) => {
        getEle("TaiKhoan").style.disable = "true";

        document.getElementsByClassName("close")[0].click();

        loadingData();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
//Button add new person
getEle("btnThemNguoiDung").addEventListener("click", function () {
  cleanButtons();
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Add new Product";
  var button = `<button onclick=" addProduct()" class="btn btn-success">Add</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = button;
});
//Get data and check validation
function getDetailsEmploy() {
  let taiKhoan = getEle("TaiKhoan").value;
  let hoTen = getEle("HoTen").value;
  let matKhau = getEle("MatKhau").value;
  let email = getEle("Email").value;
  let hinhAnh = getEle("HinhAnh").value;
  let loaiND = getEle("loaiNguoiDung").value;
  let ngonNgu = getEle("loaiNgonNgu").value;
  let moTa = getEle("MoTa").value;
  let isValid = true;
  isValid &=
    validate.kiemTraRong(taiKhoan, "tbTaiKhoan", "(*)Không được bỏ trống") &&
    validate.kiemTraTrung(taiKhoan, "tbTaiKhoan", dataGet, "(*)Trùng");
  isValid &=
    validate.kiemTraKiTuDacBiet(
      hoTen,
      "tbHoTen",
      "(*)Không dùng kí tự đặc biệt"
    ) && validate.kiemTraRong(hoTen, "tbHoTen", "Không được bỏ trốnng");
  isValid &=
    validate.kiemTraRong(matKhau, "tbMatKhau", "(*)Không được bỏ trống") &&
    validate.kiemTraDoDai(
      matKhau,
      "tbMatKhau",
      "(*)Độ dài từ 6 đến 8 ký tự",
      6,
      8
    ) &&
    validate.kiemTraDinhDangMatKhau(
      matKhau,
      "tbMatKhau",
      "(*)Mật khẩu có ít nhất 1 ký tự in hoa, 1 ký tự đặc biệt, 1 ký tự số"
    );
  isValid &=
    validate.kiemTraRong(email, "tbEmail", "(*)Không được bỏ trống") &&
    validate.kiemTraEmail(
      email,
      "tbEmail",
      "(*)Sai định dạng vd: FFF@gmail.com"
    );
  isValid &= validate.kiemTraRong(
    hinhAnh,
    "tbHinhAnh",
    "(*)Không được bỏ trống"
  );
  isValid &= validate.kiemTraSelectBox(
    "tbND",
    "loaiNguoiDung",
    "(*)Không được bỏ trống hãy chọn đi"
  );
  isValid &= validate.kiemTraSelectBox(
    "tbNN",
    "loaiNgonNgu",
    "(*)Không được bỏ trống hãy chọn đi"
  );
  isValid &=
    validate.kiemTraRong(moTa, "tbMoTA", "(*)Không được bỏ trống") &&
    validate.kiemTraDoDai(moTa, "tbMoTA", "(*)Không quá 60 ký tự", 0, 60);
  if (!isValid) return null;
  var pro = new Product(
    "",
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    ngonNgu,
    moTa,
    hinhAnh
  );
  return pro;
}
//CleanForm
function cleanButtons() {
  getEle("TaiKhoan").disabled = false;
  getEle("TaiKhoan").value = "";
  getEle("HoTen").value = "";
  getEle("MatKhau").value = "";
  getEle("Email").value = "";
  getEle("HinhAnh").value = "";
  getEle("loaiNguoiDung").value = "";
  getEle("loaiNgonNgu").value = "";
  getEle("MoTa").value = "";
}
//add New Product
function addProduct() {
  let pro = getDetailsEmploy();
  if (pro) {
    ser
      .postData(pro)
      .then((result) => {
        document.getElementsByClassName("close")[0].click();
        loadingData();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
//DOM function
function getEle(id) {
  return document.getElementById(id);
}

//setLoCal
function setLocalStorage() {
  ser
    .getData()
    .then((rs) => {
      let dataString = JSON.stringify(rs.data);
      localStorage.setItem("DanhSach", dataString);
     
    })
    .catch(() => {});
}
function getLocalStorage() {
  let data = localStorage.getItem("DanhSach");
  if (data) {
    let dataJSON = JSON.parse(data);
    return dataJSON;
  }
}
let dataGet = getLocalStorage();
let data = setLocalStorage();
