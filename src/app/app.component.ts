import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  addToWatchList(movie: any) {
    // İzleme listesine film eklemek için gerekli işlemleri yapın
  }
  constructor() {}

  title = 'movie_app';
}
