import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @Input() coords: string;
  @ViewChild('mapa', {static: true}) mapa: any;

  constructor() { }

  ngOnInit() {

    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

    mapboxgl.accessToken = 'pk.eyJ1IjoiaGlsZGVicmFuZHQtbS1pIiwiYSI6ImNrOXQ4ODU5NzA3cWczc25kaHpuNjFwM3gifQ.57SQlEIBxXrHRn7u3PiBAg';
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ lng, lat ],
      zoom: 15
    });

    const marker = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo( map );

  }

}
