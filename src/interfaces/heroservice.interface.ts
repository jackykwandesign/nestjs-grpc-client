import { Observable } from "rxjs";
import { HeroById } from "./hero-by-id.interface";
import { Hero } from "./hero.interface";

export interface HeroesService {
    findOne(data: HeroById): Observable<Hero>;
    findMany(upstream: Observable<HeroById>): Observable<Hero>;
}