package com.xplora.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "availability")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Availability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(nullable = false)
    @Future
    private LocalDate date;

    @Max(value = 100, message = "máximo 100 cupos")
    @Min(value = 0, message = "mínimo 0 cupos")
    @Column(nullable = false)
    private Integer capacity;

    @ManyToOne
    @JoinColumn(nullable = false)
    @JsonIgnore
    private Product product;
}
