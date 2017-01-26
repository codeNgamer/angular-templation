import { 
  Component,
  NgModule,
  ComponentFactoryResolver,
  Input,
  Injector,
  ComponentRef,
  ViewContainerRef,
  Compiler,
} from '@angular/core';

import { CommonModule }   from '@angular/common';

@Component({
  selector: 'templation',
  template: `<div></div>`
})
export class TemplationComponent {
  @Input() imports: [] = null;
  @Input() template: string = null;
  @Input() component: any;
  constructor(
    private vr: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
    private compiler: Compiler 
  ) { }

  ngOnInit() {
    this.renderComponent();
  }

  renderComponent() {
    const hasTemplate =  !!this.template;
    if (!this.component || !hasTemplate) return false;
    const templatedComponent = this.returnTemplatedComponent();
    const templationModule = this.returnTemplationModule({ templatedComponent });

    this.compiler.compileModuleAndAllComponentsAsync(templationModule)
    .then(factory => {
      const compFactory = factory.componentFactories.find(x => x.componentType === templatedComponent);
      const cmpRef = this.vr.createComponent(compFactory, 0);
    });
  }

  // will be used to get dependecies from constructor of
  // parent class
  private getDeps(func) {
    // First match everything inside the function argument parens.
    const args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];
    // Split the arguments string into an array comma delimited.
    return args.split(',').map(function(arg) {
     // Ensure no inline comments are parsed and trim the whitespace.
      return arg.replace(/\/\*.*\*\//, '').trim();
    }).filter(function(arg) {
     // Ensure no undefined values are added.
      return arg;
    });
  }

  returnTemplatedComponent() {
    const componentDeps = this.getDeps(this.component);
    const diParams = componentDeps.map(dep => this.component[dep]);

    const componentMeta = { 
      selector: 'templatedComponent',
      template: this.template,
    };

    @Component(componentMeta)
    class TemplatedComponent extends this.component {
      constructor() { 
        // super(diParams);
      }
    }

    const componentInstance = new this.component(diParams);
    const componentKeys = Object.keys(componentInstance);
    componentKeys.map(key =>  TemplatedComponent[key] = componentInstance[key]);

    return TemplatedComponent;
  }

  returnTemplationModule({ templatedComponent }) {
    const dynamicImports = this.imports;
    @NgModule({ 
      imports: dynamicImports,
      declarations: [templatedComponent]
    })
    class TemplationModule {}
    return TemplationModule;
  }

}
