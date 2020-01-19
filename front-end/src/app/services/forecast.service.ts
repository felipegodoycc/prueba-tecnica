import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retryWhen, delay, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  apiUrl = 'http://localhost:3001/api/v1/clima'

  constructor(private http: HttpClient) { }

  getWeather(city: string){
    const url = `${this.apiUrl}/${city}`;
    return this.http.get(url)
            .pipe(
              retryWhen(errors =>
                errors.pipe(
                  delay(1000),
                  tap(errorStatus => {
                    console.log('error',errorStatus);
                    if (errorStatus.status != 500) {
                      throw errorStatus;
                    }          
                    console.log('Retrying...');
                  })
                )
              ),
            map( (res:any) => {
              return res.data.currently;
            }),
            );
  }
}
