package com.xplora.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Booking extends Timestamp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Status status;

    @NotNull
    @Column(nullable = false)
    private Long availabilityId;

    @NotNull
    @Column(nullable = false)
    private Integer quantity;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User user;

    @ManyToOne
    @NotNull
    @JoinColumn(nullable = false)
    private Product product;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
    @JoinColumn(unique = true)
    private Review review;
}
