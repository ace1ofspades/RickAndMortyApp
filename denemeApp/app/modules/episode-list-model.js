var config = require("./episodes-config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;

function GroceryListViewModel(items) {
    var baseUrl = config.apiUrl;
    var viewModel = new ObservableArray(items);
    console.log(baseUrl)
    viewModel.load = function() {
        return fetchModule.fetch(baseUrl, {
            headers:getCommonHeaders(),
        })
        .then(handleErrors)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.forEach((grocery) => {
                viewModel.push(grocery)
            })
        })
    }

    viewModel.empty = function () {
        while (viewModel.lenght) {
            viewModel.pop();
        }
    }

    return viewModel;
}

function getCommonHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": "Kinvey " + config.token
    }
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports = GroceryListViewModel;