import { 
  Directive,
  ElementRef,
  Input,
  ViewContainerRef,
  ComponentRef,
  Compiler,
  TemplateRef,
  Renderer
} from '@angular/core';

@Directive({
  selector: '[templation]',
})
export class TemplationDirective {
  @Input() templation: string = null;
  constructor(
    private vcRef: ViewContainerRef,
    private compiler: Compiler
  ) {
  }

  ngAfterViewInit() {
    console.log(this.vcRef);
    // console.log(this.vcRef);
    // console.log(this.templation);

    // console.log('end');

    // this.renderView();
  }

  componentInit(e) {
    console.log(e);

  }

  ngOnChanges() {
    this.renderView();
  }

  renderView() {
    // always use current template path
    // this.templatePath;

    //need reference to host component
  }
}

