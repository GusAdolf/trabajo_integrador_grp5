package com.xplora.backend.utils;

import com.xplora.backend.dto.request.AvailabilityRequestDto;
import com.xplora.backend.dto.request.ProductRequestDto;
import com.xplora.backend.entity.*;
import com.xplora.backend.repository.*;
import com.xplora.backend.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ICityRepository cityRepository;
    private final ICategoryRepository categoryRepository;
    private final IFeatureRepository featureRepository;
    private final IProductService productService;
    private final IProductRepository productRepository;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            insertUsers();
        }

        if (cityRepository.count() == 0) {
            insertCities();
        }

        if (categoryRepository.count() == 0) {
            insertCategories();
        }

        if (featureRepository.count() == 0) {
            insertFeatures();
        }

        if (productRepository.count() == 0) {
            insertProducts();
        }
    }

    void insertUsers() {
        User admin = new User();
        admin.setEmail("admin@admin.com");
        admin.setPassword(passwordEncoder.encode("Admin12345678"));
        admin.setFirstname("admin");
        admin.setLastname("admin");
        admin.setRole(Role.SUPERADMIN);
        userRepository.save(admin);

        User user = new User();
        user.setEmail("user@user.com");
        user.setPassword(passwordEncoder.encode("User12345678"));
        user.setFirstname("user");
        user.setLastname("user");
        user.setRole(Role.USER);
        userRepository.save(user);
    }

    void insertCities() {
        City city1 = new City(null, "París", "Francia", null);
        City city2 = new City(null, "Londres", "Reino Unido", null);
        City city3 = new City(null, "Roma", "Italia", null);
        City city4 = new City(null, "Cuzco", "Perú", null);
        City city5 = new City(null, "Mar de Cortés", "Océano Pacífico", null);
        City city6 = new City(null, "Tokyo", "Japón", null);

        cityRepository.save(city1);
        cityRepository.save(city2);
        cityRepository.save(city3);
        cityRepository.save(city4);
        cityRepository.save(city5);
        cityRepository.save(city6);
    }

    void insertCategories() {
        Category category1 = new Category(
                null,
                "Gastronomía",
                "Explora experiencias culinarias y sabores únicos.",
                "https://res.cloudinary.com/dfmov5uj0/image/upload/f_auto,q_auto/v1/categories/rgdvhvznmar7r1zelz1o",
                null
                );
        Category category2 = new Category(
                null,
                "Cultura",
                "Sumérgete en la historia, el arte y las tradiciones locales.",
                "https://res.cloudinary.com/dfmov5uj0/image/upload/f_auto,q_auto/v1/categories/oy0hfivp8kzhroy8nek2",
                null
        );
        Category category3 = new Category(
                null,
                "Aventura",
                "Vive experiencias llenas de adrenalina y exploración.",
                "https://res.cloudinary.com/dfmov5uj0/image/upload/f_auto,q_auto/v1/categories/sjycq2srixpvmvjtk4tu",
                null
        );
        Category category4 = new Category(
                null,
                "Tour",
                "Descubre nuevos destinos con recorridos guiados.",
                "https://res.cloudinary.com/dfmov5uj0/image/upload/f_auto,q_auto/v1/categories/sfzucuka6ed34vkaamh0",
                null
        );

        categoryRepository.save(category1);
        categoryRepository.save(category2);
        categoryRepository.save(category3);
        categoryRepository.save(category4);
    }

    void insertFeatures() {
        Feature feature1 = new Feature(null, "Familias", "https://img.icons8.com/?size=26&id=6880&format=png", null);
        Feature feature2 = new Feature(null, "Sea Lovers", "https://img.icons8.com/?size=50&id=aDhl4dThqSY6&format=png", null);
        Feature feature3 = new Feature(null, "Activo", "https://img.icons8.com/?size=24&id=0Az5RrjFrZpO&format=png", null);
        Feature feature4 = new Feature(null, "Grupos pequeños", "https://img.icons8.com/?size=24&id=u9iFuoXqgfLU&format=png", null);
        Feature feature5 = new Feature(null, "3 Horas", "https://img.icons8.com/?size=24&id=QECUQIt2LlW8&format=png", null);

        featureRepository.save(feature1);
        featureRepository.save(feature2);
        featureRepository.save(feature3);
        featureRepository.save(feature4);
        featureRepository.save(feature5);
    }

    void insertProducts() {
        ProductRequestDto productRequestDto1 = new ProductRequestDto(
                "Paseo en barco por el Sena",
                "Tanto de día como de noche, dar un paseo en barco por el Sena es imprescindible para descubrir la belleza de París desde una perspectiva única. La embarcación es panorámica e incluye comentarios en español.",
                180.0,
                20,
                "Calle Digital House 123, Certified Tech Developer",
                1,
                Set.of(
                        new Image(
                                null,
                                "https://estoesfrancia.com/wp-content/uploads/2024/04/paseo-por-el-sena-atardecer.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://estoesfrancia.com/wp-content/uploads/2024/04/paseo-por-el-sena-atardecer.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://estoesfrancia.com/wp-content/uploads/2024/04/paseo-por-el-sena-atardecer.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://estoesfrancia.com/wp-content/uploads/2024/04/paseo-por-el-sena-atardecer.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://estoesfrancia.com/wp-content/uploads/2024/04/paseo-por-el-sena-atardecer.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://estoesfrancia.com/wp-content/uploads/2024/04/paris-de-noche-rio-sena.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://aws-tiqets-cdn.imgix.net/images/content/e6865f6dc1754bf79f4f96aa5fab07bf.jpeg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://aws-tiqets-cdn.imgix.net/images/content/e6a2ad487dfe46d38df7015a6f0660ac.jpeg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://aws-tiqets-cdn.imgix.net/images/content/0a593f37fd484f949e6d384dfc9adf21.jpeg",
                                null,
                                null
                        )
                ),
                4L,
                List.of(1L, 4L),
                Set.of(
                        new AvailabilityRequestDto(
                                LocalDate.of(2025,3, 22)
                        )
                )
        );

        ProductRequestDto productRequestDto2 = new ProductRequestDto(
                "Tour gastronómico por el barrio del Trastevere",
                "Helados, pizzas, vinos… Deleita tú paladar con las delicias gastronómicas del Trastevere, el barrio bohemio de Roma. ¡Culminarás este tour con un gran sabor de boca!",
                30.55,
                10,
                "Calle Digital House 123, Certified Tech Developer",
                3,
                Set.of(
                        new Image(
                                null,
                                "https://cdn.getyourguide.com/img/tour/5c1fc320c7e514a45bb9683adff46e456d37899a02e9bc786f2445a1147874fd.jpg/145.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://cdn.getyourguide.com/img/tour/5c1fc320c7e514a45bb9683adff46e456d37899a02e9bc786f2445a1147874fd.jpg/145.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://cdn.getyourguide.com/img/tour/5c1fc320c7e514a45bb9683adff46e456d37899a02e9bc786f2445a1147874fd.jpg/145.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://cdn.getyourguide.com/img/tour/5c1fc320c7e514a45bb9683adff46e456d37899a02e9bc786f2445a1147874fd.jpg/145.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://cdn.getyourguide.com/img/tour/5c1fc320c7e514a45bb9683adff46e456d37899a02e9bc786f2445a1147874fd.jpg/145.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://cdn.getyourguide.com/img/tour/ab0d23a20d3b189aba0595b406eb3c6cf209f5d69092096233170224ffc4fc26.jpg/146.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://cdn.getyourguide.com/img/tour/959443350a3f56822b46a389b71ea314a04f2d2cfb22c7d32bb8c1396c2b7961.jpg/145.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://cdn.getyourguide.com/img/tour/29b7fb07fa33b693de1bec15e0135307232b4119c2238376d6c4ff9a91e15a25.jpeg/145.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://cdn.getyourguide.com/img/tour/ce5e7ee5006b4bb92d024c3ea069fb7115d08b7b92a4e4df316ca20939baa979.jpeg/145.jpg",
                                null,
                                null
                        )
                ),
                1L,
                List.of(1L, 4L),
                Set.of(
                        new AvailabilityRequestDto(
                                LocalDate.of(2025,3, 25)
                        )
                )
        );

        ProductRequestDto productRequestDto3 = new ProductRequestDto(
                "Machu Picchu - Tour de Día Completo en Tren Panorámico",
                "Machu Picchu,declarado patrimonio cultural de la humanidad por la UNESCO se considera uno de los lugares de interes mundial mas importantes que tiene que visitar en PERU.",
                200.00,
                15,
                "Calle Digital House 123, Certified Tech Developer",
                4,
                Set.of(
                        new Image(
                                null,
                                "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/10/19/21/1e.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/10/19/21/1e.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/10/19/21/1e.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/10/19/21/1e.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/10/19/21/1e.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/10/73/5c/e6.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/10/19/20/ee.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0a/84/77/7a.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0f/40/75/ea.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0f/40/75/e3.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/10/74/db/f9.jpg",
                                null,
                                null
                        )
                ),
                2L,
                List.of(5L),
                Set.of(
                        new AvailabilityRequestDto(
                                LocalDate.of(2025,3, 21)
                        )
                )
        );

        ProductRequestDto productRequestDto4 = new ProductRequestDto(
                "Snorkel en Cabo San Lucas",
                "¡Embárcate en una emocionante travesía con nuestro tour de snorkel en Cabo y visita al Arco del fin del mundo! Experimenta la emoción de tu vida mientras embarcaciones de alta velocidad te llevan al Arco, la Playa del Amor.",
                120.00,
                10,
                "Calle Digital House 123, Certified Tech Developer",
                5,
                Set.of(
                        new Image(
                                null,
                                "https://cdn.sanity.io/images/esqfj3od/production/f59bbcf10768d457b9111b12d140ed32b98ba8d3-2132x1200.webp",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://cdn.sanity.io/images/esqfj3od/production/f59bbcf10768d457b9111b12d140ed32b98ba8d3-2132x1200.webp",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://cdn.sanity.io/images/esqfj3od/production/f59bbcf10768d457b9111b12d140ed32b98ba8d3-2132x1200.webp",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://cdn.sanity.io/images/esqfj3od/production/f59bbcf10768d457b9111b12d140ed32b98ba8d3-2132x1200.webp",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://cdn.sanity.io/images/esqfj3od/production/f59bbcf10768d457b9111b12d140ed32b98ba8d3-2132x1200.webp",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://cdn.sanity.io/images/esqfj3od/production/18c315daeb2ec97c91d1d78e500998b1165d2d7e-1080x1630.webp",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://cdn.sanity.io/images/esqfj3od/production/76365353ee15691499f4568b6f348410c93f616b-2132x1200.webp",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://cdn.sanity.io/images/esqfj3od/production/49c73643286f7d5793233730980dc635a747be5e-1080x1630.webp",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://cdn.sanity.io/images/esqfj3od/production/53a20d929a2e010b8bee499dc50623b4a8aeea5d-1080x1630.webp",
                                null,
                                null
                        )
                ),
                3L,
                List.of(2L, 3L),
                Set.of(
                        new AvailabilityRequestDto(
                                LocalDate.of(2025,3, 28)
                        )
                )
        );

        ProductRequestDto productRequestDto5 = new ProductRequestDto(
                "Barrio de Asakusa",
                "La atmósfera del barrio de Asakusa te transportará al antiguo Tokyo. La atracción principal de esta zona es el Templo Sensoji, uno de los templos budistas más famosos de Japón.",
                180.00,
                30,
                "Calle Digital House 123, Certified Tech Developer",
                6,
                Set.of(
                        new Image(
                                null,
                                "https://guiadejapon.es/img/tokyo_templo-sensoji.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://guiadejapon.es/img/tokyo_templo-sensoji.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://guiadejapon.es/img/tokyo_templo-sensoji.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://guiadejapon.es/img/tokyo_templo-sensoji.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://guiadejapon.es/img/tokyo_templo-sensoji.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://japon-secreto.com/wp-content/uploads/2024/06/asakusa-sensoji02-1068x744.webp",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://japon-secreto.com/wp-content/uploads/2024/05/JP2008P1020897-jpg.webp",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/a0/f2/df/20180402-162713-largejpg.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/89/1f/53/caption.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/6d/df/3a/caption.jpg",
                                null,
                                null
                        )
                ),
                2L,
                List.of(5L),
                Set.of(
                        new AvailabilityRequestDto(
                                LocalDate.of(2025,4, 2)
                        )
                )
        );

        ProductRequestDto productRequestDto6 = new ProductRequestDto(
                "Tour en autobús de té por la tarde de Peppa Pig con audioguía",
                "Vea lo mejor de Londres mientras viaja a bordo de un icónico autobús Routemaster de dos pisos. Disfrute de una experiencia de té con temática vespertina de Peppa Pig con delicias tradicionales británicas y bebidas calientes ilimitadas.",
                90.00,
                25,
                "Calle Digital House 123, Certified Tech Developer",
                2,
                Set.of(
                        new Image(
                                null,
                                "https://cdn.getyourguide.com/img/tour/642ad74c100f4.jpeg/98.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://cdn.getyourguide.com/img/tour/642ad74c100f4.jpeg/98.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://cdn.getyourguide.com/img/tour/642ad74c100f4.jpeg/98.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://cdn.getyourguide.com/img/tour/642ad74c100f4.jpeg/98.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://cdn.getyourguide.com/img/tour/642ad74c100f4.jpeg/98.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://cdn.getyourguide.com/img/tour/642ad74c09c36.jpeg/145.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://cdn.getyourguide.com/img/tour/642ad74c04828.jpeg/145.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://cdn.getyourguide.com/img/tour/642ad6dab2d26.jpeg/145.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://cdn.getyourguide.com/img/review/47914883aacbacc765411f8ef6e0be2ad0a903f81138756e5a27f11b7d79675c.jpg/145.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://cdn.getyourguide.com/img/review/5b9038dceed78db9d95e8416c31967b835c082a9ff3c5cb5a1f8034cf67a3444.jpg/145.jpg",
                                null,
                                null
                        ),
                        new Image(
                                null,
                                "https://cdn.getyourguide.com/img/review/fe64d21cb185b6d46ab06a58688c969b131538ef9f89308bb7cd5a60f6512e1c.jpg/145.jpg",
                                null,
                                null
                        )
                ),
                4L,
                List.of(1L, 5L),
                Set.of(
                        new AvailabilityRequestDto(
                                LocalDate.of(2025,4, 1)
                        ),
                        new AvailabilityRequestDto(
                                LocalDate.of(2025,4, 4)
                        )
                )
        );

        productService.saveProduct(productRequestDto1);
        productService.saveProduct(productRequestDto2);
        productService.saveProduct(productRequestDto3);
        productService.saveProduct(productRequestDto4);
        productService.saveProduct(productRequestDto5);
        productService.saveProduct(productRequestDto6);
    }
}
