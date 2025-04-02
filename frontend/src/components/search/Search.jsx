import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
  ClickAwayListener,
  Autocomplete,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import { getCities } from '../../services/citiesService';

// Update the schema to remove location requirement and focus on cityId
const searchFormSchema = z.object({
  cityId: z.number({
    required_error: "Debes seleccionar una ciudad",
    invalid_type_error: "Debes seleccionar una ciudad válida"
  }),
  dateRange: z.object({
    startDate: z.date(),
    endDate: z.date(),
    key: z.string().optional()
  }).refine(data => {
    return data.endDate >= data.startDate;
  }, {
    message: "La fecha de salida debe ser después de la fecha de entrada",
    path: ["endDate"]
  }),
  people: z.number().int().positive().min(1, { message: 'Se requiere al menos 1 persona' }).max(10, { message: 'Máximo 10 personas' })
});

const Search = ({defaultValues}) => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState(defaultValues?.selectedCity || null);

  // Fetch cities on component mount
  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true);
      try {
        const citiesData = await getCities();
        setCities(citiesData);
        
        // If we have a city ID from defaultValues, find and set the selectedCity
        if (defaultValues?.cityId && citiesData.length > 0) {
          const city = citiesData.find(city => city.id === Number(defaultValues.cityId));
          if (city) {
            setSelectedCity(city);
          }
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCities();
  }, [defaultValues?.cityId]);

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
      cityId: null,
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

  // Remove setting location value since we only care about cityId
  useEffect(() => {
    if (selectedCity) {
      setValue('cityId', selectedCity.id);
    }
  }, [selectedCity, setValue]);

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
    console.log('Formulario enviado:', data);
    const searchParams = new URLSearchParams();
    if (data.cityId) {
      searchParams.set("cityId", data.cityId);
    }
    searchParams.set("from", formatDateToParam(data.dateRange.startDate));
    searchParams.set("to", formatDateToParam(data.dateRange.endDate));
    searchParams.set("people", data.people);

    navigate("/search?"+searchParams);
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
      minWidth: '65%', 
      margin: 'auto 3rem', 
      boxShadow: 3,
      borderRadius: 2,
      my:"20px"
    }}>
      <CardHeader 
        title="Explora y reserva"
        titleTypographyProps={{ variant: 'h5', fontWeight: 'bold', color: '#fff' }} 
        sx={{ 
          backgroundColor:"#00CED1",
          color: '#fff',
          textAlign: 'left',
          p: 2,
          borderBottom:"1px solid #F3F4F6"
        }}
      />
      <CardContent sx={{ p: 3}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4} alignItems="center"  >
            <Grid item xs={12} md={3} >
              <Controller
                name="cityId"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    id="city-autocomplete"
                    options={cities}
                    loading={loading}
                    value={selectedCity}
                    getOptionLabel={(option) => {
                      if (typeof option === 'string') {
                        return option;
                      }
                      return option.name ? `${option.name}, ${option.country}` : '';
                    }}
                    onChange={(_, newValue) => {
                      setSelectedCity(newValue);
                      setValue('cityId', newValue ? newValue.id : null);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="¿A dónde viajas?"
                        variant="outlined"
                        error={!!errors.cityId}
                        helperText={errors.cityId?.message}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <>
                              <InputAdornment position="start">
                                <LocationOnIcon sx={{color:"#73FBFD"}} />
                              </InputAdornment>
                              {params.InputProps.startAdornment}
                            </>
                          ),
                          endAdornment: (
                            <>
                              {loading ? <CircularProgress color="inherit" size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                    renderOption={(props, option) => (
                      <li {...props}>
                        <LocationOnIcon sx={{ color: "#73FBFD", mr: 1 }} />
                        {option.name}, {option.country}
                      </li>
                    )}
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
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:"center"}}>
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
                  backgroundColor:"#00CED1",
                  "&:hover": {
                    backgroundColor: "#00B3B3",
                  }
                  
                  
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
