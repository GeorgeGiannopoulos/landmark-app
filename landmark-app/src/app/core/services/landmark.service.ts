import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { environment } from '../../../environments/environment';
import { Landmark } from '../models';

@Injectable({
    providedIn: 'root',
})
export class LandmarkService {
    private url = environment.PARSE_SERVER.BASE_URL;

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Parse-Application-Id': environment.PARSE_SERVER.APP_ID,
        }),
    };

    constructor(private httpClient: HttpClient) {}

    public getLandmarks(): Observable<Landmark[]> {
        const url = this.url + '/landmarks/get_landmarks';
        return this.httpClient.get<Landmark[]>(url, this.httpOptions);
    }

    public getLandmarksByID(id: string): Observable<Landmark> {
        const url = this.url + '/landmarks/get_landmark_by_id/' + id;
        return this.httpClient.get<Landmark>(url, this.httpOptions);
    }

    public updateLandmark(landmark: Landmark): Observable<Landmark> {
        const url = this.url + '/landmarks/update_landmark/' + `${landmark.objectId}`;
        return this.httpClient.post<Landmark>(url, landmark, this.httpOptions);
    }
}
