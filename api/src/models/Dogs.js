const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dogs', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    height: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {}
    },
    weight: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {}
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createIndb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    
    
  });
};
