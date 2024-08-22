import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('slashash_tech', 'root', 'W7301@jqir#', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
