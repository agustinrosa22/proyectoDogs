const axios = require('axios')
const { Dogs, Temperaments } = require('../db')
const { Op } = require("sequelize");
require('dotenv').config()

//todos los dogs
const getAllDogs = async () => {
    const databaseDogs  = await Dogs.findAll( //busca y recupera todos los registros de perros almacenados en la tabla 
      {
        include: {
          model:Temperaments,
          attributes: ['name'],
          through: {attributes:[]}
      }
      }
    );
    const apiResponse = (await axios.get(`https://api.thedogapi.com/v1/breeds`)).data;// se hace una solicitud a la API para traer los dogs

    const apiDogs = apiResponse; 
 
  
    const dogsAll = databaseDogs .concat(apiDogs );// se unen las respuestas 
    return dogsAll;
  }

//crear nuevos dogs
  const createDog = async ({ name, image, height, weight, life_span, temperaments }) => { // Utiliza el objeto destructurado para recibir los datos
    if (!name || !image || !height || !weight || !life_span) { //datos obligatorios
      throw new Error('Faltan datos');
    }
    const allDogs = await getAllDogs();
    const dogFound = allDogs.find((dog) => dog.name.toLowerCase() === name.toLowerCase());//verifica que no alla otro perro con ese nombre
  
    if (dogFound) throw new Error(`El perro ${name} ya existe`);
  
    // Aquí se utiliza `create` para guardar el perro en la base de datos
    const created = await Dogs.create({ name, image, height, weight, life_span, createIndb: true }); // Agrega el campo `createIndb` y  guarda el nuevo perro en la base de datos.
  
    const temperamentsArray = Array.isArray(temperaments) ? temperaments : [temperaments]; // verifica si el campo temperaments es un array o un valor único. Si es un array, se mantiene tal cual, y si es un valor único, se coloca dentro de un array para procesarlo de la misma manera.
    const temperamentRecords = await Temperaments.findAll({//Se busca en la base de datos los registros de temperamentos cuyos nombres coincidan con los temperamentos proporcionados en el array 
      where: {
        name: {
          [Op.in]: temperamentsArray.map((t) => t.trim()), // Filtra los temperamentos que existan en la base de datos
        },
      },
    });
  
    // Aquí se agregan los temperamentos asociados al perro en la tabla intermedia
    await created.addTemperaments(temperamentRecords);//se utilizan los métodos proporcionados por Sequelize para asociar los temperamentos al perro en la tabla intermedia
  
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
  if (isNaN(id)) {//si la id no es un numero significa que no es de la DB
    const dogDB = await Dogs.findByPk(id, { // busca la id del perro y sus temperamentos 
      include: {
        model:Temperaments,
        attributes: ['name'],
        through: {attributes:[]}
    }
    });
    if (dogDB) return dogDB;
    else throw new Error(`No se encontró un perro con el id ${id}`);
  }

  const dogApi = await getAllDogs();
  const dogFiltered = dogApi.find((dog) => dog.id === Number(id));//busca que alla un perro con esa id
  if (dogFiltered) return dogFiltered;
  else throw new Error(`No se encontró un perro con el id ${id}`);
};

//buscar por name
const searchDogByName = async (name) => {
    const lowerCaseName = name.toLowerCase();//lo hace insensible a minusculas o mayusculas
  
    let dbDogs = await Dogs.findAll({ where: { name: { [Op.like]: `%${lowerCaseName}%` } } }); //busca en la base de datos que contengan la parte proporcionada
  
    let apiDogs = [];//almacenos los perros encontrados de la API
    try {
      const apiResponse = await axios.get('https://api.thedogapi.com/v1/breeds');//obtengo a los perros
      const { data } = apiResponse;//datos de la respuesta de la API
      apiDogs = data.filter((dog) => dog.name.toLowerCase().includes(lowerCaseName));//Se filtran los perros de la API para encontrar aquellos cuyo nombre contiene la parte proporcionada
    } catch (error) {
      console.error('Error fetching dogs from API:', error);
    }
  
    const nameDogs = apiDogs.map((dog) => ({ //crea un nuevo array mapeando los perros encontrados en la API para extraer solo las propiedades necesarias
      id: dog.id,
      name: dog.name,
      image: dog.image,
      height: dog.height,
      weight: dog.weight,
      life_span: dog.life_span,
      temperament: dog.temperament,
    }));
  
    const response = [...nameDogs, ...dbDogs];//convino los resultados
    //console.log(response);
    return response;
  };
  


  module.exports = {
    getAllDogs,
    getIdDogs,
    searchDogByName,
    createDog
  }