export interface AirportPair {
  id: string;
  airportAName: string;
  airportACode: string;
  airportALat: number;
  airportALon: number;
  airportACountry: string;
  airportACountryFull: string;
  airportBName: string;
  airportBCode: string;
  airportBLat: number;
  airportBLon: number;
  airportBCountry: string;
  airportBCountryFull: string;
  GreatCircleDistKm: number;
  RhumbLineDistKm: number;
  isSuggested: boolean;
}

export interface Airport {
  name: string;
  latitude: number;
  longitude: number;
  iso_country: string;
  country: string;
  iata_code: string;
}

export interface CountryCode {
  [key: string]: string;
}
