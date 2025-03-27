package com.xplora.backend.service.implementation;

import com.xplora.backend.dto.request.ReviewRequestDto;
import com.xplora.backend.dto.response.ReviewResponseDto;
import com.xplora.backend.entity.Booking;
import com.xplora.backend.entity.Review;
import com.xplora.backend.entity.Status;
import com.xplora.backend.entity.User;
import com.xplora.backend.exception.BadRequestException;
import com.xplora.backend.repository.IReviewRepository;
import com.xplora.backend.service.IBookingService;
import com.xplora.backend.service.IProductService;
import com.xplora.backend.service.IReviewService;
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
public class ReviewServiceImpl implements IReviewService {
    private final Logger logger = LoggerFactory.getLogger(ReviewServiceImpl.class);
    private IReviewRepository reviewRepository;
    private IBookingService bookingService;
    private IProductService productService;
    @Autowired
    private ModelMapper modelMapper;

    public ReviewServiceImpl(IReviewRepository reviewRepository, IBookingService bookingService, IProductService productService) {
        this.reviewRepository = reviewRepository;
        this.bookingService = bookingService;
        this.productService = productService;
    }

    @Override
    public ReviewResponseDto saveReview(Long bookingId, ReviewRequestDto reviewRequestDto, User user) {
        logger.info("saveReview - Guardando reseña: " + reviewRequestDto + " del usuario con id: " + user.getId());
        Booking booking = bookingService.findById(bookingId);

        if (user.getId() != booking.getUser().getId()) {
            throw new DataIntegrityViolationException("El usuario de la reseña es diferente al usuario de la reservación");
        }

        /*if (booking.getStatus() != Status.CONFIRMED) {
            throw new BadRequestException("La reservación no está confirmada");
        }

        if (!LocalDate.now().isAfter(booking.getAvailability().getDate())) {
            throw new BadRequestException("La reseña debe hacerse despues de la fecha de reservación");
        }*/

        if (booking.getReview() != null) {
            throw new DataIntegrityViolationException("La reservación ya tiene una reseña");
        }

        productService.updateAverageScore(booking.getProduct().getId(), reviewRequestDto.getScore());

        Review review = modelMapper.map(reviewRequestDto, Review.class);
        review.setProduct(booking.getProduct());
        review.setBooking(booking);
        Review reviewDB = reviewRepository.save(review);

        ReviewResponseDto reviewResponseDto = modelMapper.map(reviewDB, ReviewResponseDto.class);
        reviewResponseDto.setUserFullName(user.getFirstname() + " " + user.getLastname());
        return reviewResponseDto;
    }

    @Override
    public List<ReviewResponseDto> getReviewsByProductId(Long productId) {
        logger.info("getReviewsByProductId - Obteniendo reseñas del producto con id: " + productId);
        if (!productService.existsById(productId)) {
            return null;
        }
        List<Review> reviewsDB = reviewRepository.findByProductId(productId);

        List<ReviewResponseDto> reviewResponseDtoList = new ArrayList<>();
        for (Review review : reviewsDB) {
            String firstname = review.getBooking().getUser().getFirstname();
            String lastname = review.getBooking().getUser().getFirstname();

            ReviewResponseDto reviewResponseDto = modelMapper.map(review, ReviewResponseDto.class);
            reviewResponseDto.setUserFullName(firstname + " " + lastname);
            reviewResponseDtoList.add(reviewResponseDto);
        }

        return reviewResponseDtoList;
    }
}
