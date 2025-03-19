package com.xplora.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
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
    @Max(value = 5, message = "máximo 5 estrellas")
    @Min(value = 1, message = "mínimo 1 estrella") // entero??
    private Integer score;

    private String comment;

    private String userFullName;

    /*@ManyToOne
    @JoinColumn(nullable = false)
    @JsonIgnore
    private User user;*/

    @ManyToOne
    @JoinColumn(nullable = false)
    @JsonIgnore
    private Product product;

    @OneToOne
    @JoinColumn(nullable = false)
    @JsonIgnore
    private Booking booking;
}
