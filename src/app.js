const Country = require("./models/countries.js");
const SelectView = require("./views/select_view.js");
const ResultView = require("./views/result_view.js");

document.addEventListener("DOMContentLoaded", () => {
  const country = new Country();
  country.getData();

  const select = document.querySelector("select#countries");
  const selectView = new SelectView(select);
  selectView.bindEvents();

  const result = document.querySelector("div#country");
  const resultView = new ResultView(result);
  resultView.bindEvents();
});
