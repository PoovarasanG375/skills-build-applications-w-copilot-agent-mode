import mongoose from 'mongoose';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import LeaderboardEntry from '../models/leaderboard';
import Workout from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

/**
 * Seed the octofit_db database with test data.
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const users = await User.insertMany([
      {
        name: 'Ava Patel',
        email: 'ava@example.com',
        password: 'secret123',
        fitnessGoal: 'Build endurance',
        experienceLevel: 'Intermediate'
      },
      {
        name: 'Noah Kim',
        email: 'noah@example.com',
        password: 'secret123',
        fitnessGoal: 'Lose weight',
        experienceLevel: 'Beginner'
      },
      {
        name: 'Mia Chen',
        email: 'mia@example.com',
        password: 'secret123',
        fitnessGoal: 'Gain strength',
        experienceLevel: 'Advanced'
      }
    ]);

    await Team.insertMany([
      {
        name: 'Peak Performers',
        description: 'A competitive team focused on endurance and consistency.',
        members: users.slice(0, 2).map((user) => user._id.toString())
      },
      {
        name: 'Core Crushers',
        description: 'A strength-first team that loves heavy lifts and recovery.',
        members: [users[2]._id.toString()]
      }
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id.toString(),
        type: 'Run',
        durationMinutes: 35,
        caloriesBurned: 420,
        completedAt: new Date('2026-07-20T07:00:00Z')
      },
      {
        userId: users[1]._id.toString(),
        type: 'Cycling',
        durationMinutes: 45,
        caloriesBurned: 510,
        completedAt: new Date('2026-07-20T08:15:00Z')
      },
      {
        userId: users[2]._id.toString(),
        type: 'Strength Training',
        durationMinutes: 60,
        caloriesBurned: 650,
        completedAt: new Date('2026-07-20T09:30:00Z')
      }
    ]);

    await LeaderboardEntry.insertMany([
      { userId: users[0]._id.toString(), name: 'Ava Patel', score: 980, rank: 1 },
      { userId: users[1]._id.toString(), name: 'Noah Kim', score: 875, rank: 2 },
      { userId: users[2]._id.toString(), name: 'Mia Chen', score: 940, rank: 3 }
    ]);

    await Workout.insertMany([
      {
        name: 'Tempo Run',
        category: 'Cardio',
        difficulty: 'Intermediate',
        durationMinutes: 30,
        description: 'A brisk run designed to improve pace endurance.'
      },
      {
        name: 'Upper Body Strength',
        category: 'Strength',
        difficulty: 'Beginner',
        durationMinutes: 40,
        description: 'A guided push-pull session for beginners.'
      },
      {
        name: 'HIIT Circuit',
        category: 'Cardio',
        difficulty: 'Advanced',
        durationMinutes: 25,
        description: 'A high-intensity workout for advanced athletes.'
      }
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
