import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @Output() addToWatchListEvent = new EventEmitter<any>();
  constructor(
    private service: MovieApiServiceService,
    private router: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) {}

  getMovieDetailResult: any;
  getMovieVideoResult: any;
  getMovieCastResult: any;
  aboutMovie: boolean = true;
  cast: boolean = true;

  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    console.log(getParamId, 'getparamid#');

    this.getMovie(getParamId);
    this.getVideo(getParamId);
    this.getMovieCast(getParamId);
    this.displayWatchList();
  }

  getMovie(id: any) {
    this.service.getMovieDetails(id).subscribe(async (result) => {
      console.log(result, 'getmoviedetails#');
      this.getMovieDetailResult = await result;

      // updatetags
      this.title.setTitle(
        `${this.getMovieDetailResult.original_title} | ${this.getMovieDetailResult.tagline}`
      );
      this.meta.updateTag({
        name: 'title',
        content: this.getMovieDetailResult.original_title,
      });
      this.meta.updateTag({
        name: 'description',
        content: this.getMovieDetailResult.overview,
      });

      // facebook
      this.meta.updateTag({ property: 'og:type', content: 'website' });
      this.meta.updateTag({ property: 'og:url', content: `` });
      this.meta.updateTag({
        property: 'og:title',
        content: this.getMovieDetailResult.original_title,
      });
      this.meta.updateTag({
        property: 'og:description',
        content: this.getMovieDetailResult.overview,
      });
      this.meta.updateTag({
        property: 'og:image',
        content: `https://image.tmdb.org/t/p/original/${this.getMovieDetailResult.backdrop_path}`,
      });
    });
  }

  getVideo(id: any) {
    this.service.getMovieVideo(id).subscribe((result) => {
      console.log(result, 'getMovieVideo#');
      result.results.forEach((element: any) => {
        if (element.type == 'Trailer') {
          this.getMovieVideoResult = element.key;
        }
      });
    });
  }

  getMovieCast(id: any) {
    this.service.getMovieCast(id).subscribe((result) => {
      console.log(result, 'movieCast#');
      this.getMovieCastResult = result.cast;
    });
  }

  addToWatchList() {
    var movieDetails = {
      backdrop_path: this.getMovieDetailResult.backdrop_path,
      poster_path: this.getMovieDetailResult.poster_path,
      original_title: this.getMovieDetailResult.original_title,
      overview: this.getMovieDetailResult.overview,
    };
    this.addToWatchListEvent.emit(movieDetails);

    var watchList = this.getWatchListFromLocalStorage();

    // Check if the movie already exists in the watch list
    var movieExists = watchList.some(function (movie: any) {
      return movie.original_title === movieDetails.original_title;
    });

    if (movieExists) {
      alert('Bu film zaten izleme listenizde');
      return;
    }

    watchList.push(movieDetails);
    this.saveWatchListToLocalStorage(watchList);
    this.displayWatchList();
  }

  getWatchListFromLocalStorage(): any[] {
    var watchListString = localStorage.getItem('watchList');

    if (watchListString) {
      return JSON.parse(watchListString);
    } else {
      return [];
    }
  }

  saveWatchListToLocalStorage(watchList: any[]) {
    localStorage.setItem('watchList', JSON.stringify(watchList));
  }

  displayWatchList() {
    var watchList = this.getWatchListFromLocalStorage();
    var watchListElement = document.getElementById('watchList');
    if (watchListElement) {
      watchListElement.innerHTML = '';

      for (var i = 0; i < watchList.length; i++) {
        var movieItem = document.createElement('li');
        movieItem.textContent = watchList[i].original_title;
        watchListElement.appendChild(movieItem);
      }
    }
  }
}
