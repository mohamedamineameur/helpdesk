import { sequelize } from './global-setup';

export async function teardownTestDB() {
  await sequelize.close();
}
