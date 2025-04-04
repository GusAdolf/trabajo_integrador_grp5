package com.xplora.backend.service.implementation;

import com.xplora.backend.dto.request.BookingRequestDto;
import com.xplora.backend.dto.response.*;
import com.xplora.backend.entity.*;
import com.xplora.backend.exception.BadRequestException;
import com.xplora.backend.exception.ResourceNotFoundException;
import com.xplora.backend.repository.IBookingRepository;
import com.xplora.backend.service.IAvailabilityService;
import com.xplora.backend.service.IBookingService;
import com.xplora.backend.service.IEmailService;
import com.xplora.backend.service.IProductService;
import jakarta.mail.MessagingException;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingServiceImpl implements IBookingService  {
    private final Logger logger = LoggerFactory.getLogger(BookingServiceImpl.class);
    private IBookingRepository bookingRepository;
    private IProductService productService;
    private IAvailabilityService availabilityService;
    private IEmailService emailService;
    @Autowired
    private ModelMapper modelMapper;

    public BookingServiceImpl(IBookingRepository bookingRepository, IProductService productService, IAvailabilityService availabilityService, IEmailService emailService) {
        this.bookingRepository = bookingRepository;
        this.productService = productService;
        this.availabilityService = availabilityService;
        this.emailService = emailService;
    }

    @Override
    public BookingResponseDto saveBooking(BookingRequestDto bookingRequestDto, User user) throws MessagingException {
        logger.info("saveBookingOfUser - Guardando reservación: " + bookingRequestDto + " del usuario con id: " + user.getId());

        Product product = productService.findById(bookingRequestDto.getProduct_id());
        Availability availability = availabilityService.findByIdInProduct(bookingRequestDto.getAvailability_id(), product);

        /*if (!availability.getDate().isAfter(LocalDate.now())) {
            throw new BadRequestException("La fecha disponible a reservar debe ser posterior a hoy");
        }*/

        int newRemainingCapacity = availability.getRemainingCapacity() - bookingRequestDto.getQuantity();
        if (newRemainingCapacity < 0) {
            throw new DataIntegrityViolationException("La cantidad de personas a reservar supera la capacidad disponible");
        }
        availability.setRemainingCapacity(newRemainingCapacity);
        availabilityService.updateAvailability(availability);

        Booking booking = modelMapper.map(bookingRequestDto, Booking.class);
        booking.setDate(availability.getDate());
        booking.setUser(user);
        booking.setProduct(product);
        Booking bookingDB = bookingRepository.save(booking);

        BookingResponseDto bookingResponseDto = bookingToResponse(bookingDB);
        emailService.sendMailBooking(bookingResponseDto);
        return bookingResponseDto;
    }

    @Override
    public List<BookingResponseDto> getBookingsByUserId(Long userId) {
        logger.info("getBookingsByUserId - Obteniendo reservaciones del usuario con id: " + userId);
        List<Booking> bookingsDB = bookingRepository.findByUserId(userId);

        List<BookingResponseDto> bookingResponseDtoList = new ArrayList<>();
        for (Booking booking : bookingsDB) {
            bookingResponseDtoList.add(bookingToResponse(booking));
        }
        return bookingResponseDtoList;
    }

    @Override
    public List<BookingResponseDto> getBookingsByProductId(Long productId) {
        logger.info("getBookingsByProductId - Obteniendo reservaciones del producto con id: " + productId);
        List<Booking> bookingsDB = bookingRepository.findByProductId(productId);

        List<BookingResponseDto> bookingResponseDtoList = new ArrayList<>();
        for (Booking booking : bookingsDB) {
            bookingResponseDtoList.add(bookingToResponse(booking));
        }
        return bookingResponseDtoList;
    }

    @Override
    public Booking findById(Long id) {
        logger.info("findById - Buscando reservación con id: " + id);
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservación no encontrada"));
    }

    public BookingResponseDto bookingToResponse(Booking booking) {
        ProductResponseDto productResponseDto = modelMapper.map(booking.getProduct(), ProductResponseDto.class);
        productResponseDto.setCity(modelMapper.map(booking.getProduct().getCity(), CityResponseDto.class));

        BookingResponseDto bookingResponseDto = modelMapper.map(booking, BookingResponseDto.class);
        bookingResponseDto.setProduct(productResponseDto);
        bookingResponseDto.setAvailability(new AvailabilityResponseDto(null, booking.getDate(), null));
        bookingResponseDto.setUser(modelMapper.map(booking.getUser(), UserResponseDto.class));
        return bookingResponseDto;
    }
}
