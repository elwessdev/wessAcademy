package com.wessacademy.server2.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "favorites")
@Data
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Favorite {
    @Id
    private String id;
    private String userId;
    private String courseId;
}