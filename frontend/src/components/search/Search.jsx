import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import dayjs from 'dayjs';
// Change from DateRangePicker to DateRange
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  Grid, 
  TextField, 
  Button, 
  InputAdornment,
  IconButton,
  Box,
  Typography,
  Popover,
  ClickAwayListener
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

// Modify the Zod schema to work with Date objects from react-date-range
const searchFormSchema = z.object({
  location: z.string().min(1, { message: 'La ubicación es requerida' }),
  dateRange: z.object({
    startDate: z.date(),
    endDate: z.date(),
    key: z.string().optional()
  }).refine(data => {
    return data.endDate > data.startDate;
  }, {
    message: "La fecha de salida debe ser después de la fecha de entrada",
    path: ["endDate"]
  }),
  people: z.number().int().positive().min(1, { message: 'Se requiere al menos 1 persona' }).max(10, { message: 'Máximo 10 personas' })
});

const Search = ({defaultValues}) => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate= useNavigate();

  // Create a separate state for the calendar
  const [dateRangeState, setDateRangeState] = useState([
    defaultValues?.dateRange || {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      key: 'selection'
    }
  ]);

  const { control, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    resolver: zodResolver(searchFormSchema),
    defaultValues: defaultValues || {
      location: '',
      dateRange: {
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        key: 'selection'
      },
      people: 1
    }
  });

  const people = watch('people');
  const dateRange = watch('dateRange');

  // Sync form state with calendar state
  useEffect(() => {
    setValue('dateRange', dateRangeState[0]);
  }, [dateRangeState, setValue]);

  // Format dates as DD/MM/YY

  const formatDate = (date) => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  const formatDateToParam = (date) => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  // Format the date range for display
  const formattedDateRange = `${formatDate(dateRange.startDate)} - ${formatDate(dateRange.endDate || dateRange.startDate)}`;

  const handleCalendarOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setCalendarOpen(true);
  };

  const handleCalendarClose = () => {
    setCalendarOpen(false);
  };

  const onSubmit = async (data) => {
    // Navegar a  /buscar?ubicacion=Lima&desde=2015-03-15&hasta=2015-03-15&personas=2

    console.log('Formulario enviado:', data);
    const searchParams = new URLSearchParams();
    searchParams.set("location", data.location);
    searchParams.set("from",formatDateToParam(data.dateRange.startDate))
    searchParams.set("to",formatDateToParam(data.dateRange.endDate));
    searchParams.set("people",data.people);

    navigate("/search?"+searchParams)
    
    
  };

  const handleIncrement = () => {
    const currentValue = people || 1;
    if (currentValue < 10) {
      setValue('people', currentValue + 1);
    }
  };

  const handleDecrement = () => {
    const currentValue = people || 1;
    if (currentValue > 1) {
      setValue('people', currentValue - 1);
    }
  };

  return (
    <Card sx={{ 
      maxWidth: '100%', 
      margin: '2rem auto', 
      boxShadow: 3,
      borderRadius: 2
    }}>
      <CardHeader 
        title="Explora y reserva" 
        sx={{ 
          // backgroundColor:"#FFFF",
          backgroundColor:"#00CED1",
          // color: '#1C274C',
          color: '#ffff',

          textAlign: 'left',
          p: 2,
          borderBottom:"1px solid #F3F4F6"
        }}
      />
      <CardContent sx={{ p: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="¿A dónde viajas?"
                    variant="outlined"
                    error={!!errors.location}
                    helperText={errors.location?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnIcon  sx={{color:"#73FBFD"}} />
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="dateRange"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      fullWidth
                      label="Selecciona Fechas"
                      variant="outlined"
                      value={formattedDateRange}
                      onClick={handleCalendarOpen}
                      error={!!errors.dateRange?.message}
                      helperText={errors.dateRange?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarMonthIcon sx={{color:"#73FBFD"}} />
                          </InputAdornment>
                        ),
                        readOnly: true,
                      }}
                    />
                    <Popover
                      open={calendarOpen}
                      anchorEl={anchorEl}
                      onClose={handleCalendarClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                      PaperProps={{
                        sx: {
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                         
                        }
                      }}
                    >
                      <ClickAwayListener onClickAway={handleCalendarClose}>
                        <Box sx={{ 
                          display: 'flex',
                          justifyContent: 'center',
                          padding: 1
                        }}>
                          <DateRange
                            editableDateInputs={true}
                            onChange={item => {
                              setDateRangeState([item.selection]);
                            }}
                            moveRangeOnFirstSelection={false}
                            ranges={dateRangeState}
                            months={2}
                            direction="horizontal"
                          />
                        </Box>
                      </ClickAwayListener>
                    </Popover>
                  </>
                )}
              />
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Controller
                name="people"
                control={control}
                render={({ field }) => (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <InputAdornment position="start" sx={{ mr: 1 }}>
                      <PeopleIcon sx={{color:"#73FBFD"}} />
                    </InputAdornment>
                    <IconButton onClick={handleDecrement}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 2, minWidth: '30px', textAlign: 'center' }}>
                      {field.value}
                    </Typography>
                    <IconButton onClick={handleIncrement}>
                      <AddIcon />
                    </IconButton>
                    {errors.people && (
                      <Typography color="error" variant="caption" sx={{ ml: 1 }}>
                        {errors.people.message}
                      </Typography>
                    )}
                  </Box>
                )}
              />
            </Grid>
            
            <Grid item xs={12} md={2}>
              <Button 
                type="submit" 
                variant="contained" 
                fullWidth
                startIcon={<SearchIcon />}
                sx={{ 
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  backgroundColor:"#00CED1"
                  
                }}
              >
                Buscar
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default Search;
