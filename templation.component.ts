import { 
  Component,
  NgModule,
  ComponentFactoryResolver,
  Input,
  ApplicationRef,
  Injector,
  ReflectiveInjector,
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
  @Input() imports: [];
  @Input() template: string;
  @Input() component: any;
  @Input() componentDeps: any;
  constructor(
    private vr: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
    private compiler: Compiler, 
    private appRef: ApplicationRef,
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

  composeDeps(componentDeps) {
    const deps = [];
    Object.keys(componentDeps).map(key => {
      const dynamicClass = componentDeps[key];
      deps.push(eval("key : dynamicClass"));
    });

    return deps;
  }

  returnTemplatedComponent() {
    const deps = this.composeDeps(this.componentDeps);

    const componentMeta = { 
      selector: 'templatedComponent',
      template: this.template,
    };

    @Component(componentMeta)
    class TemplatedComponent extends this.component {
      constructor() {
        super(...deps);
      }
    }

    return TemplatedComponent;
  }

  returnTemplationModule({ templatedComponent }) {
    const dynamicImports = this.imports;

    @NgModule({ 
      imports: dynamicImports,
      entryComponents: [templatedComponent],
      declarations: [templatedComponent]
    })
    class TemplationModule {}
    return TemplationModule;
  }

}
