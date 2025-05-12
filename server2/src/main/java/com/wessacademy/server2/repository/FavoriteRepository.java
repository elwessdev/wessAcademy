package com.wessacademy.server2.repository;

import com.wessacademy.server2.model.Favorite;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface FavoriteRepository extends MongoRepository<Favorite, String> {
    boolean existsByUserIdAndCourseId(String userId, String courseId);
}
