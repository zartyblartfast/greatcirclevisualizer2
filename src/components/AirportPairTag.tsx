"use client";

import React, { useState, useRef, useEffect } from 'react';
import { AirportPair } from '../types/airportTypes';

interface AirportPairTagProps {
  pair: AirportPair;
  onRemove: (id: string) => void;
  isExpanded: boolean;
  onToggleExpand: (id: string) => void;
}

const AirportPairTag: React.FC<AirportPairTagProps> = ({ 
  pair, 
  onRemove, 
  isExpanded,
  onToggleExpand
}) => {
  const additionalInfoRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>(isExpanded ? 'none' : '30px');
  
  // Calculate the percentage difference between rhumb line and great circle distances
  const percentageDifference = ((pair.RhumbLineDistKm - pair.GreatCircleDistKm) / pair.GreatCircleDistKm) * 100;
  const signedPercentageDifference = Math.abs(percentageDifference) < 0.005 
    ? '~0' 
    : percentageDifference > 0 
      ? `+${percentageDifference.toFixed(2)}` 
      : percentageDifference.toFixed(2);

  useEffect(() => {
    if (isExpanded && additionalInfoRef.current) {
      setMaxHeight(`${30 + additionalInfoRef.current.scrollHeight}px`);
    } else {
      setMaxHeight('30px');
    }
  }, [isExpanded]);

  const handleClick = () => {
    onToggleExpand(pair.id);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(pair.id);
  };

  return (
    <div 
      className={`tag ${isExpanded ? 'expanded' : ''} ${pair.isSuggested ? 'suggested' : ''}`}
      onClick={handleClick}
      style={{ 
        maxHeight: maxHeight,
        transition: 'max-height 0.8s ease-in-out',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: pair.isSuggested ? '#f0f0f0' : '#6593f5',
        background: pair.isSuggested 
          ? 'linear-gradient(45deg, lightgrey 5%, darkgrey, grey)' 
          : 'linear-gradient(45deg, #b3ccdd, #6593f5, #0f2027)',
        color: '#fff',
        margin: '5px 5px 5px 0',
        borderRadius: '5px',
        width: '100%',
        padding: '5px 10px'
      }}
    >
      <div className="main-content flex justify-between items-start w-full">
        <span>
          {pair.isSuggested ? `Suggested: ${pair.airportACode} - ${pair.airportBCode}` : `${pair.airportACode} - ${pair.airportBCode}`}
        </span>
        <button 
          onClick={handleRemove}
          className="text-white hover:bg-red-500 hover:text-white rounded px-1 py-0"
          disabled={isExpanded}
        >
          ×
        </button>
      </div>
      
      <div 
        ref={additionalInfoRef}
        className="additional-info"
        style={{ display: isExpanded ? 'block' : 'none' }}
      >
        <div className="tag-content">
          <div className="header">
            <hr className="separator border-t border-gray-300 my-2" />
            <span className="airport-name font-bold">{pair.airportAName} ({pair.airportACode})</span>
          </div>
          <div className="airport-info">
            <p className="m-0 p-0">Country: {pair.airportACountryFull}</p>
            <p className="m-0 p-0">Latitude: {pair.airportALat}</p>
            <p className="m-0 p-0">Longitude: {pair.airportALon}</p>
          </div>
          <div className="header">
            <hr className="separator border-t border-gray-300 my-2" />
            <span className="airport-name font-bold">{pair.airportBName} ({pair.airportBCode})</span>
          </div>
          <div className="airport-info">
            <p className="m-0 p-0">Country: {pair.airportBCountryFull}</p>
            <p className="m-0 p-0">Latitude: {pair.airportBLat}</p>
            <p className="m-0 p-0">Longitude: {pair.airportBLon}</p>
          </div>
          <div className="header">
            <hr className="separator border-t border-gray-300 my-2" />
            <span className="distance-info font-bold">Distances (km):</span>
          </div>
          <div className="distance-info">
            <p className="m-0 p-0">Great Circle: {pair.GreatCircleDistKm.toFixed(1)}</p>
            <p className="m-0 p-0">Rhumb Line: {pair.RhumbLineDistKm.toFixed(1)} ({signedPercentageDifference}%)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirportPairTag;
