package com.xplora.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Review extends Timestamp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer score;

    @Column(length = 1000)
    private String comment;

    /*@ManyToOne
    @JoinColumn(nullable = false)
    @JsonIgnore
    private User user;*/

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(nullable = false)
    //@JsonIgnore
    private Product product;

    @ToString.Exclude
    @OneToOne
    @JoinColumn(nullable = false)
    //@JsonIgnore
    private Booking booking;
}
