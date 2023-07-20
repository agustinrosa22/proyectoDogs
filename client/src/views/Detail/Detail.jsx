import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './Detail.module.css';

const Detail = () => {
  const { id } = useParams();//obtengo el parametro id desde la URL
  const [dog, setDog] = useState({}); //useState para crear el estado 'dog' y la función 'setDog' para actualizarlo

  useEffect(() => { //realiza una solicitud a la API una vez que el componente se monta
    const fetchDog = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/dogs/${id}`);//solicitud GET a la API o DB utilizando el id obtenido de useParams
        setDog(response.data);// Se actualiza el estado 'dog' con los datos obtenidos de la API o DB
      } catch (error) {
        console.error('Error fetching dog:', error);
      }
    };

    fetchDog();//Se llama a la función para obtener los datos del perro cuando el componente se monta
  }, [id]);//El efecto se ejecutará cada vez que cambie el valor de 'id'

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>DETALLES</h1>
      <h2>Id: {dog.id}</h2>
      <img className={styles.image} src={dog.image && (dog.image.url || dog.image)} alt="" />
      <h2>NOMBRE: {dog.name}</h2>
      <h2>ALTURA: {dog.height && (dog.height?.metric || `${dog.height?.min} - ${dog.height?.max}`)}</h2>
      <h2>PESO: {dog.weight && (dog.weight?.metric || `${dog.weight.min} - ${dog.weight.max}`)}</h2>
      <h2>TEMPERAMENTOS: {dog.temperaments?.map(temp=>temp.name) || dog.temperament?.split(',')}</h2>
      <h2>ESPERANZA DE VIDA: {dog.life_span}</h2>

      <Link className={styles.link} to="/home">Go Back</Link>
    </div>
  );
};

export default Detail;
