import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: [
    `
    img{
      height: 400px;
      border-radius: 7px;
    }

    :host ::ng-deep .p-galleria-indicators {
      border-radius: 0px 0px 7px 7px;
    }
    `
  ]
})
export class InicioComponent implements OnInit {

  images: any[] = [
    {
      previewImageSrc: '../../../../assets/images/edificio.jpg',
      thumbnailImageSrc: "../../../../assets/images/edificio.jpg",
      alt: 'Description for Image 1',
      title: 'Title 1'
    },
    {
      previewImageSrc: '../../../../assets/images/edificio2.jpg',
      thumbnailImageSrc: "../../../../assets/images/edificio2.jpg",
      alt: 'Description for Image 1',
      title: 'Title 1'
    },
    {
      previewImageSrc: '../../../../assets/images/edificio6.jpg',
      thumbnailImageSrc: "../../../../assets/images/edificio6.jpg",
      alt: 'Description for Image 1',
      title: 'Title 1'
    },
  ];

  responsiveOptions:any[] = [
    {
        breakpoint: '1024px',
        
    }
];

  constructor() { }


  ngOnInit(): void {
  }

}
