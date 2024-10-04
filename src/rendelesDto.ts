//MI által generálva

export interface CheckoutDto {
  nev: string;              // Név
  orszag: string;          // Ország
  iranyitoSzam: string;      // Irányítószám
  varos: string;            // Város
  utcaEsHsz: string; // Utca és házszám

  orszag2: string;          // Ország (szállítási cím)
  iranyitoSzam2: string;      // Irányítószám (szállítási cím)
  varos2: string;            // Város (szállítási cím)
  utcaEsHsz2: string; // Utca és házszám (szállítási cím)
  kupon:string


  bankartyaszam: string;      // Bankártyaszám
  lejarat: string;  // lejárati dátum
  cvc: string;             // CVC

}
