const axios = require("axios");

module.exports = class ExternalApi {
  constructor(host, headers) {
    this.host = host;
    this.headers = headers;
  }

  _httpRequest(method, path, request) {
    let url = `${this.host}${path}`;
    let headers = this.headers;
    return axios({
      method,
      url,
      data: request,
      headers,
    })
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }

  get(path, request, headers) {
    //return this._httpRequest("get", path, request);
    let queryString = "";
    if (request && Object.keys(request).length > 0) {
      queryString += "?";
      let len = Object.keys(request).length,
        cnt = 0;
      for (let key in request) {
        cnt++;
        queryString += `${key}=${request[key].toString()}`;
        if (len > cnt) queryString += "&";
      }
    }
    return this._httpRequest("get", `${path}${queryString}`, null, headers);
  }

  delete(path, request) {
    return this._httpRequest("delete", path, request);
  }

  post(path, request) {
    return this._httpRequest("post", path, request);
  }

  put(path, request) {
    return this._httpRequest("put", path, request);
  }

  patch(path, request) {
    return this._httpRequest("patch", path, request);
  }
};
