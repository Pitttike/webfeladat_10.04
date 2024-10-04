import { Body, Controller, Get, Post, Query, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { CheckoutDto } from './rendelesDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('termekek')
  @Render('termekek')
  getTermek() {

  }

  @Get('kosar')
  @Render('kosar')
  getKosar(@Query("termek") termek) {
    
   
    return {termek, errors: [], data: {}}
  }

  @Post('kosar')
  ujRendeles(@Res()response : Response, @Body() checkoutDto : CheckoutDto) {
    const errors: string[] = [];
    if(!checkoutDto.nev || !checkoutDto.orszag || !checkoutDto.iranyitoSzam || !checkoutDto.varos || !checkoutDto.utcaEsHsz || !checkoutDto.orszag2 || !checkoutDto.iranyitoSzam2 || !checkoutDto.varos2 || !checkoutDto.utcaEsHsz2 || !checkoutDto.bankartyaszam || !checkoutDto.lejarat || !checkoutDto.cvc) {
      errors.push("Minden mezőt kötelező kitölteni (kivéve kupon)")
    }
    if (!/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(checkoutDto.bankartyaszam)) {
      errors.push('A számlaszám nem megfelelő formátumú')
    }
    if (!/^\d{2}\/\d{2}$/.test(checkoutDto.lejarat)) {
      errors.push('A lejárati dátum nem megfelelő formátumú (HH/ÉÉ)!')
    }

    if (!/^[A-Z]{2}-\d{4}$/.test(checkoutDto.kupon) && checkoutDto.kupon) {
      errors.push('A kupon formátuma BB-SSSS, ahol a B nagybetű, az S szám, pl. PT-1255')
    }

    if (!/^\d{3}$/.test(checkoutDto.cvc)) {
      errors.push("A CVC kód 3 számjegy!")  
    }

    const lejarat = checkoutDto.lejarat.split('/')
    const year = "20"+lejarat[1];
    const datum = new Date()
    if (checkoutDto.lejarat) {
      if(parseInt(year)<datum.getFullYear() || parseInt(year)==datum.getFullYear() && parseInt(lejarat[0]) < datum.getMonth()) {
        errors.push("A bankkártya lejárt!")
      }
    }

    if (errors.length > 0) {
      response.render('kosar', {
        errors,
        data: checkoutDto
        })
      return ;
    }
    
    response.redirect(303, '/sikeresRendeles')
  }

  @Get('sikeresRendeles')
  @Render('sikeresRendeles')
  getSiker() {

  }
}
