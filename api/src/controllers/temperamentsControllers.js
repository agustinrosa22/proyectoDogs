const { Temperaments } = require('../db');
const axios = require('axios');

const cleanArray = (arr) =>
  arr.map((el) => {
    return {
      // Eliminar guiones y espacios en blanco de los temperamentos
      temperaments: el.temperament
        ? el.temperament
            .split(',')
            .map((temperament) => temperament.trim().replace(/-+$/, ''))
        : [], // Si la propiedad no existe, se asigna un array vacío
    };
  });

const getAllTemperaments = async () => {
  const apiResponse = await axios.get('https://api.thedogapi.com/v1/breeds');
  const newApi = cleanArray(apiResponse.data);

  const temperamentNames = new Set();
  newApi.forEach((item) => {
    item.temperaments.forEach((temperament) => {
      temperamentNames.add(temperament);
    });
  });

  const uniqueTemperamentNames = [...temperamentNames];

  // Guardar los nombres de temperamentos en la base de datos usando Sequelize
  await Promise.all(
    uniqueTemperamentNames.map((temperamentName) =>
      Temperaments.findOrCreate({
        where: { name: temperamentName },
      })
    )
  );

  const databaseTemperaments = await Temperaments.findAll();
  return [...databaseTemperaments]; // Convertir a un nuevo array
};

module.exports = {
  getAllTemperaments,
};
