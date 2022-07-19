import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, ReplaySubject, toArray } from 'rxjs';
import { HeroById } from './interfaces/hero-by-id.interface';
import { Hero } from './interfaces/hero.interface';
import { HeroesService } from './interfaces/heroservice.interface';
@Injectable()
export class AppService implements OnModuleInit {
  private heroesService: HeroesService;
  constructor(
    @Inject('HERO_PACKAGE') 
    private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.heroesService = this.client.getService<HeroesService>('HeroesService');
    console.log('init', this.heroesService);
  }

  getHero(id: number): Observable<Hero> {
    return this.heroesService.findOne({ id });
  }

  getMany(): Observable<Hero[]> {
    const ids$ = new ReplaySubject<HeroById>();
    ids$.next({ id: 1 });
    ids$.next({ id: 2 });
    ids$.complete();

    const stream = this.heroesService.findMany(ids$.asObservable());
    return stream.pipe(toArray());
  }
}
