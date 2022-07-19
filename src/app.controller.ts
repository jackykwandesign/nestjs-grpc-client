import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { Hero } from './interfaces/hero.interface';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('/asd')
  // getHello(){
  //   return "Hello"
  // }

  @Get()
  getMany(): Observable<Hero[]> {
    return this.appService.getMany();
  }

  @Get(':id')
  getById(@Param('id') id: string): Observable<Hero> {
    return this.appService.getHero(Number(id));
  }
  
}
