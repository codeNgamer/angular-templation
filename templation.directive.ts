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
}

