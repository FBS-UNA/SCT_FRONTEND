import { NgModule } from '@angular/core';

// PrimeNG
// A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {DialogModule} from 'primeng/dialog';
import {DividerModule} from 'primeng/divider';
import {DropdownModule} from 'primeng/dropdown';
import {GalleriaModule} from 'primeng/galleria';
import {ImageModule} from 'primeng/image';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import {MenubarModule} from 'primeng/menubar';
import {PasswordModule} from 'primeng/password';
import {PickListModule} from 'primeng/picklist';
import {RippleModule } from 'primeng/ripple';
import {ScrollTopModule} from 'primeng/scrolltop';
import {SidebarModule} from 'primeng/sidebar';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';

import { MessageService } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';




@NgModule({
  providers:[
    MessageService,
    ConfirmationService
  ],
  exports:[
    ButtonModule,
    CalendarModule,
    CardModule,
    CarouselModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    GalleriaModule,
    ImageModule,
    InputSwitchModule,
    InputTextareaModule,
    InputTextModule,
    MenubarModule,
    PasswordModule,
    PickListModule,
    RippleModule,
    ScrollTopModule,
    SidebarModule,
    TableModule,
    ToastModule,
    ToolbarModule
  ]
})
export class PrimeNgModule { }
