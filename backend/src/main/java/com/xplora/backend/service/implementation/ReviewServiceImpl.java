package com.xplora.backend.service.implementation;

import com.xplora.backend.entity.Availability;
import com.xplora.backend.entity.Booking;
import com.xplora.backend.entity.Review;
import com.xplora.backend.entity.User;
import com.xplora.backend.exception.BadRequestException;
import com.xplora.backend.exception.ResourceNotFoundException;
import com.xplora.backend.repository.IReviewRepository;
import com.xplora.backend.service.IBookingService;
import com.xplora.backend.service.IProductService;
import com.xplora.backend.service.IReviewService;
import com.xplora.backend.service.IUserService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReviewServiceImpl implements IReviewService {
    private IReviewRepository reviewRepository;
    private IUserService userService;
    private IBookingService bookingService;
    private IProductService productService;

    public ReviewServiceImpl(IReviewRepository reviewRepository, IUserService userService, IBookingService bookingService, IProductService productService) {
        this.reviewRepository = reviewRepository;
        this.userService = userService;
        this.bookingService = bookingService;
        this.productService = productService;
    }

    @Override
    public Review saveReviewOfBooking(Review review, Long bookingId, String userToken) {
        if (bookingId == null) {
            throw new BadRequestException("La reseña no tiene una reservación donde pertenezca");
        }
        Booking booking = bookingService.getBookingById(bookingId);

        User user = userService.getUserByToken(userToken);
        if (user.getId() != booking.getUser().getId()) {
            throw new DataIntegrityViolationException("El usuario de la reseña es diferente al usuario de la reservación");
        }

        // TODO: validar que el booking este confirmada

        Availability availability = booking.getProduct().getAvailabilitySet().stream()
                .filter(a -> a.getId().equals(booking.getAvailabilityId()))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("No se encontró la fecha reservada en las fechas disponibles del producto"));

        if (!LocalDate.now().isAfter(availability.getDate())) {
            throw new BadRequestException("La reseña debe hacerse despues de la fecha de reservación");
        }

        if (booking.getReview() != null) {
            throw new DataIntegrityViolationException("La reservación ya tiene una reseña");
        }

        productService.updateAverageScore(booking.getProduct().getId(), review.getScore());

        review.setUserFullName(user.getFirstname() + " " + user.getLastname());
        review.setProduct(booking.getProduct());
        review.setBooking(booking);
        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getReviewsByProductId(Long productId) {
        if (!productService.existsById(productId)) {
            throw new BadRequestException("El producto no existe");
        }
        return reviewRepository.findByProductId(productId);
    }
}
