import { NgModule } from '@angular/core';

// PrimeNG
// A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';
import {DividerModule} from 'primeng/divider';
import {GalleriaModule} from 'primeng/galleria';
import {ImageModule} from 'primeng/image';
import {InputTextModule} from 'primeng/inputtext';
import {MenubarModule} from 'primeng/menubar';
import {PasswordModule} from 'primeng/password';
import {RippleModule } from 'primeng/ripple';
import {ScrollTopModule} from 'primeng/scrolltop';
import {ToastModule} from 'primeng/toast';


import { MessageService } from 'primeng/api';



@NgModule({
  providers:[
    MessageService
  ],
  exports:[
    ButtonModule,
    CardModule,
    CarouselModule,
    DividerModule,
    GalleriaModule,
    ImageModule,
    InputTextModule,
    MenubarModule,
    PasswordModule,
    RippleModule,
    ScrollTopModule,
    ToastModule
  ]
})
export class PrimeNgModule { }
