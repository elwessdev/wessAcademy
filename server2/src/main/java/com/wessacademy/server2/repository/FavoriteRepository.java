package com.wessacademy.server2.repository;

import com.wessacademy.server2.model.Favorite;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.FluentQuery;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

public interface FavoriteRepository extends MongoRepository<Favorite, String> {
    boolean existsByUserIdAndCourseId(String userId, String courseId);
}
