package com.maven.Repository;

import com.maven.Model.Projects;
import com.maven.Model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ITaskRepository extends JpaRepository<Task,Long> {

    List<Task> findByStatus(String status);

    @Query("SELECT t FROM Task t WHERE t.project = :project")
    List<Task> findTasksByProject(@Param("project") Long project);
}
