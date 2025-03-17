package com.xplora.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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

    @Size(min = 3)
    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Integer maxCapacity;

    private Double averageScore = 0.0;

    private Integer countScores = 0;

    @Column(nullable = false)
    private String address;

    @ManyToOne
    @NotNull
    @JoinColumn(nullable = false)
    private City city;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @NotNull
    @Size(min = 5, message = "El producto debe tener almenos 5 imágenes")
    private Set<Image> imageSet;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToMany
    @JoinTable(
            name = "products_features", // Nombre de la tabla  en la BD
            joinColumns = @JoinColumn(name = "products_id"),
            inverseJoinColumns = @JoinColumn(name = "features_id")
    )
    private List<Feature> features;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @NotNull
    @Size(min = 1, message = "El producto debe tener almenos 1 fecha disponible")
    private Set<Availability> availabilitySet;

    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private Set<Review> reviewSet;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private Set<Booking> bookingSet;
}
