import { seedUsers } from './user-seeds.js';
import { seedTickets } from './ticket-seeds.js';
import { sequelize } from '../models/index.js';

const seedAll = async (): Promise<void> => {
  try {
    
    const force = process.env.NODE_ENV === 'production' ? false : true;
    
    await sequelize.sync({ force });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    
    if (process.env.SEED_DATA === 'true' || process.env.NODE_ENV !== 'production') {
      await seedUsers();
      console.log('\n----- USERS SEEDED -----\n');
      
      await seedTickets();
      console.log('\n----- TICKETS SEEDED -----\n');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();