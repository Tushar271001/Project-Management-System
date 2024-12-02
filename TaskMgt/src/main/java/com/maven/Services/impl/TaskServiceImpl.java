package com.maven.Services.impl;

import com.maven.Model.Projects;
import com.maven.Model.Task;
import com.maven.Model.TeamMember;
import com.maven.Model.dtos.TaskDto;
import com.maven.Repository.IProjectRepository;
import com.maven.Repository.ITaskRepository;
import com.maven.Repository.ITeamMemberRepository;
import com.maven.Services.ITaskService;
import com.maven.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service

public class TaskServiceImpl implements ITaskService {
    @Autowired
    private ITaskRepository taskRepository;

    @Autowired
    private IProjectRepository projectRepository;

    @Autowired
    private ITeamMemberRepository teamMemberRepository;

    @Override
    public Task addTask(Task task) {
        task.setDate(LocalDate.now());
        task.setStatus(task.getStatus().toLowerCase());
        return taskRepository.save(task);
    }

    @Override
    public List<TaskDto> getAllTask() {

        List<TaskDto> tasks = new ArrayList<>();
        List<String> teamMembers=new ArrayList<>();

        taskRepository.findAll().forEach(task -> {
            TaskDto taskDto = new TaskDto();


            taskDto.setId(task.getId());
            taskDto.setTaskName(task.getTaskName());

            Projects projects =projectRepository.findById(task.getProject()).get();
            taskDto.setProjectName(projects.getProjectName());
            taskDto.setDate(task.getDate().toString());
            taskDto.setStatus(task.getStatus());


            task.getTeamMembers().forEach(teamMember->{
                TeamMember fetchedTeamMember =teamMemberRepository.findById(teamMember.getId()).get();
                teamMembers.add(fetchedTeamMember.getName());
            });

            taskDto.setTeamMembers(teamMembers.toArray(new String[0]));
            taskDto.setStartDate(task.getStartDate().toString());
            taskDto.setEndDate(task.getEndDate().toString());
            long duration = Duration.between(task.getStartDate().atStartOfDay(), task.getEndDate().atStartOfDay()).toDays();

            taskDto.setDuration(duration);

            tasks.add(taskDto);
        });

        return tasks;
    }

    @Override
    public List<TaskDto> getAllPendingTasks() {
        List<TaskDto> tasks = new ArrayList<>();

        taskRepository.findByStatus("pending").forEach(task -> {
            TaskDto taskDto = new TaskDto();
            List<String> teamMembers=new ArrayList<>();
            taskDto.setId(task.getId());
            taskDto.setTaskName(task.getTaskName());
            Projects projects =projectRepository.findById(task.getProject()).get();
            taskDto.setProjectName(projects.getProjectName());

            taskDto.setStartDate(task.getStartDate().toString());
            taskDto.setEndDate(task.getEndDate().toString());
            long duration = Duration.between(task.getStartDate().atStartOfDay(), task.getEndDate().atStartOfDay()).toDays();
            taskDto.setDuration(duration);


            task.getTeamMembers().forEach(teamMember->{
                TeamMember fetchedTeamMember =teamMemberRepository.findById(teamMember.getId()).get();
                teamMembers.add(fetchedTeamMember.getName());
            });

            taskDto.setTeamMembers(teamMembers.toArray(new String[0]));

            taskDto.setStatus(task.getStatus());
            taskDto.setDate(task.getDate().toString());
            tasks.add(taskDto);
        });
        return tasks;
    }

    @Override
    public List<TaskDto> getAllCompletedTasks() {
        List<TaskDto> tasks = new ArrayList<>();

        taskRepository.findByStatus("completed").forEach(task -> {
            TaskDto taskDto = new TaskDto();
            List<String> teamMembers=new ArrayList<>();
            taskDto.setId(task.getId());
            taskDto.setTaskName(task.getTaskName());
            Projects projects =projectRepository.findById(task.getProject()).get();
            taskDto.setProjectName(projects.getProjectName());

            long duration = Duration.between(task.getStartDate().atStartOfDay(), task.getEndDate().atStartOfDay()).toDays();
            taskDto.setDuration(duration);


            task.getTeamMembers().forEach(teamMember->{
                TeamMember fetchedTeamMember =teamMemberRepository.findById(teamMember.getId()).get();
                teamMembers.add(fetchedTeamMember.getName());
            });

            taskDto.setTeamMembers(teamMembers.toArray(new String[0]));

            taskDto.setStatus(task.getStatus());
            taskDto.setDate(task.getDate().toString());
            tasks.add(taskDto);
        });
        return tasks;
    }

    @Override
    public List<TaskDto> getTasksByProject(Long projectId) {
        List<TaskDto> tasks = new ArrayList<>();
        taskRepository.findTasksByProject(projectId).forEach(task -> {
            TaskDto taskDto = new TaskDto();

            taskDto.setId(task.getId());
            taskDto.setTaskName(task.getTaskName());
            Projects projects =projectRepository.findById(task.getProject()).get();
            taskDto.setProjectName(projects.getProjectName());

            taskDto.setStartDate(task.getStartDate().toString());
            taskDto.setEndDate(task.getEndDate().toString());
            long duration = Duration.between(task.getStartDate().atStartOfDay(), task.getEndDate().atStartOfDay()).toDays();
            taskDto.setDuration(duration);

            taskDto.setStatus(task.getStatus());
            taskDto.setDate(task.getDate().toString());
            tasks.add(taskDto);
        });
        return tasks;
    }

    @Override
    public List<TaskDto> getTasksByStatus(String status) {
        List<TaskDto> tasks = new ArrayList<>();
        taskRepository.findByStatus(status.toLowerCase()).forEach(task -> {
            TaskDto taskDto = new TaskDto();

            taskDto.setId(task.getId());
            taskDto.setTaskName(task.getTaskName());
            Projects projects =projectRepository.findById(task.getProject()).get();
            taskDto.setProjectName(projects.getProjectName());

            taskDto.setStartDate(task.getStartDate().toString());
            taskDto.setEndDate(task.getEndDate().toString());
            long duration = Duration.between(task.getStartDate().atStartOfDay(), task.getEndDate().atStartOfDay()).toDays();
            taskDto.setDuration(duration);

            taskDto.setStatus(task.getStatus());
            taskDto.setDate(task.getDate().toString());
            tasks.add(taskDto);
        });
        return tasks;
    }

    @Override
    public Task updateTask(Task task) throws ResourceNotFoundException {
        Task existedTask=taskRepository.findById(task.getId()).orElseThrow(()->new ResourceNotFoundException("Task not present"));
        existedTask.setTaskName(task.getTaskName());
        existedTask.setProject(task.getProject());
        existedTask.setDate(task.getDate());
        existedTask.setDescription(task.getDescription());
        existedTask.setStatus(task.getStatus());
        existedTask.setStartDate(task.getStartDate());
        existedTask.setEndDate(task.getEndDate());
        return taskRepository.save(existedTask);

    }

    @Override
    public String deleteTask(Long taskId) {
        taskRepository.deleteById(taskId);
        if(taskRepository.findById(taskId).isEmpty()){
            return "Task deleted";
        }
        else {
            return "Task not deleted";
        }
    }
}
