import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Render } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import { Bolygo } from './bolygo.entity';
import BolygoDto from './bolygo.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }
  @Post('/bolygo')
  async ujBolygo(@Body() bolygoDto: BolygoDto) {
    if(!bolygoDto.nev2 || !bolygoDto.nev ||!bolygoDto.atmero){
      throw new BadRequestException('Minden mezőt kötelező kitölteni');
    }
    if( typeof bolygoDto.atmero == 'string'){
      throw new BadRequestException('Az átmerő csak egész szám lehet.');
    }
      const bolygokRepo = this.dataSource.getRepository(Bolygo);
      const bolygo = new Bolygo();
      bolygo.nev = bolygoDto.nev;
      bolygo.nev2 = bolygoDto.nev2;
      bolygo.atmero = bolygoDto.atmero;
      await bolygokRepo.save(bolygo);
  
  }
    @Delete('/bolygo/:id')
    torlesBolygo(@Param('id') id: number) {
    const bolygokRepo = this.dataSource.getRepository(Bolygo);
    bolygokRepo.delete(id)
    }
  }

