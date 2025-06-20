import { AirportPair, Airport, CountryCode } from '../types/airportTypes';

export async function fetchSuggestionPairs(): Promise<AirportPair[]> {
  try {
    const response = await fetch('/data/suggestion_pairs.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Transform the data to match our AirportPair interface
    return data.map((pair: any) => ({
      id: `${pair.airportACode}-${pair.airportBCode}`,
      airportAName: pair.airportAName,
      airportACode: pair.airportACode,
      airportALat: pair.airportALat,
      airportALon: pair.airportALon,
      airportACountry: pair.airportACountry,
      airportACountryFull: pair.airportACountryFull,
      airportBName: pair.airportBName,
      airportBCode: pair.airportBCode,
      airportBLat: pair.airportBLat,
      airportBLon: pair.airportBLon,
      airportBCountry: pair.airportBCountry,
      airportBCountryFull: pair.airportBCountryFull,
      GreatCircleDistKm: pair.GreatCircleDistKm,
      RhumbLineDistKm: pair.RhumbLineDistKm,
      isSuggested: true
    }));
  } catch (error) {
    console.error('Error fetching suggestion pairs:', error);
    return [];
  }
}

export async function fetchCountryCodes(): Promise<CountryCode> {
  try {
    const response = await fetch('/data/country-codes.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching country codes:', error);
    return {};
  }
}

export async function fetchAirports(): Promise<Airport[]> {
  try {
    const response = await fetch('/data/airports.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching airports:', error);
    return [];
  }
}

export function getAirportsByCountry(airports: Airport[], countryCode: string): Airport[] {
  return airports.filter(airport => airport.iso_country === countryCode);
}
