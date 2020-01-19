import { Component, OnInit, Input } from '@angular/core';
import { ForecastService } from 'src/app/services/forecast.service';
import { Weather } from 'src/app/shared/interface/weather.interface';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.css']
})
export class CityCardComponent implements OnInit {
  @Input() cityName = "";
  private updateSubscription: Subscription;
  loading = true;
  lastUpdate;
  weather:Weather;

  constructor(private forecastService: ForecastService) { }

  ngOnInit() {
    this.updateSubscription = interval(10000).subscribe( val => {
      this.updateWeather();
    });
  }

  updateWeather(){
    this.loading = true;
    this.forecastService.getWeather(this.cityName).subscribe( (res:any)=> {
      this.lastUpdate = Date.now();
      this.weather = res;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

}
