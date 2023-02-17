import { NgModule } from '@angular/core';

// PrimeNG
// A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';
import {DividerModule} from 'primeng/divider';
import {ImageModule} from 'primeng/image';
import {MenubarModule} from 'primeng/menubar';
import {RippleModule } from 'primeng/ripple';





@NgModule({
  exports:[
    ButtonModule,
    CardModule,
    CarouselModule,
    DividerModule,
    ImageModule,
    MenubarModule,
    RippleModule
  ]
})
export class PrimeNgModule { }
