import Swal from "sweetalert2";
import { useRecordContext, DeleteButton } from "react-admin";
import { deleteProduct } from "../../../../services/productService";
import Button from "@mui/material/Button";

export const CustomDeleteButton = ({setIsDelete}) => {
  const record = useRecordContext();

  if (!record) return null;

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Deseas eliminar el producto "${record.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteProduct(record.id);
        Swal.fire("Eliminado", "El producto ha sido eliminado.", "success").then(() => {
          window.location.href = "/admin/products";
        })
        setIsDelete(true);
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el producto.", "error");
      }
    }
  };

  return (
    <Button
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
    >Eliminar</Button>
  );
};
