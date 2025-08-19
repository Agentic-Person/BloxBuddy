export interface Video {
  id: string;
  title: string;
  description: string;
  duration: string; // Format: "MM:SS"
  xp: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  completed?: boolean;
  thumbnail?: string;
  youtubeId?: string;
  watchTime?: number;
  notes?: string;
}

export interface Day {
  day: number;
  title: string;
  videos: Video[];
}

export interface Week {
  week: number;
  title: string;
  description: string;
  totalHours: number;
  days: Day[];
  objectives: string[];
  resources?: {
    name: string;
    url: string;
    type: 'template' | 'asset' | 'documentation';
  }[];
}

export interface Module {
  id: number;
  title: string;
  description: string;
  weeks: string; // e.g., "Weeks 1-4"
  status: 'locked' | 'in-progress' | 'completed';
  progress: number;
  totalVideos: number;
  completedVideos: number;
  totalXP: number;
  earnedXP: number;
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites: string[];
  certificate: string;
  instructor: string;
  weeks_data: Week[];
  topics: string[];
  currentVideo?: {
    title: string;
    duration: string;
    xp: number;
  };
}

// Sample curriculum data structure for Module 3
export const sampleModule3: Module = {
  id: 3,
  title: "Advanced Building Techniques",
  description: "Master complex structures, optimize your builds, and create stunning visual effects that will make your games stand out.",
  weeks: "Weeks 9-12",
  status: "in-progress",
  progress: 65,
  totalVideos: 18,
  completedVideos: 12,
  totalXP: 600,
  earnedXP: 390,
  estimatedTime: "12 hours",
  difficulty: "Intermediate",
  prerequisites: ["Roblox Studio Basics", "Introduction to Scripting"],
  certificate: "Advanced Builder Certificate",
  instructor: "BuildMaster Pro",
  topics: [
    "Advanced Modeling",
    "Lighting & Atmosphere", 
    "Particle Effects",
    "Sound Design"
  ],
  currentVideo: {
    title: "Creating Dynamic Lighting Systems",
    duration: "18:45",
    xp: 50
  },
  weeks_data: [
    {
      week: 9,
      title: "Advanced Modeling Mastery",
      description: "Master complex part manipulation, custom meshes, and modular building systems",
      totalHours: 3,
      objectives: [
        "Learn CSG operations and unions",
        "Import and optimize custom 3D models",
        "Create reusable building components"
      ],
      days: [
        {
          day: 1,
          title: "Complex Part Manipulation",
          videos: [
            {
              id: "adv-1",
              title: "Complex Part Manipulation",
              description: "Learn advanced techniques for manipulating parts including CSG operations and unions",
              duration: "18:45",
              xp: 40,
              difficulty: "Intermediate",
              completed: true,
              thumbnail: "modeling-1"
            }
          ]
        },
        {
          day: 2,
          title: "Custom Meshes",
          videos: [
            {
              id: "adv-2", 
              title: "Creating Custom Meshes",
              description: "Import and optimize custom 3D models for your Roblox games",
              duration: "22:30",
              xp: 50,
              difficulty: "Advanced",
              completed: true,
              thumbnail: "modeling-2"
            }
          ]
        },
        {
          day: 3,
          title: "Terrain Sculpting",
          videos: [
            {
              id: "adv-3",
              title: "Advanced Terrain Sculpting", 
              description: "Master the terrain editor to create realistic landscapes",
              duration: "25:15",
              xp: 45,
              difficulty: "Intermediate",
              completed: true,
              thumbnail: "terrain-1"
            }
          ]
        },
        {
          day: 4,
          title: "Modular Building",
          videos: [
            {
              id: "adv-4",
              title: "Modular Building Systems",
              description: "Create reusable building components for efficient development", 
              duration: "20:00",
              xp: 40,
              difficulty: "Intermediate",
              completed: true,
              thumbnail: "modular-1"
            }
          ]
        }
      ]
    },
    {
      week: 10,
      title: "Lighting & Atmosphere",
      description: "Create stunning visual effects with advanced lighting and atmospheric systems",
      totalHours: 3.5,
      objectives: [
        "Master dynamic lighting systems",
        "Create atmospheric effects",
        "Optimize lighting for performance"
      ],
      days: [
        {
          day: 1,
          title: "Dynamic Lighting",
          videos: [
            {
              id: "light-1",
              title: "Creating Dynamic Lighting Systems",
              description: "Build interactive lighting that responds to game events",
              duration: "18:45", 
              xp: 50,
              difficulty: "Advanced",
              completed: false,
              thumbnail: "lighting-1"
            }
          ]
        },
        {
          day: 2,
          title: "Atmospheric Effects",
          videos: [
            {
              id: "atmo-1",
              title: "Fog and Atmospheric Effects",
              description: "Add depth and mood to your games with atmospheric effects",
              duration: "16:20",
              xp: 45,
              difficulty: "Intermediate", 
              completed: false,
              thumbnail: "atmosphere-1"
            }
          ]
        },
        {
          day: 3,
          title: "Color Correction",
          videos: [
            {
              id: "color-1",
              title: "Advanced Color Correction",
              description: "Perfect the visual tone and mood of your game",
              duration: "14:30",
              xp: 35,
              difficulty: "Intermediate",
              completed: false,
              thumbnail: "color-1"
            }
          ]
        },
        {
          day: 4,
          title: "Performance Optimization",
          videos: [
            {
              id: "perf-light-1", 
              title: "Lighting Performance Optimization",
              description: "Keep your games running smooth while looking amazing",
              duration: "21:15",
              xp: 45,
              difficulty: "Advanced",
              completed: false,
              thumbnail: "optimize-1"
            }
          ]
        }
      ]
    },
    {
      week: 11,
      title: "Particle Effects & VFX",
      description: "Bring your games to life with stunning particle effects and visual magic",
      totalHours: 3.5,
      objectives: [
        "Create custom particle systems",
        "Build spell and magic effects", 
        "Master fire, water, and explosion effects"
      ],
      days: [
        {
          day: 1,
          title: "Particle Basics",
          videos: [
            {
              id: "particle-1",
              title: "Particle System Fundamentals",
              description: "Understanding the particle emitter and all its properties",
              duration: "19:30",
              xp: 40,
              difficulty: "Intermediate",
              completed: false,
              thumbnail: "particles-1"
            }
          ]
        },
        {
          day: 2,
          title: "Fire & Explosions", 
          videos: [
            {
              id: "fire-1",
              title: "Epic Fire and Explosion Effects",
              description: "Create realistic fire, smoke, and explosive visual effects",
              duration: "23:15",
              xp: 55,
              difficulty: "Advanced",
              completed: false,
              thumbnail: "fire-1"
            }
          ]
        },
        {
          day: 3,
          title: "Magic & Spells",
          videos: [
            {
              id: "magic-1", 
              title: "Magical Spell Effects",
              description: "Design mystical particle effects for spells and abilities",
              duration: "17:45",
              xp: 50,
              difficulty: "Advanced",
              completed: false,
              thumbnail: "magic-1"
            }
          ]
        },
        {
          day: 4,
          title: "Environmental VFX",
          videos: [
            {
              id: "env-vfx-1",
              title: "Environmental Visual Effects", 
              description: "Rain, snow, dust, and other environmental particle effects",
              duration: "20:00",
              xp: 45,
              difficulty: "Intermediate",
              completed: false,
              thumbnail: "env-1"
            }
          ]
        }
      ]
    },
    {
      week: 12,
      title: "Sound Design Mastery",
      description: "Complete your game's atmosphere with professional sound design",
      totalHours: 2.5,
      objectives: [
        "Implement 3D positional audio",
        "Create dynamic music systems",
        "Master sound effect timing"
      ],
      days: [
        {
          day: 1,
          title: "3D Audio Systems",
          videos: [
            {
              id: "audio-3d-1",
              title: "3D Positional Audio",
              description: "Create immersive audio that responds to player position",
              duration: "16:45",
              xp: 40,
              difficulty: "Intermediate", 
              completed: false,
              thumbnail: "audio-3d-1"
            }
          ]
        },
        {
          day: 2,
          title: "Dynamic Music",
          videos: [
            {
              id: "music-1",
              title: "Dynamic Music Systems",
              description: "Build music that adapts to gameplay and player actions", 
              duration: "22:30",
              xp: 50,
              difficulty: "Advanced",
              completed: false,
              thumbnail: "music-1"
            }
          ]
        },
        {
          day: 3,
          title: "Sound Effect Design",
          videos: [
            {
              id: "sfx-1",
              title: "Professional Sound Effects",
              description: "Create and implement impactful sound effects",
              duration: "18:15",
              xp: 45,
              difficulty: "Intermediate",
              completed: false,
              thumbnail: "sfx-1"
            }
          ]
        }
      ]
    }
  ]
};