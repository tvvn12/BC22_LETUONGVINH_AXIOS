function Service() {
  this.getData = () => {
    return axios({
      url: "https://625569228646add390d66a44.mockapi.io/api/products",
      method: "GET",
    });
  };
  this.postData = (product) => {
    return axios({
      url: "https://625569228646add390d66a44.mockapi.io/api/products/",
      method: "POST",
      data: product,
    });
  };
  this.getDetailsProduct = (id) => {
    return axios({
      url: "https://625569228646add390d66a44.mockapi.io/api/products/" + id,
      method: "GET",
    });
  };
  this.updateProduct = (product) => {
    return axios({
      url:
        "https://625569228646add390d66a44.mockapi.io/api/products/" +
        product.id,
      method: "PUT",
      data: product,
    });
  };
  this.deleteProduct = (id)=>{
      return axios({
        url: "https://625569228646add390d66a44.mockapi.io/api/products/" + id,
        method: "DELETE",
      })
  }
}
