import { Component, OnInit } from '@angular/core';

import { Area } from '../../interfaces/area.interface';
import { AreasService } from '../../services/areas.service';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { TimestampService } from '../../services/timestamp.service';

interface TableCols {
  field: string;
  header: string;
  style: string;
}

@Component({
  selector: 'app-mantenimiento-areas',
  templateUrl: './mantenimiento-areas.component.html',
  styles: []
})
export class MantenimientoAreasComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

}
