export interface Tour {
  id: number;
  slug: string;
  nazwa: string;
  kraj: string;
  miasto: string;
  kontynent: string;
  kategoria: string;
  czasDni: number;
  cenaPLN: number;
  ocena: number;
  liczbaOpinii: number;
  limitMiejsc: number;
  terminy: string[];
  opis: string;
  skroconyOpis: string;
  zdjecie: string;
  fotografiaInspiracja: string;
  zawiera: string[];
  nieZawiera: string[];
  plan: {
    dzien: number;
    tytul: string;
    opis: string;
  }[];
}
