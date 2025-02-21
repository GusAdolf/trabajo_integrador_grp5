package com.dh.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "image")  // Nombre de la tabla en la BD
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idimage") // Coincide con la BD
    private Long id;

    @Column(name = "url_image", nullable = false, length = 500)
    private String imageUrl;  // Ahora coincide con la BD

    @Column(name = "display_order")
    private Integer displayOrder;  // Nuevo campo agregado

    @ManyToOne
    @JoinColumn(name = "product_idproduct", nullable = false)  // Referencia correcta
    @JsonIgnore
    private Product product;
}

