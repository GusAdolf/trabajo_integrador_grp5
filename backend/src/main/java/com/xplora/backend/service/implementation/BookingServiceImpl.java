package com.xplora.backend.service.implementation;

import com.xplora.backend.entity.*;
import com.xplora.backend.exception.ResourceNotFoundException;
import com.xplora.backend.repository.IBookingRepository;
import com.xplora.backend.service.IAvailabilityService;
import com.xplora.backend.service.IBookingService;
import com.xplora.backend.service.IProductService;
import com.xplora.backend.service.IUserService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingServiceImpl implements IBookingService  {
    private IBookingRepository bookingRepository;
    private IUserService userService;
    private IProductService productService;
    private IAvailabilityService availabilityService;

    public BookingServiceImpl(IBookingRepository bookingRepository, IUserService userService, IProductService productService, IAvailabilityService availabilityService) {
        this.bookingRepository = bookingRepository;
        this.userService = userService;
        this.productService = productService;
        this.availabilityService = availabilityService;
    }

    @Override
    public Booking saveBooking(Booking booking, String userToken) {
        User user = userService.getUserByToken(userToken);

        Product product = productService.getProductById(booking.getProduct().getId());

        Availability availability = product.getAvailabilitySet().stream()
                .filter(a -> a.getId().equals(booking.getAvailabilityId()))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("No se encontró la fecha reservada en las fechas disponibles del producto"));

        // TODO: verificar fecha posterior a hoy o que ya no este en la lista de disponibles

        if (booking.getQuantity() > availability.getCapacity()) {
            throw new DataIntegrityViolationException("La cantidad de personas a reservar supera la capacidad disponible");
        }

        availability.setCapacity(availability.getCapacity() - booking.getQuantity());
        availabilityService.updateAvailability(availability);

        booking.setStatus(Status.PENDING);
        booking.setUser(user);
        booking.setProduct(product);

        // TODO: mandar correo
        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getBookingsByUserToken(String userToken) {
        User user = userService.getUserByToken(userToken);
        return bookingRepository.findByUserId(user.getId());
    }

    // sin endpoint, de uso interno (para un usuario debe ser otro añadiendo el token como parametro)
    @Override
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservación no encontrada"));
    }
}
