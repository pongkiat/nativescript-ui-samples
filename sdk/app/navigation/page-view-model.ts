import { NavigationItem } from "./navigation-item";
import  { Observable } from "tns-core-modules/data/observable";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { topmost } from "tns-core-modules/ui/frame";
import * as app from "tns-core-modules/application";

export class PageViewModel extends Observable {
    public sideDrawer: RadSideDrawer;

    constructor (parent?: NavigationItem, subitems?: Array<NavigationItem>, hasBack?: boolean) {
        super();
        this._currentParent = parent;
        this._currentSubItems = subitems;
        this._hasBackNavigation = hasBack;
    }

    get _currentSubItems(): Array<NavigationItem> {
        return this.get("currentSubItems");
    }

    set _currentSubItems(value: Array<NavigationItem>) {
        this.set("currentSubItems", value);
    }

    get _currentParent() {
        return this.get("currentParent");
    }

    set _currentParent(value: NavigationItem) {
        this.set("currentParent", value);
    }

    get _actionBarTitle() {
        return this.get("actionBarTitle");
    }

    set _actionBarTitle(value: string) {
        this.set("actionBarTitle", value);
    }

    get _hasBackNavigation() {
        return this.get("hasBackNavigation");
    }

    set _hasBackNavigation(value: boolean) {
        this.set("hasBackNavigation", value);
    }

    public onBackTap(args) {
        topmost().goBack();
    }

    public onNavigationItemTap(args) {
        var itemIndex = args.index;
        var tappedItem = this._currentSubItems[itemIndex];
        if (tappedItem.module === undefined) {
            this._hasBackNavigation = tappedItem.parent !== undefined;
        }
        let hasBack = tappedItem.parent !== undefined;
        let nextPageContext = new PageViewModel(tappedItem, tappedItem.subItems, hasBack);

        let sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
        if (tappedItem.subItems.length > 0) {
            topmost().navigate({
                moduleName: "navigation/category-list-nested-page",
                context: nextPageContext
            });
        } else {
            if (tappedItem.module) {
                topmost().navigate({
                    moduleName: tappedItem.module,
                    context: tappedItem
                });
            }
        }
    }
}