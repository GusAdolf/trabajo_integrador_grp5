package com.xplora.backend.controller;

import com.xplora.backend.entity.Image;
import com.xplora.backend.service.implementation.ImageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/images")
public class ImageController {

    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/{productId}/upload")
    public ResponseEntity<?> uploadImage(@PathVariable Long productId, @RequestBody Map<String, Object> payload) {
        String imageUrl = (String) payload.get("imageUrl");
        Integer displayOrder = (Integer) payload.get("displayOrder");

        if (imageUrl == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Image URL is required");
        }

        Image image = imageService.saveImage(productId, imageUrl, displayOrder);
        return ResponseEntity.status(HttpStatus.CREATED).body(image);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<List<Image>> getImagesByProduct(@PathVariable Long productId) {
        List<Image> images = imageService.getImagesByProduct(productId);

        if (images.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok(images);
    }
}



