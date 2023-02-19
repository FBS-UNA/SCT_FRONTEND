import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimestampService {

  constructor() { }

  get fechaActual(){
    return new Date(Date.now()).toLocaleDateString('en-GB');
  }

  get horaCompleta(){
    return new Date(Date.now()).toLocaleTimeString();
    // return new Date(Date.now()).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }

  get horas(){
    return new Date(Date.now()).getHours();
  }
  get minutos(){
    return new Date(Date.now()).getMinutes();
  }
  get segundos(){
    return new Date(Date.now()).getSeconds();
  }
}
