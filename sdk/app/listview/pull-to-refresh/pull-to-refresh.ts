
import viewModel = require("./pts-view-model");
import listViewModule = require("nativescript-telerik-ui-pro/list-view");

export function onPageLoaded(args){
    var page = args.object;

    page.bindingContext = new viewModel.ViewModel();
}
