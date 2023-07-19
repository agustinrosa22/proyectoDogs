const { getAllTemperaments } = require('../controllers/temperamentsControllers')

const Alltemperaments = async (req, res) => {
    try {
        const temperamentos = await getAllTemperaments();
        res.status(200).json(temperamentos)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
} 

module.exports = {
    Alltemperaments,
}