package com.xplora.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "availabilities")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Availability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private Integer remainingCapacity;

    @ToString.Exclude
    @OneToMany(mappedBy = "availability")
    @JsonIgnore
    private Set<Booking> bookingSet;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(nullable = false)
    @JsonIgnore
    private Product product;
}
