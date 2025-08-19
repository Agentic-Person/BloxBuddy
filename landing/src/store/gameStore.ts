import { create } from 'zustand';

interface PlacedObject {
  id: string;
  type: string;
  position: [number, number, number];
  rotation: [number, number, number];
  color?: string;
}

interface GameState {
  // Game state
  placedObjects: PlacedObject[];
  currentDragItem: string | null;
  gamePhase: 'building' | 'ready' | 'destruction';
  deleteMode: boolean;
  
  // Statistics
  score: number;
  blocksPlaced: number;
  timeElapsed: number;
  
  // Actions
  addObject: (object: PlacedObject) => void;
  removeObject: (id: string) => void;
  setCurrentDragItem: (item: string | null) => void;
  setGamePhase: (phase: 'building' | 'ready' | 'destruction') => void;
  setDeleteMode: (mode: boolean) => void;
  incrementScore: (points: number) => void;
  resetGame: () => void;
  updateTimeElapsed: (time: number) => void;
}

const initialState = {
  placedObjects: [],
  currentDragItem: null,
  gamePhase: 'building' as const,
  deleteMode: false,
  score: 0,
  blocksPlaced: 0,
  timeElapsed: 0,
};

export const useGameStore = create<GameState>((set) => ({
  ...initialState,
  
  addObject: (object) =>
    set((state) => ({
      placedObjects: [...state.placedObjects, object],
      blocksPlaced: state.blocksPlaced + 1,
    })),
  
  removeObject: (id) =>
    set((state) => ({
      placedObjects: state.placedObjects.filter((obj) => obj.id !== id),
      blocksPlaced: Math.max(0, state.blocksPlaced - 1),
    })),
  
  setCurrentDragItem: (item) =>
    set({ currentDragItem: item, deleteMode: false }), // Exit delete mode when selecting tool
  
  setGamePhase: (phase) =>
    set({ gamePhase: phase }),
  
  setDeleteMode: (mode) =>
    set((state) => ({ 
      deleteMode: mode, 
      currentDragItem: mode ? null : state.currentDragItem // Only clear when entering delete mode, not exiting
    })),
  
  incrementScore: (points) =>
    set((state) => ({ score: state.score + points })),
  
  resetGame: () =>
    set(initialState),
  
  updateTimeElapsed: (time) =>
    set({ timeElapsed: time }),
}));