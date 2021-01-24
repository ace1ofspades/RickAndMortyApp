const httpModule = require("tns-core-modules/http");
const createViewModel = require("./main-view-model").createViewModel;

var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;

var pageData = new observableModule.fromObject({
    groceryList: new ObservableArray([]),
    info:''
})
var list = new Array();

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = pageData;
    getPage("https://rickandmortyapi.com/api/episode");
}

exports.onNavigatingTo = onNavigatingTo;

var frameModule = require('ui/frame')
function onItemTap(args) {
    const index = args.index;
    frameModule.topmost().navigate({
        moduleName: "./episode/episode",
        context: { url: `${pageData.groceryList._array[index].url}`}
    });
}
exports.onItemTap = onItemTap;

function previoustap(args) {
    if (pageData.info.prev != null) {
        getPage(pageData.info.prev)
    }
}
exports.previoustap = previoustap;
function nextbuttontap(args) {
    if (pageData.info.next != null) {
        getPage(pageData.info.next)
    }
}
exports.nextbuttontap = nextbuttontap;

function getPage(url) {
    pageData.groceryList = new ObservableArray([]);
    httpModule.getJSON(url).then((r) => {
        pageData.info = r.info;
        for (var i in r.results) {
            var episode = r.results[i]
            pageData.groceryList.push(episode)
        }
    }, (e) => {
    });
}