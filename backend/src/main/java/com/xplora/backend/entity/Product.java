package com.xplora.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "products")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Product extends Timestamp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Integer capacity;

    @Column(nullable = false)
    private Double averageScore = 0.0;

    @Column(nullable = false)
    private Integer countScores = 0;

    @Column(nullable = false)
    private String address;

    @ManyToOne
    @JoinColumn(nullable = false)
    private City city;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Image> imageSet;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToMany
    @JoinTable(
            name = "products_features", // Nombre de la tabla  en la BD
            joinColumns = @JoinColumn(name = "products_id"), // s
            inverseJoinColumns = @JoinColumn(name = "features_id")
    )
    private List<Feature> features;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Availability> availabilitySet;

    @ToString.Exclude
    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private Set<Review> reviewSet;

    @ToString.Exclude
    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private Set<Booking> bookingSet;
}
