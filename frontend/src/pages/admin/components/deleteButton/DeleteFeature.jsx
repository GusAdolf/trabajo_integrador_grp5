import Swal from "sweetalert2";
import { useRecordContext, DeleteButton } from "react-admin";
import { deleteFeature } from "../../../../services/featuresService";

export const CustomDeleteFeature = ({setIsDelete}) => {
  const record = useRecordContext();

  if (!record) return null;

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Deseas eliminar la caracteristica "${record.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteFeature(record.id);
        Swal.fire("Eliminado", "La característica ha sido eliminada.", "success");
        setIsDelete(true);
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar la característica.", "error");
      }
    }
  };

  return (
    <DeleteButton
      label="Eliminar"
      onClick={handleDelete}
      sx={{
        backgroundColor: "#d33",
        color: "white",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        padding: "5px 20px",
        fontWeight: "bold",
        textTransform: "none",
        width: "100%",
        "&:hover": {
          backgroundColor: "#a00",
        },
      }}
    />
  );
};
