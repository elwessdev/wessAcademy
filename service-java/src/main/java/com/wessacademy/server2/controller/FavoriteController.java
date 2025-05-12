package com.wessacademy.server2.controller;

import com.wessacademy.server2.model.Favorite;
import com.wessacademy.server2.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorite")
public class FavoriteController {

    private final FavoriteService favoriteService;

    @Autowired
    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @GetMapping("")
    public ResponseEntity<List<Favorite>> getFavorites() {
        return ResponseEntity.ok(favoriteService.getFavorites());
    }

    @PostMapping("")
    public ResponseEntity<String> addFavorite(@RequestBody Favorite favorite) {
        favoriteService.addFavorite(favorite);
        return ResponseEntity.ok("Favorite added successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFavoriteById(@PathVariable String id) {
        favoriteService.deleteFavoriteById(id);
        return ResponseEntity.ok("Favorite deleted successfully");
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> checkFavorite(@RequestParam String userId, @RequestParam String courseId) {
        boolean exists = favoriteService.existsByUserIdAndCourseId(userId, courseId);
        return ResponseEntity.ok(exists);
    }
}