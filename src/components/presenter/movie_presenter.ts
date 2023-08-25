import { MovieCardProps } from "components/MovieCard";
import { makeAutoObservable, observable, } from "mobx";
import CONSTANTS from "utils/constants";
import service from "utils/service";

export interface MoviePresenter {
    loadNextPage(store: Store): Promise<void>;
}

export interface MovieStore {
    list: MovieCardProps[];
    loading: boolean;
    query: string;
    page: number;
    totalPage: number;
    total: number;
}

let store: Store;
let presenter: Presenter;

class Store implements MovieStore {
    list: any[] = [];
    loading: boolean = false;
    query: string = "";
    page: number = 1;
    totalPage: number = 1;
    total: number = 0;
    constructor() {
        makeAutoObservable(this, {
            list: observable.ref,
            loading: observable.ref,
            query: observable.ref,
            page: observable.ref,
            totalPage: observable.ref,
            total: observable.ref,
        });
    }
}

class Presenter implements MoviePresenter {
    async loadNextPage(store: Store) {
        const text = store.query ? "search/movie" : "movie/upcoming"
        const data = await service.get(`${CONSTANTS.BASE_URL}${text}`, {
            query: store.query,
            page: store.page,
            include_adult: false,
            include_video: false,
            language: "en-US",
        });
        store.list = store.page === 1 ? [...data.results] : [...store.list, ...data.results];
        store.page = data.page;
        store.totalPage = data.total_pages;
        store.total= data.total_results;
        console.log("dta get", data);
    }
}

export function useMoviePresenter(): MoviePresenter {

    if (!presenter) {
        presenter = new Presenter();
    }
    return presenter;
}
export function useMovieStore(): MovieStore {
    if (!store) {
        store = new Store();
    }
    return store;
}