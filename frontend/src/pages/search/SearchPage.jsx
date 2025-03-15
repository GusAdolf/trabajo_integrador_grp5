import { Box } from "@mui/material"
import { useSearchParams } from "react-router";

export const SearchPage = ()=>{

  const [searchParams, setSearchParams] = useSearchParams();

  const params ={
    location : searchParams.get("location"),

  }
  
  
  
  
  
  

  
  
  return(
    <Box>
       <h1>Hola mundo</h1>
       <p>Resultados de busqueda para Lima desde 2025-03-15 hasta 2025-03-16 para 2 personas
       </p>
    </Box>
  
  )
}