package com.maven.Services.impl;

import com.maven.Model.Category;
import com.maven.Model.Projects;
import com.maven.Model.TeamMember;
import com.maven.Repository.ICategoryRepository;
import com.maven.Repository.IProjectRepository;
import com.maven.Repository.ITeamMemberRepository;
import com.maven.Services.IProjectService;
import com.maven.Model.dtos.ProjectDto;
import com.maven.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectImpl implements IProjectService {
    @Autowired
    private IProjectRepository projectRepository;

    @Autowired
    private ICategoryRepository categoryRepository;

    @Autowired
    private ITeamMemberRepository teamMemberRepository;

 @Override
    public Projects addProject(Projects projects) {
        projects.setDate(LocalDate.now().toString());
        projects.setTeamMembers(projects.getTeamMembers());
        projects.setStatus(projects.getStatus().toLowerCase());
        return projectRepository.save(projects);
    }

    @Override
    public List<ProjectDto> getAllProjects() {
         List<ProjectDto> projects=new ArrayList<>();

         projectRepository.findAll().forEach(project -> {
             List<String> teamMembers=new ArrayList<>();
             ProjectDto projectDto=new ProjectDto();
             projectDto.setId(project.getId());
             projectDto.setProjectName(project.getProjectName());
             projectDto.setProjectManager(project.getProjectManager());
             projectDto.setDate(project.getDate());
             projectDto.setStatus(project.getStatus());

             project.getTeamMembers().forEach(teamMember->{
                 TeamMember fetchedTeamMember =teamMemberRepository.findById(teamMember.getId()).get();
                 teamMembers.add(fetchedTeamMember.getName());
             });
             projectDto.setTeamMembers(teamMembers.toArray(new String[0]));
             projectDto.setDescription(project.getDescription());

             Category category=categoryRepository.findById(project.getCategory()).get();

             projectDto.setCategory(category.getName());

             projectDto.setStartDate(project.getStartDate().toString());
             projectDto.setEndDate(project.getEndDate().toString());
             long duration = Duration.between(project.getStartDate().atStartOfDay(), project.getEndDate().atStartOfDay()).toDays();

             projectDto.setDuration(duration);

             projects.add(projectDto);
         });

         return projects;
    }

    @Override
    public List<ProjectDto> getProjectsByCategory(Long categoryId) {

        List<ProjectDto> projects=new ArrayList<>();
        List<String> teamMembers=new ArrayList<>();
        projectRepository.findProjectsByCategory(categoryId).forEach(project->{
            ProjectDto projectDto=new ProjectDto();
            projectDto.setId(project.getId());
            projectDto.setProjectName(project.getProjectName());
            projectDto.setProjectManager(project.getProjectManager());
            projectDto.setDate(project.getDate());
            projectDto.setStatus(project.getStatus());
            project.getTeamMembers().forEach(teamMember->{
                TeamMember fetchedTeamMember =teamMemberRepository.findById(teamMember.getId()).get();
                teamMembers.add(fetchedTeamMember.getName());
            });
            projectDto.setTeamMembers(teamMembers.toArray(new String[0]));
            projectDto.setDescription(project.getDescription());
            projectDto.setStartDate(project.getStartDate().toString());
            projectDto.setEndDate(project.getEndDate().toString());
            long duration = Duration.between(project.getStartDate().atStartOfDay(), project.getEndDate().atStartOfDay()).toDays();
            projectDto.setDuration(duration);

            Category category=categoryRepository.findById(project.getCategory()).get();
            projectDto.setCategory(category.getName());

            projects.add(projectDto);
        } );

        return projects;
    }

    @Override
    public List<ProjectDto> getProjectsByStatus(String status) {
        List<ProjectDto> projects=new ArrayList<>();
        List<String> teamMembers=new ArrayList<>();
        projectRepository.findByStatus(status.toLowerCase()).forEach(project -> {
            ProjectDto projectDto=new ProjectDto();
            project.getTeamMembers().forEach(teamMember->{
                TeamMember fetchedTeamMember =teamMemberRepository.findById(teamMember.getId()).get();
                teamMembers.add(fetchedTeamMember.getName());
            });
            projectDto.setTeamMembers(teamMembers.toArray(new String[0]));
            projectDto.setDescription(project.getDescription());
            projectDto.setId(project.getId());
            projectDto.setProjectName(project.getProjectName());
            projectDto.setProjectManager(project.getProjectManager());
            projectDto.setDate(project.getDate());
            projectDto.setStatus(project.getStatus());
            projectDto.setStartDate(project.getStartDate().toString());
            projectDto.setEndDate(project.getEndDate().toString());
            long duration = Duration.between(project.getStartDate().atStartOfDay(), project.getEndDate().atStartOfDay()).toDays();
            projectDto.setDuration(duration);

            Category category=categoryRepository.findById(project.getCategory()).get();
            projectDto.setCategory(category.getName());

            projects.add(projectDto);
        });

        return  projects;
    }

    @Override
    public Projects updateProject(Projects projects) throws ResourceNotFoundException {
        Projects existedProject=projectRepository.findById(projects.getId()).orElseThrow(
                ()->new ResourceNotFoundException("Project not present"));

        existedProject.setProjectName(projects.getProjectName());
        existedProject.setProjectManager(projects.getProjectManager());
        existedProject.setDescription(existedProject.getDescription());
        existedProject.setDate(projects.getDate());
        existedProject.setTeamMembers(existedProject.getTeamMembers());
        existedProject.setCategory(projects.getCategory());
        existedProject.setStartDate(projects.getStartDate());
        existedProject.setEndDate(projects.getEndDate());
        existedProject.setStatus(projects.getStatus());

        return projectRepository.save(projects);
    }

    @Override
    public String deleteProject(Long projectId) {
        projectRepository.deleteById(projectId);

        if(projectRepository.findById(projectId).isEmpty()){
            return "Project deleted";
        }
        else{
            return "Project not deleted";
        }
    }
}
