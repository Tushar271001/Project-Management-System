package com.maven.Controller;

import com.maven.Model.Task;
import com.maven.Services.ITaskService;
import com.maven.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/task")
@CrossOrigin("*")
public class TaskController {

    @Autowired
    private ITaskService taskService;

    @PostMapping("/addTask")
    public ResponseEntity<?> addTask(@RequestBody Task task) {
        System.out.println(task);
        return ResponseEntity.ok(taskService.addTask(task));
    }

    @GetMapping("/getAllTask")
    public ResponseEntity<?> getAllTask() {
        return ResponseEntity.ok(taskService.getAllTask());
    }

    @GetMapping("/getAllPendingTasks")
    public ResponseEntity<?> getAllPendingTasks() {
        return ResponseEntity.ok(taskService.getAllPendingTasks());
    }

    @GetMapping("/getAllCompletedTasks")
    public ResponseEntity<?> getAllCompletedTasks() {
        return ResponseEntity.ok(taskService.getAllCompletedTasks());
    }

    @GetMapping("/getTasksByProject/{projectId}")
    public ResponseEntity<?> getTasksByProject(@PathVariable Long projectId) {
        return ResponseEntity.ok(taskService.getTasksByProject(projectId));
    }

    @GetMapping("/getTasksByStatus/{status}")
    public ResponseEntity<?> getTasksByStatus(@PathVariable String status) {
        return ResponseEntity.ok(taskService.getTasksByStatus(status));
    }

    @PatchMapping("/updateTask")
    public ResponseEntity<?> updateTask(@RequestBody Task task) throws ResourceNotFoundException {
        return ResponseEntity.ok(taskService.updateTask(task));
    }

    @DeleteMapping("/deleteTask/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable Long taskId) {
        return ResponseEntity.ok(taskService.deleteTask(taskId));
    }
}
