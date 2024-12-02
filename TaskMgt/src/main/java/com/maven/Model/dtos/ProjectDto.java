package com.maven.Model.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDto {

    private Long id;
    private String projectName;
    private String category;
    private Long duration;
    private String projectManager;
    private String status;
    private String date;
    private  String startDate;
    private String endDate;
    private String[] teamMembers;
    private String description;

}
