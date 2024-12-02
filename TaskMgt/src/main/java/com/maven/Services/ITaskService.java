package com.maven.Services;

import com.maven.Model.Task;
import com.maven.Model.dtos.TaskDto;
import com.maven.exception.ResourceNotFoundException;

import java.util.List;
public interface ITaskService {
    Task addTask(Task task);
    List<TaskDto> getAllTask();

    List<TaskDto> getAllPendingTasks();

    List<TaskDto> getAllCompletedTasks();

    List<TaskDto> getTasksByProject(Long projectId);

    List<TaskDto> getTasksByStatus(String status);

    Task updateTask(Task task) throws ResourceNotFoundException;

    String deleteTask(Long taskId);
}
