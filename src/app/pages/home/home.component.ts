import { Component, OnInit } from '@angular/core';

import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bannerResult: any = [];
  getNowPlayingResult: any = [];
  upComingResult: any = [];
  topRatedResult: any = [];
  popularResult: any = [];
  showNowPlaying: boolean = true;
  showUpcoming: boolean = true;
  showtopRated: boolean = true;
  showPopular: boolean = true;

  constructor(private service: MovieApiServiceService) {}

  ngOnInit(): void {
    this.bannerData();
    this.getNowPlayingData();
    this.upComingData();

    var swiper = new Swiper('.mySwiper', {
      slidesPerView: 5,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }

  bannerData() {
    this.service.bannerApiData().subscribe((response) => {
      console.log(response, 'bannerresult#');
      // Veriyi dizi yapısına çevirme
      if (response && response.results) {
        if (Array.isArray(response.results)) {
          this.bannerResult = response.results.slice(0, 10); // İlk 10 nesneyi sınırlama
        } else {
          this.bannerResult = [response.results]; // Veriyi tek bir elemanlık bir diziye çevirme
        }
      } else {
        console.error('Invalid response format: results property not found.');
      }
    });
  }

  onClickNowPlaying() {
    this.disableAll();
    this.showNowPlaying = true;
    this.getNowPlayingData();
  }

  onClickUpcoming() {
    this.disableAll();
    this.showUpcoming = true;
    this.upComingData();
  }

  onClicktopRated() {
    this.disableAll();
    this.showtopRated = true;
    this.topRatedData();
  }

  onClickPopular() {
    this.disableAll();
    this.showPopular = true;
    this.popularData();
  }

  getNowPlayingData() {
    this.service.getNowPlayingData(1).subscribe((response) => {
      console.log(response, 'getNowPlayingResult#');
      // Veriyi dizi yapısına çevirme
      if (response && response.results) {
        if (Array.isArray(response.results)) {
          this.getNowPlayingResult = response.results.slice(0, 20); // İlk 10 nesneyi sınırlama
        } else {
          this.getNowPlayingResult = [response.results]; // Veriyi tek bir elemanlık bir diziye çevirme
        }
      } else {
        console.error('Invalid response format: results property not found.');
      }
    });
  }

  upComingData() {
    this.service.upComingData(2).subscribe((response) => {
      console.log(response, 'upComingResult#');
      // Veriyi dizi yapısına çevirme
      if (response && response.results) {
        if (Array.isArray(response.results)) {
          this.upComingResult = response.results.slice(0, 20); // İlk 10 nesneyi sınırlama
        } else {
          this.upComingResult = [response.results]; // Veriyi tek bir elemanlık bir diziye çevirme
        }
      } else {
        console.error('Invalid response format: results property not found.');
      }
    });
  }

  topRatedData() {
    this.service.topRatedData(3).subscribe((response) => {
      console.log(response, 'topRatedResult#');
      // Veriyi dizi yapısına çevirme
      if (response && response.results) {
        if (Array.isArray(response.results)) {
          this.topRatedResult = response.results.slice(0, 20); // İlk 10 nesneyi sınırlama
        } else {
          this.topRatedResult = [response.results]; // Veriyi tek bir elemanlık bir diziye çevirme
        }
      } else {
        console.error('Invalid response format: results property not found.');
      }
    });
  }

  popularData() {
    this.service.popularData(4).subscribe((response) => {
      console.log(response, 'popularResult#');
      // Veriyi dizi yapısına çevirme
      if (response && response.results) {
        if (Array.isArray(response.results)) {
          this.popularResult = response.results.slice(0, 20); // İlk 10 nesneyi sınırlama
        } else {
          this.popularResult = [response.results]; // Veriyi tek bir elemanlık bir diziye çevirme
        }
      } else {
        console.error('Invalid response format: results property not found.');
      }
    });
  }

  disableAll() {
    this.showNowPlaying = false;
    this.showUpcoming = false;
    this.showtopRated = false;
    this.showPopular = false;
  }
}
