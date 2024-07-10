import PropTypes from 'prop-types';
import { Person } from './Person';
import { useState } from 'react';

export const People = ({ persons, setPersons }) => {

  // Estado para identificar a la persona que se está editando
  const [editingId, setEditingId] = useState(null);

  // Estado para la persona que se editó
  const [editedPerson, setEditedPerson] = useState({
    name: '',
    role: '',
    img: ''
  });

  // Estado para establecer si se está editando o no
  const [isEditing, setIsEditing] = useState(false);

  // Método para capturar los datos desde el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPerson(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  // Método para crear nuevo empleado
  const handleCreate = (e) => {

    // Prevenir que el navegador se actualice
    e.preventDefault();

    setPersons([...persons, { id: persons.length + 1, ...editedPerson }]);

    // Resetear la variable de estado de editedPerson
    setEditedPerson({ name: '', role: '', img: '' });

  }

  // Método para editar los datos de una persona
  const handleEdit = (id) => {

    // Establecemos el Id de la persona a editar
    setEditingId(id);

    // Activar el estado de edición
    setIsEditing(true);

    // Buscar la persona a editar
    const personToEdit = persons.find(person => person.id === id);

    setEditedPerson({ ...personToEdit });

  }

  // Método para actualizar los datos modificados
  const handleSave = (e) => {

    // Prevenir que el navegador se actualice
    e.preventDefault();

    // Actualizar el estado de persons al guardar los datos modificados
    const updatedPersons = persons.map(person => person.id === editingId ? editedPerson : person);

    // Actualizar los datos de la persona en el array
    setPersons(updatedPersons);

    // Desactivar el estado de edición
    setIsEditing(false);

    // Resetear la variable de estado editingId a null
    setEditingId(null);

    // Resetear la variable de estado editedPerson
    setEditedPerson({ name: '', role: '', img: '' });
  }

  return (
    <div>
      <h2 className='text-center my-4'>IT Team</h2>
      <div className='container'>
        <div className='row d-flex flex-wrap row-cols-1 row-cols-md-2 row-cols-lg-3'>
          {persons.map((person) => {
            return (
              <div key={person.id}>
                <Person
                  id={person.id}
                  name={person.name}
                  img={person.img}
                  role={person.role}
                  handleEdit={() => handleEdit(person.id)}
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* Renderizar el formulario para crear o editar los datos de una persona */}
      <div className='container mt-4 row p-2'>
        <h2 className='text-center my-4'>{isEditing ? 'Actualizar Empleado' : 'Crear Nuevo Empleado'}</h2>
        <form className='border border-dark rounded p-4'>
          <div className="mb-3">
            <label className="form-label">Nombres</label>
            <input
              type="text"
              name="name"
              value={editedPerson.name}
              onChange={handleChange}
              className="form-control"
              aria-describedby="nombre"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Cargo</label>
            <input
              type="text"
              name="role"
              value={editedPerson.role}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Avatar</label>
            <input
              type="text"
              name="img"
              value={editedPerson.img}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={isEditing ? handleSave : handleCreate}>{isEditing ? 'Modificar' : 'Crear'}</button>
        </form>
      </div>
    </div>
  )
}

People.propTypes = {
  persons: PropTypes.array,
  setPersons: PropTypes.func
}
