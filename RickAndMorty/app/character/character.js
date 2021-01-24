const httpModule = require("tns-core-modules/http");

const createViewModel = require("../character/character-view-model").createViewModel;

var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var page;

var pageData = new observableModule.fromObject({
    groceryList: new ObservableArray([]),
    name:'',
    status:'',
    species:'',
    type:'',
    gender:'',
    origin:'',
    location:'',
    image:'',
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
        pageData.status = r.status;
        pageData.species = r.species;
        pageData.type = r.type;
        pageData.gender = r.gender;
        pageData.origin = r.origin;
        pageData.location = r.location;
        pageData.image = r.image
        for (var i in r.episode) {
            var episode = r.episode[i]
            httpModule.getJSON(episode).then((r) => {
                pageData.groceryList.push(r)
            }, (e) => {
            });
        }
    }, (e) => {
    });
    page.bindingContext = pageData;
    
}

exports.onNavigatingTo = onNavigatingTo;

function onItemTap(args) {
    const index = args.index;
}
exports.onItemTap = onItemTap;