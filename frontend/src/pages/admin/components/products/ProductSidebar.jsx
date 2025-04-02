import { 
  Box, 
  Typography 
} from "@mui/material";
import { 
  ReferenceField, 
  ReferenceManyField, 
  SingleFieldList, 
  TextField, 
} from "react-admin"
import { UserView } from "../users/UserView";

export const ProductSidebar = () => {
  return (
    <Box 
      sx={{
        width: 300,
        mx: "1rem"
      }}
    >
      <Typography variant="h5" gutterBottom >
        Reseñas
      </Typography>
      <ReferenceManyField reference="reviews" target="product_id">
        <SingleFieldList linkType={false} gap={2} >
          <div>
            {/* <StarRatingField sx={{ ml: 7 }} /> */}
            <TextField source="userFullName" />
            <TextField source="comment" />
            <TextField source="score" />
            {/* <ReferenceField source="user_id" reference="users" >
              <UserView sx={{ m : 2 }} />
            </ReferenceField> */}
          </div>
        </SingleFieldList>
      </ReferenceManyField>
    </Box>
  );
};
