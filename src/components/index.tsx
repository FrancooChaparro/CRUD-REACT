import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";

interface MyPropsCard {
  name: string;
  categoria: string;
  editar: any;
  borrar: any;
  idi: number;
}
export const Mobie: React.FC<MyPropsCard> = ({
  name,
  categoria,
  editar,
  borrar,
  idi,
}) => {
  const hola = idi;
  return (
    <div className="movie">
      <div className="divs">
        <span>{name}</span>
      </div>
      <div className="divs">
        <span>{categoria}</span>
      </div>
      <div className="divs">
        <button onClick={() => editar(hola)}>
          <BiEdit />
        </button>
        <button onClick={() => borrar(hola)}>
          <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
};
