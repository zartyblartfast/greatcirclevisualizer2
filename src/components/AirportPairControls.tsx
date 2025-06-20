"use client";

import React, { useState, useEffect } from 'react';
import AirportPairTag from './AirportPairTag';
import { AirportPair, Airport, CountryCode } from '../types/airportTypes';
import { fetchSuggestionPairs, fetchCountryCodes, fetchAirports, getAirportsByCountry } from '../utils/airportData';

const AirportPairControls: React.FC = () => {
  // State for data
  const [countryCodes, setCountryCodes] = useState<CountryCode>({});
  const [airports, setAirports] = useState<Airport[]>([]);
  const [airportPairs, setAirportPairs] = useState<AirportPair[]>([]);
  const [expandedPairId, setExpandedPairId] = useState<string | null>(null);
  
  // State for country dropdowns
  const [countryA, setCountryA] = useState<string>('');
  const [countryB, setCountryB] = useState<string>('');
  
  // State for airport search fields
  const [airportA, setAirportA] = useState<string>('');
  const [airportB, setAirportB] = useState<string>('');
  
  // State for info message
  const [infoMessage, setInfoMessage] = useState<string>('');
  
  // State for filtered airports
  const [filteredAirportsA, setFilteredAirportsA] = useState<Airport[]>([]);
  const [filteredAirportsB, setFilteredAirportsB] = useState<Airport[]>([]);
  
  // We'll create country options in a useEffect after loading the data
  
  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load country codes
        const codes = await fetchCountryCodes();
        setCountryCodes(codes);
        
        // Load airports
        const airportsData = await fetchAirports();
        setAirports(airportsData);
        
        // Load suggested airport pairs
        const suggestionPairs = await fetchSuggestionPairs();
        setAirportPairs(suggestionPairs);
      } catch (error) {
        console.error('Error loading data:', error);
        setInfoMessage('Error loading data. Please try again.');
      }
    };
    
    loadData();
  }, []);
  
  // Create country options when countryCodes change
  const [countryOptions, setCountryOptions] = useState<Array<{value: string, code: string, label: string}>>([]);
  const [countryOptionsWithEmpty, setCountryOptionsWithEmpty] = useState<Array<{value: string, code: string, label: string}>>([]);
  
  useEffect(() => {
    if (Object.keys(countryCodes).length > 0) {
      // Sort countries alphabetically by name
      // Note: In country-codes.json, the keys are country names and values are ISO codes
      const options = Object.entries(countryCodes)
        .map(([countryName, countryCode]) => ({
          value: countryName, // Use country name as the value
          code: countryCode,  // Keep the code for reference
          label: countryName  // Display the country name
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
      
      setCountryOptions(options);
      
      // Add an empty option at the beginning
      setCountryOptionsWithEmpty([
        { value: '', code: '', label: 'Select Country' },
        ...options
      ]);
    }
  }, [countryCodes]);
  
  // Update filtered airports when country selection changes
  useEffect(() => {
    if (countryA && countryOptions.length > 0) {
      // Find the country code for the selected country name
      const selectedCountry = countryOptions.find(option => option.value === countryA);
      if (selectedCountry) {
        setFilteredAirportsA(getAirportsByCountry(airports, selectedCountry.code));
      } else {
        setFilteredAirportsA([]);
      }
    } else {
      setFilteredAirportsA([]);
    }
  }, [countryA, airports, countryOptions]);
  
  useEffect(() => {
    if (countryB && countryOptions.length > 0) {
      // Find the country code for the selected country name
      const selectedCountry = countryOptions.find(option => option.value === countryB);
      if (selectedCountry) {
        setFilteredAirportsB(getAirportsByCountry(airports, selectedCountry.code));
      } else {
        setFilteredAirportsB([]);
      }
    } else {
      setFilteredAirportsB([]);
    }
  }, [countryB, airports, countryOptions]);
  
  // Handle adding a new airport pair
  const handleAddPair = () => {
    if (!airportA || !airportB) {
      setInfoMessage('Please select both airports');
      return;
    }
    
    // Find the selected airports
    const selectedAirportA = filteredAirportsA.find(airport => airport.iata_code === airportA);
    const selectedAirportB = filteredAirportsB.find(airport => airport.iata_code === airportB);
    
    if (!selectedAirportA || !selectedAirportB) {
      setInfoMessage('Invalid airport selection');
      return;
    }
    
    // Find the country names for the selected airports
    const countryAName = Object.entries(countryCodes).find(([code, _]) => code === selectedAirportA.iso_country)?.[1] || selectedAirportA.iso_country;
    const countryBName = Object.entries(countryCodes).find(([code, _]) => code === selectedAirportB.iso_country)?.[1] || selectedAirportB.iso_country;
    
    // Calculate distances (simplified for now)
    const greatCircleDist = calculateGreatCircleDistance(
      selectedAirportA.latitude, 
      selectedAirportA.longitude, 
      selectedAirportB.latitude, 
      selectedAirportB.longitude
    );
    
    const rhumbLineDist = calculateRhumbLineDistance(
      selectedAirportA.latitude, 
      selectedAirportA.longitude, 
      selectedAirportB.latitude, 
      selectedAirportB.longitude
    );
    
    // Create new pair
    const newPair: AirportPair = {
      id: `${selectedAirportA.iata_code}-${selectedAirportB.iata_code}`,
      airportAName: selectedAirportA.name,
      airportACode: selectedAirportA.iata_code,
      airportALat: selectedAirportA.latitude,
      airportALon: selectedAirportA.longitude,
      airportACountry: selectedAirportA.iso_country,
      airportACountryFull: countryAName, // Use the full country name
      airportBName: selectedAirportB.name,
      airportBCode: selectedAirportB.iata_code,
      airportBLat: selectedAirportB.latitude,
      airportBLon: selectedAirportB.longitude,
      airportBCountry: selectedAirportB.iso_country,
      airportBCountryFull: countryBName, // Use the full country name
      GreatCircleDistKm: greatCircleDist,
      RhumbLineDistKm: rhumbLineDist,
      isSuggested: false
    };
    
    // Add to state
    setAirportPairs([...airportPairs, newPair]);
    setInfoMessage('');
    
    // Reset inputs
    setAirportA('');
    setAirportB('');
  };
  
  // Handle loading suggestion pairs
  const handleSuggestions = async () => {
    try {
      const suggestionPairs = await fetchSuggestionPairs();
      setAirportPairs(suggestionPairs);
      setInfoMessage('Loaded suggested airport pairs');
    } catch (error) {
      console.error('Error loading suggestions:', error);
      setInfoMessage('Error loading suggestions');
    }
  };
  
  // Handle making maps
  const handleMakeMaps = () => {
    if (airportPairs.length === 0) {
      setInfoMessage('Please add at least one airport pair');
      return;
    }
    setInfoMessage('Generating maps...');
    // This would trigger map generation in the actual implementation
  };
  
  // Handle removing a pair
  const handleRemovePair = (id: string) => {
    setAirportPairs(airportPairs.filter(pair => pair.id !== id));
  };
  
  // Handle toggling pair expansion
  const handleToggleExpand = (id: string) => {
    setExpandedPairId(expandedPairId === id ? null : id);
  };
  
  // Helper functions for distance calculations
  function calculateGreatCircleDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
  
  function calculateRhumbLineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    // This is a simplified calculation - in a real app, you'd use a proper geodesy library
    // For now, we'll add a small percentage to the great circle distance as an approximation
    const gcDist = calculateGreatCircleDistance(lat1, lon1, lat2, lon2);
    return gcDist * 1.02; // 2% longer as a rough approximation
  }
  
  function toRad(degrees: number): number {
    return degrees * Math.PI / 180;
  }

  // Country options are now defined at the top of the component

  return (
    <div className="flex flex-col md:flex-row">
      {/* Left side - Airport pair controls */}
      <div className="w-full md:w-1/3 pr-0 md:pr-4">
        <div className="grid grid-cols-2 gap-2">
          {/* Airport A and B labels */}
          <div className="flex items-center">
            <div className="w-6 h-6 mr-2 relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
            <span className="font-semibold">Airport A</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 mr-2 relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                B
              </div>
            </div>
            <span className="font-semibold">Airport B</span>
          </div>
          
          {/* Country dropdowns */}
          <div className="mb-2">
            <select 
              className="w-full p-1 border border-gray-300 rounded"
              value={countryA}
              onChange={(e) => setCountryA(e.target.value)}
            >
              {countryOptionsWithEmpty.map((option) => (
                <option key={`country-a-${option.value}`} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <select 
              className="w-full p-1 border border-gray-300 rounded"
              value={countryB}
              onChange={(e) => setCountryB(e.target.value)}
            >
              {countryOptionsWithEmpty.map((option) => (
                <option key={`country-b-${option.value}`} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Airport search fields */}
          <div className="mb-2">
            <input 
              type="text"
              className="w-full p-1 border border-gray-300 rounded"
              placeholder="Search for Airport..."
              value={airportA}
              onChange={(e) => setAirportA(e.target.value)}
              disabled={!countryA}
              list="airports-a-list"
            />
            <datalist id="airports-a-list">
              {filteredAirportsA.map((airport) => (
                <option key={`airport-a-${airport.iata_code}`} value={airport.iata_code}>
                  {airport.name} ({airport.iata_code})
                </option>
              ))}
            </datalist>
          </div>
          <div className="mb-2">
            <input 
              type="text"
              className="w-full p-1 border border-gray-300 rounded"
              placeholder="Search for Airport..."
              value={airportB}
              onChange={(e) => setAirportB(e.target.value)}
              disabled={!countryB}
              list="airports-b-list"
            />
            <datalist id="airports-b-list">
              {filteredAirportsB.map((airport) => (
                <option key={`airport-b-${airport.iata_code}`} value={airport.iata_code}>
                  {airport.name} ({airport.iata_code})
                </option>
              ))}
            </datalist>
          </div>
          
          {/* Add and Suggestions buttons */}
          <div className="mb-2">
            <button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded"
              onClick={handleAddPair}
            >
              Add
            </button>
          </div>
          <div className="mb-2">
            <button 
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-1 px-2 rounded"
              onClick={handleSuggestions}
            >
              Suggestions
            </button>
          </div>
          
          {/* Make maps button (spans both columns) */}
          <div className="col-span-2 mb-2">
            <button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded"
              onClick={handleMakeMaps}
            >
              Make Maps
            </button>
          </div>
          
          {/* Info message */}
          <div className="col-span-2 mb-2">
            {infoMessage && (
              <div className="text-red-500 text-sm">{infoMessage}</div>
            )}
          </div>
          
          {/* Airport pair tags */}
          <div className="col-span-2">
            <div className="border border-gray-300 rounded p-2 min-h-[100px] max-h-[200px] overflow-y-auto">
              <h3 className="text-sm font-semibold mb-2">Airport Pair Tags</h3>
              {airportPairs.length === 0 ? (
                <p className="text-sm text-gray-500">No airport pairs added yet</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {airportPairs.map((pair) => (
                    <AirportPairTag
                      key={pair.id}
                      pair={pair}
                      isExpanded={expandedPairId === pair.id}
                      onToggleExpand={handleToggleExpand}
                      onRemove={handleRemovePair}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Map placeholder */}
      <div className="w-full md:w-2/3 mt-4 md:mt-0">
        <div className="bg-gray-100 rounded-md h-[400px] flex items-center justify-center">
          <p className="text-gray-500">Map Visualization Will Appear Here</p>
        </div>
      </div>
    </div>
  );
};

export default AirportPairControls;
