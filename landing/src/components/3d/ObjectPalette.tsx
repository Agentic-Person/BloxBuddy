import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { motion } from 'framer-motion';

const objects = [
  { id: 'fence', name: 'Fence', icon: '🔳', color: 'bg-amber-100', emphasis: true },
  { id: 'gate', name: 'Gate', icon: '🚪', color: 'bg-orange-200', emphasis: true },
  { id: 'house', name: 'House', icon: '🏠', color: 'bg-red-300' },
  { id: 'tree', name: 'Tree', icon: '🌳', color: 'bg-green-400' },
  { id: 'hay_bale', name: 'Hay Bale', icon: '🟨', color: 'bg-yellow-300' },
  { id: 'water_trough', name: 'Water', icon: '💧', color: 'bg-blue-300' },
  { id: 'scarecrow', name: 'Scarecrow', icon: '🧙', color: 'bg-purple-300' },
];

const ObjectPalette: React.FC = () => {
  const { currentDragItem, setCurrentDragItem, gamePhase } = useGameStore();

  if (gamePhase !== 'building') return null;

  return (
    <div className="w-full overflow-hidden">
      <motion.div 
        className="bg-slate-900/30 backdrop-blur-sm rounded-2xl p-3 border border-white/10 w-full"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 2.1 }}
      >
        <div className="grid grid-cols-2 gap-2">
          {objects.map((obj, index) => (
            <motion.button
              key={obj.id}
              className={`
                relative w-full h-16 rounded-lg flex flex-col items-center justify-center
                transition-all duration-200 transform hover:scale-105
                ${currentDragItem === obj.id ? 'ring-2 ring-yellow-400 scale-105' : ''}
                ${obj.emphasis ? 'animate-pulse' : ''}
                ${obj.color}
              `}
              onClick={() => setCurrentDragItem(obj.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="text-lg">{obj.icon}</span>
              <span className="text-xs mt-0.5 font-semibold text-gray-800 leading-tight">{obj.name}</span>
              
              {/* Special emphasis for fence components */}
              {obj.emphasis && (
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ObjectPalette;