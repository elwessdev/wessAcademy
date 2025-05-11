package com.wessacademy.server2.service;

import com.wessacademy.server2.model.Favorite;
import com.wessacademy.server2.repository.FavoriteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class FavoriteService {
    public final FavoriteRepository favoriteRepository;

    public FavoriteService(FavoriteRepository favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }

    public List<Favorite> getFavorites() {
        return favoriteRepository.findAll();
    }

    public void addFavorite(Favorite favorite) {
        favoriteRepository.save(favorite);
    }

    public void deleteFavoriteById(String id) {
        favoriteRepository.deleteById(id);
    }
}
