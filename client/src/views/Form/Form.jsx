import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { addDog, getTemperaments } from '../../redux/actions';
import styles from './Form.module.css';

const Form = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperamentOptions);

  const [form, setForm] = useState({
    name: '',
    minHeight: '',
    maxHeight: '',
    minWeight: '',
    maxWeight: '',
    lifeSpan: '',
    selectedTemperaments: [],
    image: '',
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name' && value !== '' && !/^[a-zA-Z\s]+$/.test(value)) {
      return; // Si el valor contiene caracteres no válidos y no está vacío, no se actualiza el estado
    }
    if ((name === 'minHeight' || name === 'maxHeight' || name === 'minWeight' || name === 'maxWeight') && value < 0) {
      return; // Si el valor es negativo, no se actualiza el estado
    }
    setForm({ ...form, [name]: value });
  };

  const handleSelectChange = (selectedOptions) => {
    const selectedTemperaments = selectedOptions.map((option) => option.value);
    setForm({ ...form, selectedTemperaments });
  };

  const handleImageChange = (e) => {
    const { value } = e.target;
    setForm({ ...form, image: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newDog = {
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
      temperament: form.selectedTemperaments, // Incluye los temperamentos seleccionados
      image: form.image,
    };
  
    dispatch(addDog(newDog));
  
    setForm({
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