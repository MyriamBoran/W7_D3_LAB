const PubSub = require("../helpers/pub_sub.js");

const ResultView = function(container) {
  this.container = container;
};

ResultView.prototype.bindEvents = function() {
  PubSub.subscribe("Countries:selected-country-loaded", evt => {
    const countrytObject = evt.detail;
    this.render(countrytObject);
  });
};

ResultView.prototype.render = function(country) {
  this.container.innerHTML = "";

  const name = this.createElement("h2", country.name);
  this.container.appendChild(name);

  const region = this.createElement("p", country.region);
  this.container.appendChild(region);

  const languageParagraph = this.createElement("p", "Languages:");
  this.container.appendChild(languageParagraph);

  const language = this.createLi(country.languages);
  this.container.appendChild(language);

  const flag = document.createElement("img");
  flag.src = country.flag;
  this.container.appendChild(flag);
};

ResultView.prototype.createElement = function(elementType, text) {
  const element = document.createElement(elementType);
  element.textContent = text;
  return element;
};

ResultView.prototype.createLi = function(languages) {
  const list = document.createElement("ul");

  languages.forEach(language => {
    const languageItem = document.createElement("li");

    languageItem.textContent = language.name;
    list.appendChild(languageItem);
  });
  return list;
};

module.exports = ResultView;
