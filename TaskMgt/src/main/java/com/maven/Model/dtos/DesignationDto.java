package com.maven.Model.dtos;

import com.maven.Model.Category;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DesignationDto {

    private Long id;
    private String name;
    private String description;
    private String date;
    private String categoryName;
}
