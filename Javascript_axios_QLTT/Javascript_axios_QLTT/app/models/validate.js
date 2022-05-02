function Validation() {
  this.kiemTraRong = function (value, id, mess) {
    if (value === "") {
      getEle(id).innerHTML = mess;
      getEle(id).style.display = "block";
      return false;
    }
    getEle(id).innerHTML = "";
    getEle(id).style.display = "none";
    return true;
  };
  this.kiemTraKiTuDacBiet = function (value, id, mess) {
    let check = "^[a-zA-Z0-9]*$";
    if (!value.match(check)) {
      getEle(id).innerHTML = mess;
      getEle(id).style.display = "block";
      return false;
    }
    getEle(id).innerHTML = "";
    getEle(id).style.display = "none";
    return true;
  };
  this.kiemTraDoDai = function (value, id, mess, min, max) {
    if (value.length >= min && value.length <= max) {
      getEle(id).innerHTML = "";
      getEle(id).style.display = "none";
      return true;
    }
    getEle(id).innerHTML = mess;
    getEle(id).style.display = "block";
    return false;
  };
  this.kiemTraDinhDangMatKhau = function (value, id, mess) {
    let check =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    if (value.match(check)) {
      getEle(id).innerHTML = "";
      getEle(id).style.display = "none";
      return true;
    }
    getEle(id).innerHTML = mess;
    getEle(id).style.display = "block";
    return false;
  };
  this.kiemTraEmail = function (value, id, mess) {
    let check = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.match(check)) {
      getEle(id).innerHTML = "";
      getEle(id).style.display = "none";
      return true;
    }
    getEle(id).innerHTML = mess;
    getEle(id).style.display = "block";
    return false;
  };
  this.kiemTraSelectBox = function (id, idDom, mess) {
    if (getEle(idDom).selectedIndex == 0) {
      getEle(id).innerHTML = mess;
      getEle(id).style.display = "block";
      return false;
    } else if (getEle(idDom).selectedIndex !== 0) {
      getEle(id).innerHTML = "";
      getEle(id).style.display = "none";
      return true;
    }
  };
  this.kiemTraTrung = function (value, id, data, mess) {
    for (let i = 0; i < data.length; i++) {
      if (value === data[i].taiKhoan) {
        getEle(id).innerHTML = mess;
        getEle(id).style.display = "block";
        return false;
      }
    }
    getEle(id).innerHTML = "";
    getEle(id).style.display = "none";
    return true;
  };
}
