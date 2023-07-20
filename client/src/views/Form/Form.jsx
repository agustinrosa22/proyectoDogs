import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { addDog, getTemperaments } from '../../redux/actions';
import styles from './Form.module.css';

const Form = () => {
  const dispatch = useDispatch(); //useDispatch para obtener la función dispatch para enviar acciones al store
  const temperaments = useSelector((state) => state.temperamentOptions);//useSelector para obtener el estado 'temperamentOptions' desde el store

  const [form, setForm] = useState({//useState para crear el estado 'form' y la función 'setForm' para actualizarlo
    name: '',
    minHeight: '',
    maxHeight: '',
    minWeight: '',
    maxWeight: '',
    lifeSpan: '',
    selectedTemperaments: [],
    image: '',
  });

  useEffect(() => {//useEffect para obtener los temperamentos disponibles cuando el componente se monta
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleChange = (e) => {// Función para manejar el cambio en los campos del formulario
    const { name, value } = e.target;
    if (name === 'name' && value !== '' && !/^[a-zA-Z\s]+$/.test(value)) {
      return; // Si el valor contiene caracteres no válidos y no está vacío, no se actualiza el estado
    }
    if ((name === 'minHeight' || name === 'maxHeight' || name === 'minWeight' || name === 'maxWeight') && value < 0) {
      return; // Si el valor es negativo, no se actualiza el estado
    }
    setForm({ ...form, [name]: value });// Realiza validaciones y actualiza el estado 'form' con el nuevo valor
  };

  const handleSelectChange = (selectedOptions) => {//Función para manejar el cambio en el componente Select de temperamentos
    const selectedTemperaments = selectedOptions.map((option) => option.value);//Obtiene los valores seleccionados y actualiza el estado 'form' con los temperamentos seleccionados
    setForm({ ...form, selectedTemperaments });
  };

  const handleImageChange = (e) => {//Función para manejar el cambio en el campo de imagen
    const { value } = e.target;
    setForm({ ...form, image: value });//actualiza el estado
  };

  const handleSubmit = (e) => {//Función para manejar el envío del formulario
    e.preventDefault();
  
    const newDog = {// // Crea un objeto 'newDog' con los datos ingresados en el formulario
      name: form.name,
      height: {
        min: form.minHeight,
        max: form.maxHeight,
      },
      weight: {
        min: form.minWeight,
        max: form.maxWeight,
      },
      life_span: form.lifeSpan,
      temperament: form.selectedTemperaments, 
      image: form.image,
    };
  
    dispatch(addDog(newDog));// // Envía la acción 'addDog' al store para agregar el nuevo perro
  
    setForm({//Resetea los campos del formulario
      name: '',
      minHeight: '',
      maxHeight: '',
      minWeight: '',
      maxWeight: '',
      lifeSpan: '',
      selectedTemperaments: [],
      image: '',
    });
  };
  
  return (
    <div className={styles.formContainer}>
      <h1>AGREGA TU PROPIA RAZA!!!</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          value={form.name}
          onChange={handleChange}
          name="name"
          required
        />
        <label htmlFor="minHeight">Altura mínima:</label>
        <input
          type="number"
          id="minHeight"
          value={form.minHeight}
          onChange={handleChange}
          name="minHeight"
          required
        />

        <label htmlFor="maxHeight">Altura máxima:</label>
        <input
          type="number"
          id="maxHeight"
          value={form.maxHeight}
          onChange={handleChange}
          name="maxHeight"
          required
        />

        <label htmlFor="minWeight">Peso mínimo:</label>
        <input
          type="number"
          id="minWeight"
          value={form.minWeight}
          onChange={handleChange}
          name="minWeight"
          required
        />

        <label htmlFor="maxWeight">Peso máximo:</label>
        <input
          type="number"
          id="maxWeight"
          value={form.maxWeight}
          onChange={handleChange}
          name="maxWeight"
          required
        />

        <label htmlFor="lifeSpan">Años de vida:</label>
        <input
          type="text"
          id="lifeSpan"
          value={form.lifeSpan}
          onChange={handleChange}
          name="lifeSpan"
          required
        />

        <label htmlFor="image">Imagen (URL):</label>
        <input
          type="url"
          id="image"
          value={form.image}
          onChange={handleImageChange}
          name="image"
          required
        />

        <label htmlFor="temperaments">Temperamentos:</label>
        <Select
          id="temperaments"
          options={temperaments.map((temperament) => ({
            value: temperament.name,
            label: temperament.name,
          }))}
          isMulti
          value={form.selectedTemperaments.map((temperament) => ({
            value: temperament,
            label: temperament,
          }))}
          onChange={handleSelectChange}
        />

        <button type="submit">Crear nueva raza</button>
      </form>
    </div>
  );
};

export default Form;