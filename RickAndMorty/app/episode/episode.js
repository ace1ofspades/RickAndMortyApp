const httpModule = require("tns-core-modules/http");

const createViewModel = require("../episode/episode-view-model").createViewModel;

var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var page;

var pageData = new observableModule.fromObject({
    groceryList: new ObservableArray([]),
    name:'',
    air_date:'',
    episode:'',
    title:''
})
var list = new Array();
function onNavigatingTo(args) {
    const page = args.object;

    pageData.groceryList = new ObservableArray([]);
    
    httpModule.getJSON(page.navigationContext.url).then((r) => {
        console.log(r)
        pageData.name = r.name;
        pageData.title = r.name;
        pageData.air_date = r.air_date;
        pageData.episode = r.episode;
        for (var i in r.characters) {
            var character = r.characters[i]
            httpModule.getJSON(character).then((r) => {
                pageData.groceryList.push(r)
            }, (e) => {
            });
        }
    }, (e) => {
    });
    page.bindingContext = pageData;
    
}

exports.onNavigatingTo = onNavigatingTo;

var frameModule = require('ui/frame')
function onItemTap(args) {
    const index = args.index;
    frameModule.topmost().navigate({
        moduleName: "./character/character",
        context: { url: `${pageData.groceryList._array[index].url}`}
    });
}
exports.onItemTap = onItemTap;