package com.dh.backend.service;

import com.dh.backend.model.Image;
import com.dh.backend.model.Product;
import com.dh.backend.repository.ImageRepository;
import com.dh.backend.repository.IProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ImageService {
    private final ImageRepository imageRepository;
    private final IProductRepository productRepository;

    public ImageService(ImageRepository imageRepository, IProductRepository productRepository) {
        this.imageRepository = imageRepository;
        this.productRepository = productRepository;
    }

    public Image saveImage(Long productId, String imageUrl, Integer displayOrder) {
        Optional<Product> productOptional = productRepository.findById(productId);

        if (productOptional.isEmpty()) {
            throw new RuntimeException("Product not found");
        }

        Image image = new Image();
        image.setProduct(productOptional.get());
        image.setImageUrl(imageUrl);
        image.setDisplayOrder(displayOrder);

        return imageRepository.save(image);
    }

    public List<Image> getImagesByProduct(Long productId) {
        return imageRepository.findByProductId(productId);
    }
}


