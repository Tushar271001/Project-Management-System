package com.maven.Repository;

import com.maven.Model.Productivity;
import com.maven.Model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductivityRepository extends JpaRepository<Productivity,Long> {

    List<Productivity> findByStatus(String status);

    @Query("SELECT p FROM Productivity  p WHERE p.project= :project")
    List<Productivity> findProductivitiesByProject(@Param("project") Long project);
}
