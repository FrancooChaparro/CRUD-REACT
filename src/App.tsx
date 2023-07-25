import { useState } from "react";
import "./App.css";
import { Mobie } from "./components/index";

function App() {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [Modal, setModal] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");

  let categorias = [
    {
      id: 1,
      name: "Scream V",
      categoria: "Terror",
    },
    {
      id: 2,
      name: "El secreto de sus Ojos",
      categoria: "Drama",
    },
    {
      id: 3,
      name: "Spiderman",
      categoria: "Ciencia ficcion",
    },
    {
      id: 4,
      name: "Barbie",
      categoria: "Drama",
    },
    {
      id: 5,
      name: "Guardians of the Galaxy Vol. 3",
      categoria: "Fantasia",
    },
  ];
  const [originalData, setOriginalData] = useState(categorias);
  const [data, setData] = useState(categorias);
  const [newObj, setNewObj] = useState({
    id: data.length + 1,
    name: "",
    categoria: "",
  });
  let nextId = data.length + 1;

  function isFormValid() {
    return newObj.name.trim() !== "" && newObj.categoria.trim() !== "";
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewObj({
      ...newObj,
      [e.target.name]: e.target.value,
    });
  }

  function insertar() {
    if (!isFormValid()) {
      return alert("Porfavor Completar los campos vacios.");
    }
    if (editingId !== null) {
      setData((prevState) =>
        prevState.map((item) =>
          item.id === editingId ? { ...newObj, id: editingId } : item
        )
      );
      setEditingId(null);
    } else {
      const newItem = { ...newObj, id: nextId++ };
      setData((prevState) => [...prevState, newItem]);

      setOriginalData((prevState) => [...prevState, newItem]);
    }

    setNewObj({
      id: nextId,
      name: "",
      categoria: "",
    });
    setModal(false);
  }

  function borrar(id: number) {
    setData((prevState) => prevState.filter((registro) => registro.id !== id));

    setOriginalData((prevState) =>
      prevState.filter((registro) => registro.id !== id)
    );
    setNewObj({
      id: nextId,
      name: "",
      categoria: "",
    });
  }

  function editar(id: number) {
    const elementToEdit = data.find((item) => item.id === id);
    if (elementToEdit) {
      setNewObj({
        id: elementToEdit.id,
        name: elementToEdit.name,
        categoria: elementToEdit.categoria,
      });
      setEditingId(id);
    }
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function handleSearch() {
    if (searchTerm === "") {
      setData(originalData);
    } else {
      setData(
        originalData.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setSearchTerm("");
  }
  return (
    <>
      <div className="header">
        <h1>SISTEMA CRUD</h1>
        <p>
          Sistema CRUD, hecho 100% a CSS puro, Navbar para buscar por nombre,
          Boton ADD para insertar nuevos datos, cada casilla cuenta con 2
          botones para editar o eliminar.{" "}
        </p>
      </div>
      <div className="ContainerAll">
        <div className="SearchContainer">
          <div className="container">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar por nombre..."
            />
            <button className="btn-search" onClick={() => handleSearch()}>
              Search
            </button>
            <button className="btn-add" onClick={() => setModal(true)}>
              +
            </button>
          </div>
        </div>

        {Modal || editingId ? (
          <div className="modal">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={newObj.name}
              onChange={handleChange}
            />
            <label htmlFor="categoria">Gender</label>
            <input
              type="text"
              name="categoria"
              value={newObj.categoria}
              onChange={handleChange}
            />
            <button onClick={() => insertar()}>Done</button>
          </div>
        ) : null}

        <div className="containerInfo">
          <span>Movie</span>
          <span>Gender</span>
          <span>Settings</span>
        </div>
        <div className="containerMovies">
          {data.length === 0 && <h4>No hay resultados</h4>}
          {data &&
            data.map((e) => {
              return (
                <div key={e.id}>
                  <Mobie
                    name={e.name}
                    categoria={e.categoria}
                    editar={editar}
                    borrar={borrar}
                    idi={e.id}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;
