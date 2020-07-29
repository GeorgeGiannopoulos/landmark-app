import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { Landmark } from '../models';

@Injectable({
    providedIn: 'root',
})
export class LandmarkService {
    private url = environment.PARSE_SERVER.BASE_URL;

    constructor(private httpClient: HttpClient, private authService: AuthService) {}

    private getHttpHeader(mode: string) {
        if (mode === 'secure') {
            return {
                headers: new HttpHeaders({
                    'X-Parse-Application-Id': environment.PARSE_SERVER.APP_ID,
                    'X-Parse-Session-Token': this.authService.getSessionToken,
                }),
            };
        } else {
            return {
                headers: new HttpHeaders({
                    'X-Parse-Application-Id': environment.PARSE_SERVER.APP_ID,
                }),
            };
        }
    }

    public getLandmarks(): Observable<Landmark[]> {
        const url = this.url + '/landmarks/get_landmarks';
        return this.httpClient.get<Landmark[]>(url, this.getHttpHeader(''));
    }

    public getLandmarksByID(id: string): Observable<Landmark> {
        const url = this.url + '/landmarks/get_landmark_by_id/' + id;
        return this.httpClient.get<Landmark>(url, this.getHttpHeader(''));
    }

    public updateLandmark(landmark: Landmark): Observable<Landmark> {
        const url = this.url + '/landmarks/update_landmark/' + `${landmark.objectId}`;
        return this.httpClient.post<Landmark>(url, landmark, this.getHttpHeader('secure'));
    }

    public updateLandmarkPhoto(landmark: Landmark, formData: FormData): Observable<Landmark> {
        const url = this.url + '/landmarks/update_image/' + `${landmark.objectId}`;
        return this.httpClient.post<Landmark>(url, formData, this.getHttpHeader('secure'));
    }
}
