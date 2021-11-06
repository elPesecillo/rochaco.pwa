import axios from "axios";
import { handleError, handleResponse } from "./ApiUtils";

const httpRequest = (method, url, request, _headers) => {
  return axios({
    method,
    url,
    data: request,
    headers: _headers,
  })
    .then((res) => {
      const result = handleResponse(res);
      return Promise.resolve(result);
    })
    .catch((err) => {
      //throw handleError(err);
      return Promise.reject(handleError(err));
    });
};

const get = (url, request, headers) => {
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
  return httpRequest("get", `${url}${queryString}`, null, headers);
};

const deleteRequest = (url, request, headers) => {
  return httpRequest("delete", url, request, headers);
};

const post = (url, request, headers) => {
  return httpRequest("post", url, request, headers);
};

const put = (url, request, headers) => {
  return httpRequest("put", url, request, headers);
};

const patch = (url, request, headers) => {
  return httpRequest("patch", url, request, headers);
};

const postForm = async (url, formData, headers) => {
  try {
    //let authorization = store.getState().auth;
    let hdrs = {
      ...headers,
      //authorization,
      "Content-Type": `multipart/form-data`, //;boundary=${formData._boundary}\r\n`,
    };
    let res = await axios.post(url, formData, {
      headers: hdrs,
    });
    return handleResponse(res);
  } catch (err) {
    throw handleError(err);
  }
};

const Api = {
  get,
  delete: deleteRequest,
  post,
  put,
  patch,
  postForm,
};

export default Api;
