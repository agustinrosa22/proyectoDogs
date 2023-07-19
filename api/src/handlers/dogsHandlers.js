const {  getAllDogs, getIdDogs, searchDogByName, createDog } = require('../controllers/dogsControllers')
const { v4: uuidv4 } = require('uuid');
//buscar por id
const getDogById = async (req, res) => {
    const id = req.params.id;
    
    try {
        const dog = await getIdDogs(id);;
        return res.status(200).json(dog);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
//buscar por name

const getdogsHandler = async (req, res) => {
    try {
        const { name } = req.query;
        const busqueda = name ? await searchDogByName(name) : await getAllDogs();
        //console.log(busqueda)
        return res.status(200).json(busqueda)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
} 

//crear dogs
const postDogsHandler = async (req, res) => {
  try {
    const {
      name,
      image,
      height,
      weight,
      life_span,
      temperament,
    } = req.body;
    const id = uuidv4();
    // Pasa los datos como un objeto en lugar de separados por parámetros
    const newDog = await createDog({
      name,
      image,
      height,
      weight,
      life_span,
      temperaments: temperament, // Utiliza el campo `temperaments` en plural
    });
    res.status(200).json(newDog);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
};
  



module.exports = {
    getDogById,
    getdogsHandler,
    postDogsHandler
}