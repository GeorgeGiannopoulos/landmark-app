import { Component, OnInit, OnChanges } from '@angular/core';
import { Input, SimpleChanges, AfterViewInit } from '@angular/core';

import * as L from 'leaflet';

@Component({
    selector: 'app-leaflet-map',
    templateUrl: './leaflet-map.component.html',
    styleUrls: ['./leaflet-map.component.scss'],
})
export class LeafletMapComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() location: number[];
    @Input() title = '';
    private map;

    private initZoom = 5;
    private minZoom = 1;
    private maxZoom = 19;
    private panZoom = 15;

    // =========== Component Methods ===========
    constructor() {}

    ngOnInit(): void {
        this.initMap(this.location);
        this.updateMapTile();
    }

    ngOnChanges(change: SimpleChanges) {
        if (change.location.currentValue) {
            this.location = change.location.currentValue;
        } else {
            this.initZoom = this.minZoom; // In case the location is not set then start from world level
        }
        if (change.title.currentValue) {
            this.title = change.title.currentValue;
        }
    }

    ngAfterViewInit(): void {
        this.updateMapCenter(this.location);
        this.addMapPin(this.location, this.title);
    }

    // =========== Component Custom Methods ===========
    private initMap(location: number[]): void {
        this.map = L.map('map', {
            center: [location[1], location[0]],
            zoom: this.initZoom,
        });
    }

    private updateMapTile(): void {
        const tiles = L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                maxZoom: this.maxZoom,
                attribution: '...',
                    // '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }
        );

        tiles.addTo(this.map);
    }

    private updateMapCenter(location: number[]): void {
        // Pans the map to a given center
        // this.map.panTo(new L.LatLng(location[1], location[0]));
        // this.map.setZoom(this.panZoom)

        // Sets the view of the map (geographical center and zoom) performing a smooth pan-zoom animation
        this.map.flyTo(new L.LatLng(location[1], location[0]), this.panZoom);
    }

    private addMapPin(location: number[], title: string): void {
        L.marker([location[1], location[0]], {
            icon: L.icon({
                iconSize: [ 25, 41 ],
                iconAnchor: [ 13, 41 ],
                popupAnchor:  [0, -50],
                iconUrl: 'leaflet/marker-icon.png',
                iconRetinaUrl: 'leaflet/marker-icon-2x.png',
                shadowUrl: 'leaflet/marker-shadow.png',
            })
        }).addTo(this.map).bindPopup(title).openPopup();
    }

}
