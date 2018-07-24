import { InjectionToken } from '@angular/core';
import { Config } from './config'

export const apiConfig = {
    movieUrl: "https://api.themoviedb.org/3/movie",
    searchUrl: "https://api.themoviedb.org/3/search",
    personUrl: "https://api.themoviedb.org/3/person",
    params: "api_key=df219c5486f4e7b2218cb6ee83ed1723&language=ru-RU&",

    midImgPath: "https://image.tmdb.org/t/p/w500",
    smallImgPath: "https://image.tmdb.org/t/p/w185",
    bigBackPath: "https://image.tmdb.org/t/p/w1280",
    midBackPath: "https://image.tmdb.org/t/p/w780",
    smallBackPath: "https://image.tmdb.org/t/p/w300"
}

export const API_CONFIG = new InjectionToken<Config>('qwerty')