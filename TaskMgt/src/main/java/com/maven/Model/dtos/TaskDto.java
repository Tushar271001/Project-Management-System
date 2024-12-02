package com.maven.Model.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskDto {

    private Long id;
    private String taskName;
    private String projectName;
    private Long duration;
    private String status;
    private String date;
    private  String startDate;
    private String endDate;
    private String[] teamMembers;

}
