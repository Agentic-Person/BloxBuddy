import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { motion } from 'framer-motion';

const objects = [
  { id: 'fence', name: 'Fence', icon: '🔳', color: 'bg-amber-100' },
  { id: 'gate', name: 'Gate', icon: '🚪', color: 'bg-orange-200' },
  { id: 'house', name: 'House', icon: '🏠', color: 'bg-red-300' },
  { id: 'tree', name: 'Tree', icon: '🌳', color: 'bg-green-400' },
  { id: 'hay_bale', name: 'Hay Bale', icon: '🟨', color: 'bg-yellow-300' },
  { id: 'water_trough', name: 'Water', icon: '💧', color: 'bg-blue-300' },
  { id: 'scarecrow', name: 'Scarecrow', icon: '🧙', color: 'bg-purple-300' },
  { id: 'chicken_coop', name: 'Coop', icon: '🐔', color: 'bg-yellow-400' },
  { id: 'feed_dispenser', name: 'Feed', icon: '🌾', color: 'bg-amber-400' },
  { id: 'water_fountain', name: 'Fountain', icon: '⛲', color: 'bg-cyan-400' },
  { id: 'small_barn', name: 'Barn', icon: '🏚️', color: 'bg-red-400' },
];

const ObjectPalette: React.FC = () => {
  const { currentDragItem, setCurrentDragItem, gamePhase } = useGameStore();

  if (gamePhase !== 'building') return null;

  return (
    <div className="flex flex-col gap-2">
      {objects.map((obj, index) => (
        <motion.button
          key={obj.id}
          className={`
            relative w-12 h-12 rounded-lg flex items-center justify-center
            bg-white/10 backdrop-blur-sm border border-white/20
            transition-all duration-200 transform hover:scale-110
            ${currentDragItem === obj.id ? 'ring-2 ring-yellow-400 scale-110 bg-white/20' : ''}
          `}
          onClick={() => setCurrentDragItem(obj.id)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <span className="text-lg">{obj.icon}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default ObjectPalette;