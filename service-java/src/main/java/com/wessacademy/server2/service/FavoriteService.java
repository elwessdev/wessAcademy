package com.wessacademy.server2.service;

import com.wessacademy.server2.model.Favorite;
import com.wessacademy.server2.repository.FavoriteRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class FavoriteService {
    public final FavoriteRepository favoriteRepository;

    public FavoriteService(FavoriteRepository favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }

    @Cacheable("favorites")
    public List<Favorite> getFavorites() {
        return favoriteRepository.findAll();
    }

    @CacheEvict(value = {"favorites","favoritesByUser","favoriteCheck"}, allEntries = true)
    public void addFavorite(Favorite favorite) {
        favoriteRepository.save(favorite);
    }

    @CacheEvict(value = {"favorites","favoritesByUser","favoriteCheck"}, allEntries = true)
    public void deleteFavoriteById(String id) {
        favoriteRepository.deleteById(id);
    }

    @Cacheable(value = "favoriteCheck", key = "#userId+'-'+#courseId")
    public boolean existsByUserIdAndCourseId(String userId, String courseId) {
        return favoriteRepository.existsByUserIdAndCourseId(userId, courseId);
    }

    @Cacheable(value = "favoritesByUser", key = "#userId")
    public List<Favorite> getFavoritesByUserId(String userId) {
        return favoriteRepository.getFavoritesByUserId(userId);
    }
}
