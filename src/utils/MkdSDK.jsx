import axios from "axios";
export default function MkdSDK() {
  this._baseurl = "https://reacttask.mkdlabs.com";
  this._project_id = "reacttask";
  this._secret = "5fchxn5m8hbo6jcxiq3xddofodoacskye";
  this._table = "";
  this._custom = "";
  this._method = "";

  const raw = this._project_id + ":" + this._secret;
  let base64Encode = btoa(raw);

  this.setTable = function (table) {
    this._table = table;
  };

  this.login = async function (email, password, role) {
    console.log(email, password);
    //TODO
    //POST Request for Login
    // const body = {
    //   email: "adminreacttask@manaknight.com",
    //   password: "a123456",
    //   role: "admin",
    // };
    const body = {
      email: email,
      password: password,
      role: "admin",
    };
    const headers = {
      "content-type": "application/json",
      "x-project":
        "cmVhY3R0YXNrOjVmY2h4bjVtOGhibzZqY3hpcTN4ZGRvZm9kb2Fjc2t5ZQ==",
    };
    const response = await axios
      .post("https://reacttask.mkdlabs.com/v2/api/lambda/login", body, {
        headers,
      })
      .then((response) => {
        //store response.data in LocalStorage
        localStorage.setItem("token", response.data.token);
        console.log(response.data);
      });
  };

  this.getHeader = function () {
    return {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "x-project": base64Encode,
    };
  };

  this.baseUrl = function () {
    return this._baseurl;
  };

  this.callRestAPI = async function (payload, method) {
    console.log("payload from mdsdk", payload, "metthod from mdsdk", method);
    const header = {
      "Content-Type": "application/json",
      "x-project":
        "cmVhY3R0YXNrOjVmY2h4bjVtOGhibzZqY3hpcTN4ZGRvZm9kb2Fjc2t5ZQ==",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    switch (method) {
      case "GET":
        const getResult = await fetch(
          this._baseurl + `/v1/api/rest/${this._table}/GET`,
          {
            method: "post",
            headers: header,
            body: JSON.stringify(payload),
          }
        );
        const jsonGet = await getResult.json();

        if (getResult.status === 401) {
          throw new Error(jsonGet.message);
        }

        if (getResult.status === 403) {
          throw new Error(jsonGet.message);
        }
        return jsonGet;

      case "PAGINATE":
        if (!payload.page) {
          payload.page = 1;
        }
        if (!payload.limit) {
          payload.limit = 10;
        }
        const paginateResult = await fetch(
          this._baseurl + `/v1/api/rest/${this._table}video/${method}`,
          {
            method: "post",
            headers: header,
            body: JSON.stringify(payload),
          }
        );
        const jsonPaginate = await paginateResult.json();

        if (paginateResult.status === 401) {
          throw new Error(jsonPaginate.message);
        }

        if (paginateResult.status === 403) {
          throw new Error(jsonPaginate.message);
        }
        console.log("JSON paginate:", jsonPaginate);
        return jsonPaginate;
      default:
        break;
    }
  };

  this.check = async function (role) {
    //TODO
    // Get token from LocalStorage
    const token = await localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }
    const body = {
      role: "admin",
    };
    const headers = {
      "Content-Type": "application/json",
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const response = await axios
      .post("https://reacttask.mkdlabs.com/v2/api/lambda/check", body, {
        headers,
      })
      .then((response) => response.status);
    if (response === 200) {
      console.log("200 response");
      return response;
    } else {
      console.log("else false");
      return false;
    }
  };

  return this;
}
