"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DiceRoller = () => {
  const [diceCount, setDiceCount] = useState(5); // Default to 5 dice
  const [dice, setDice] = useState(Array(diceCount).fill(1));
  const [isCovered, setIsCovered] = useState(false); // State to track if dice are covered
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  const rollDice = () => {
    const newDice = Array.from({ length: diceCount }, 
      () => Math.floor(Math.random() * 6) + 1
    );
    setDice(newDice);
  };

  // Unicode dice characters for visual representation
  const diceChar = (num: number) => {
    const diceChars = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    return diceChars[num - 1];
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen flex items-center justify-center`}>
      <Card className={`w-full max-w-md mx-auto ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg shadow-lg`}>
        <CardHeader>
          <CardTitle className={`text-2xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-blue-600'}`}>Dice Roller</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center">
            <label className={`mb-2 text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>Select Number of Dice:</label>
            <select 
              value={diceCount} 
              onChange={(e) => {
                const count = parseInt(e.target.value);
                setDiceCount(count);
                setDice(Array(count).fill(1)); // Reset dice array when count changes
                setIsCovered(false); // Uncover dice when count changes
              }} 
              className={`mb-4 p-2 border ${isDarkMode ? 'border-blue-300 text-black' : 'border-blue-300 text-black'} rounded`}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          
          {/* Dice Container */}
          <div className="relative flex flex-wrap justify-center gap-4">
            {dice.map((value, index) => (
              <div 
                key={index}
                className={`w-16 h-16 flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-white'} border-2 border-blue-300 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl text-5xl ${isDarkMode ? 'text-white' : 'text-black'}`}
              >
                {diceChar(value)}
              </div>
            ))}

            {/* Cover Overlay */}
            {isCovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-600 opacity-100 rounded-lg">
                <span className="text-3xl text-white">Covered</span>
              </div>
            )}
          </div>

          {/* Roll Dice Button */}
          <div className="text-center mt-4">
            <Button onClick={rollDice} className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200">
              Roll Dice
            </Button>
          </div>

          {/* Toggle Cover Button */}
          <div className="text-center mt-4">
            <Button 
              onClick={() => setIsCovered(prev => !prev)} 
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
            >
              {isCovered ? 'Reveal Dice' : 'Cover Dice'}
            </Button>
          </div>

          {/* Dark Mode Toggle Button */}
          <div className="text-center mt-4">
            <Button 
              onClick={() => setIsDarkMode(prev => !prev)} 
              className={`px-4 py-2 rounded-lg transition duration-200 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'}`}
            >
              Toggle Dark Mode
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiceRoller; 
