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
  @Input() templatePath: string = null;
  @Input() template: string = null;
  @Input() component: any;
  constructor(
    private vr: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
    private compiler: Compiler 
  ) {}

  ngOnInit() {
    this.renderComponent();
  }

  renderComponent() {
    const hasTemplate = this.templatePath || this.template;
    if (!this.component || !hasTemplate) return false;
    const templatedComponent = this.returnTemplatedComponent();
    const templationModule = this.returnTemplationModule({ templatedComponent });

    this.compiler.compileModuleAndAllComponentsAsync(templationModule)
    .then(factory => {
      const compFactory = factory.componentFactories.find(x => x.componentType === templatedComponent);
      const cmpRef = this.vr.createComponent(compFactory);
    })
  }

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
    const componentDeps = this.getDeps(this.component.constructor);
    const diParams = componentDeps.map(dep => this.component[dep]);

    const componentMeta = { 
      selector: 'templatedComponent',
    };
    const templateType = this.templatePath ? 'templateUrl' : 'template';
    componentMeta[templateType] = (templateType === 'templateUrl') ? this.templatePath : this.template;
    @Component(componentMeta)
    class TemplatedComponent extends this.component {
      constructor() {
      }
    }
    return TemplatedComponent;
  }

  returnTemplationModule({ templatedComponent }) {
    @NgModule({ 
      imports: [CommonModule],
      declarations: [templatedComponent]
    })
    class TemplationModule {}
    return TemplationModule;
  }

}
