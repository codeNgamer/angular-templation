"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var TestComponent = (function () {
    function TestComponent(vcRef) {
        this.vcRef = vcRef;
        this.hostprop = 'clicked it';
        this.someValue = 1;
        console.log('pc');
        console.log(this.vcRef);
    }
    TestComponent.prototype.clicked = function () {
        console.log(this.hostprop);
        console.log(this.vcRef);
    };
    TestComponent.prototype.ngOnInit = function () {
        var outerScope = this;
        setInterval(function () {
            outerScope.someValue++;
        }, 3000);
    };
    TestComponent = __decorate([
        core_1.Component({
            selector: 'test',
            template: "<div>\n  <p>test component</p>\n  </div>"
        }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef])
    ], TestComponent);
    return TestComponent;
}());
exports.TestComponent = TestComponent;
var AppComponent = (function () {
    function AppComponent(injector) {
        this.injector = injector;
        this.testComponent = TestComponent;
        this.componentDeps = [core_1.ViewContainerRef];
        this.template1 = "<p (click)=\"clicked()\">the new template1{{someValue}}</p>";
        this.template2 = "<p (click)=\"clicked()\">the newer template</p>";
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            template: "<div>\n  <templation [component]=\"testComponent\" [componentDeps]=\"componentDeps\" [template]=\"template1\" ></templation>\n  <templation [component]=\"testComponent\" [componentDeps]=\"componentDeps\" [template]=\"template2\" ></templation>\n  </div>"
        }), 
        __metadata('design:paramtypes', [core_1.Injector])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map