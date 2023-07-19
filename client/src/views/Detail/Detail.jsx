import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './Detail.module.css';

const Detail = () => {
  const { id } = useParams();
  const [dog, setDog] = useState({});

  useEffect(() => {
    const fetchDog = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/dogs/${id}`);
        setDog(response.data);
      } catch (error) {
        console.error('Error fetching dog:', error);
      }
    };

    fetchDog();
  }, [id]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>DETALLES</h1>
      <h2>Id: {dog.id}</h2>
      <img className={styles.image} src={dog.image && (dog.image.url || dog.image)} alt="" />
      <h2>NOMBRE: {dog.name}</h2>
      <h2>ALTURA: {dog.height && (dog.height?.metric || `${dog.height?.min} - ${dog.height?.max}`)}</h2>
      <h2>PESO: {dog.weight && (dog.weight?.metric || `${dog.weight.min} - ${dog.weight.max}`)}</h2>
      <h2>TEMPERAMENTOS: {dog.temperament}</h2>
      <h2>ESPERANZA DE VIDA: {dog.life_span}</h2>

      <Link className={styles.link} to="/home">Go Back</Link>
    </div>
  );
};

export default Detail;
