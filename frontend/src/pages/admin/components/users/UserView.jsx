import { 
  Avatar, 
  Stack, 
  Typography, 
  Link, 
} from "@mui/material";
import { 
  useRecordContext 
} from "react-admin";

export const UserView = ({ sx }) => {
  const record = useRecordContext();
  if (!record) return null;
  
  return (
    <Stack direction="row" gap={2} sx={sx}>
      <Avatar src={record.avatar} />
      <Stack>
        <Typography variant="h6">
          {record.firstname} {record.lastname}
        </Typography>
        <Link variant="body2" href={`mailto:${record.email}`} >
          {record.email}
        </Link>
        <Typography variant="body2" >
          {record.role}
        </Typography>
      </Stack>
    </Stack>
  )
}