import { NgModule } from '@angular/core';

// PrimeNG
// A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
import {ButtonModule} from 'primeng/button';
import {CarouselModule} from 'primeng/carousel';
import {ImageModule} from 'primeng/image';
import {RippleModule } from 'primeng/ripple';





@NgModule({
  exports:[
    ButtonModule,
    CarouselModule,
    ImageModule,
    RippleModule
  ]
})
export class PrimeNgModule { }
