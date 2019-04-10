const PubSub = require("../helpers/pub_sub.js");
const RequestHelper = require("../helpers/request_helper.js");

const Country = function() {
  this.text = null;
};

Country.prototype.getData = function() {
  // PubSub.publish("Countries:country-loaded", this.text);

  const requestHelper = new RequestHelper(
    "https://restcountries.eu/rest/v2/all"
  );
  requestHelper.get(data => {
    this.text = data;
    PubSub.publish("Countries:country-loaded", data);
  });

  PubSub.subscribe("Countries:selected", event => {
    const selectedIndex = event.detail;
    this.publishCountryDetail(selectedIndex);
  });
};

Country.prototype.publishCountryDetail = function(selectedIndex) {
  const selectedCountry = this.text[selectedIndex];

  PubSub.publish("Countries:selected-country-loaded", selectedCountry);
  console.log(selectedIndex);
};

module.exports = Country;
