import { 
  Directive,
  ElementRef,
  Input,
  Injector,
  ApplicationRef,
  ViewContainerRef,
  ComponentRef,
  Component,
  Renderer
} from '@angular/core';


@Component({
  selector: 'test',
  template: `<div>
  <p>test component</p>
  </div>` 
})
export class TestComponent {
  private hostprop = 'clicked it';
  public someValue = 1;

  constructor(
    private vcRef: ViewContainerRef,
  ) {
    console.log('pc');
    console.log(this.vcRef);
  }

  clicked() {
    console.log(this.hostprop);
    console.log(this.vcRef);
  }

  ngOnInit() {
    const outerScope = this;
    setInterval(function(){
      outerScope.someValue++;
    }, 3000);
  }
}

@Component({
  selector: 'app',
  template: `<div>
  <templation [component]="testComponent" [componentDeps]="componentDeps" [template]="template1" ></templation>
  <templation [component]="testComponent" [componentDeps]="componentDeps" [template]="template2" ></templation>
  </div>` 
})
export class AppComponent {
  private testComponent = TestComponent;
  private componentDeps = [ViewContainerRef];
  private template1 = `<p (click)="clicked()">the new template1{{someValue}}</p>`;
  private template2 = `<p (click)="clicked()">the newer template</p>`;

  constructor(
    private injector: Injector,
  ) {
  }

}
