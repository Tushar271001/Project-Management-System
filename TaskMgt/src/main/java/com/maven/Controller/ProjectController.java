package com.maven.Controller;

import com.maven.Model.Projects;
import com.maven.Services.IProjectService;
import com.maven.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/project")
@CrossOrigin("*")
public class ProjectController {

    @Autowired
    private IProjectService projectService;

    @PostMapping("/addProject")
    public ResponseEntity<?> addProject(@RequestBody Projects projects) {

        System.out.println(projects.getTeamMembers());
        System.out.println(projects.getCategory());
        return ResponseEntity.ok(projectService.addProject(projects));
    }

    @GetMapping("/getAllProjects")
    public ResponseEntity<?> getAllProject() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @GetMapping("/getProjectsByCategory/{categoryId}")
    public ResponseEntity<?> getProjectsByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(projectService.getProjectsByCategory(categoryId));
    }

    @GetMapping("/getProjectsByStatus/{status}")
    public ResponseEntity<?> getProjectsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(projectService.getProjectsByStatus(status));
    }

    @PatchMapping("/updateProject")
    public ResponseEntity<?> updateProject(@RequestBody Projects projects) throws ResourceNotFoundException {
      return ResponseEntity.ok(projectService.updateProject(projects));
    }

    @DeleteMapping("/deleteProject/{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable Long projectId){
        return ResponseEntity.ok(projectService.deleteProject(projectId));
    }
}
