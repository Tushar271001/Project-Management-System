package com.maven.Services;

import com.maven.Model.Projects;
import com.maven.Model.dtos.ProjectDto;
import com.maven.exception.ResourceNotFoundException;

import java.util.List;

public interface IProjectService {
    Projects addProject(Projects projects);

    List<ProjectDto> getAllProjects();

    List<ProjectDto> getProjectsByCategory(Long categoryId);

    List<ProjectDto> getProjectsByStatus(String status);

    Projects updateProject(Projects projects) throws ResourceNotFoundException;

    String deleteProject(Long projectId);
}
