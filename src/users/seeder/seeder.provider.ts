import { Provider } from '@nestjs/common';
import { UsersSeeders } from './users.seeder';

export const SeederProvider: Provider = {
  provide: 'SEEDER',
  useFactory: async (defaultUserSeeder: UsersSeeders) => {
    await defaultUserSeeder.seedUsers();
    return true;
  },
  inject: [UsersSeeders],
};
