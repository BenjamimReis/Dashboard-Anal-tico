import { DataTypes, Sequelize } from 'sequelize';

export const MetricSQL = (sequelize: Sequelize) => {
  return sequelize.define('Metric', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    name: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.FLOAT, allowNull: false },
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });
};
