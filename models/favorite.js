import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
// model for favorites
const favorites = sequelize.define('favorites', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state_province: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  web_page: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default favorites;
