import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appHighlight]'
})
export class HighLightDirective {

    @HostBinding('style.backgroundColor') backGroundColor: string = 'blue';

    @HostListener('mouseenter') mounseEnter() {
        this.backGroundColor = 'yellow';
    }

    @HostListener('mouseleave') mouseLeave() {
        this.backGroundColor = 'blue';
    }
    
}