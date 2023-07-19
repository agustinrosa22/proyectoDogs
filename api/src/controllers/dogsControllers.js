const axios = require('axios')
const { Dogs, Temperaments } = require('../db')
const { Op } = require("sequelize");
require('dotenv').config()

//todos los dogs
const getAllDogs = async () => {
    const databaseDogs  = await Dogs .findAll();
    const apiResponse = (await axios.get(`https://api.thedogapi.com/v1/breeds`)).data;

    const apiDogs = apiResponse; // No es necesario extraer la propiedad "results"
 // Extraer el array de resultados
  
    const dogsAll = databaseDogs .concat(apiDogs );
    return dogsAll;
  }
  const createDog = async ({ name, image, height, weight, life_span, temperaments }) => { // Utiliza un objeto destructurado para recibir los datos
    if (!name || !image || !height || !weight || !life_span) {
      throw new Error('Faltan datos');
    }
    const allDogs = await getAllDogs();
    const dogFound = allDogs.find((dog) => dog.name.toLowerCase() === name.toLowerCase());
  
    if (dogFound) throw new Error(`El perro ${name} ya existe`);
  
    // Aquí se utiliza `create` para guardar el perro en la base de datos
    const created = await Dogs.create({ name, image, height, weight, life_span, createIndb: true }); // Agrega el campo `createIndb`
  
    const temperamentsArray = Array.isArray(temperaments) ? temperaments : [temperaments];
    const temperamentRecords = await Temperaments.findAll({
      where: {
        name: {
          [Op.in]: temperamentsArray.map((t) => t.trim()), // Filtra los temperamentos que existan en la base de datos
        },
      },
    });
  
    // Aquí se agregan los temperamentos asociados al perro en la tabla intermedia
    await created.addTemperaments(temperamentRecords);
  
    return created;
  };

cleanArray = (arr) =>
arr.map((el)=> {
    return {
        id: el.id, 
        name: el.name,
        image: el.image,
        height: el.height,
        weight: el.weight,
        life_span: el.life_span,
        temperament: el.temperament
    }
})

//buscar por id
const getIdDogs = async (id) => {
  if (isNaN(id)) {
    const dogDB = await Dogs.findByPk(id);
    if (dogDB) return dogDB;
    else throw new Error(`No se encontró un perro con el id ${id}`);
  }

  const dogApi = await getAllDogs();
  const dogFiltered = dogApi.find((dog) => dog.id === Number(id));
  if (dogFiltered) return dogFiltered;
  else throw new Error(`No se encontró un perro con el id ${id}`);
};

//buscar por name
const searchDogByName = async (name) => {
    const lowerCaseName = name.toLowerCase();
  
    let dbDogs = await Dogs.findAll({ where: { name: { [Op.like]: `%${lowerCaseName}%` } } });
  
    let apiDogs = [];
    try {
      const apiResponse = await axios.get('https://api.thedogapi.com/v1/breeds');
      const { data } = apiResponse;
      apiDogs = data.filter((dog) => dog.name.toLowerCase().includes(lowerCaseName));
    } catch (error) {
      console.error('Error fetching dogs from API:', error);
    }
  
    const nameDogs = apiDogs.map((dog) => ({
      id: dog.id,
      name: dog.name,
      image: dog.image,
      height: dog.height,
      weight: dog.weight,
      life_span: dog.life_span,
      temperament: dog.temperament,
    }));
  
    const response = [...nameDogs, ...dbDogs];
    console.log(response);
    return response;
  };
  


  module.exports = {
    getAllDogs,
    getIdDogs,
    searchDogByName,
    createDog
  }