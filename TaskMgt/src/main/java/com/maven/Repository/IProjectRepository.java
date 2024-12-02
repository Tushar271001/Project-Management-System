package com.maven.Repository;

import com.maven.Model.Projects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProjectRepository extends JpaRepository<Projects,Long> {

    @Query("SELECT p FROM Projects p WHERE p.category = :category")
    List<Projects> findProjectsByCategory(@Param("category") Long category);

    List<Projects> findByStatus(String status);
}
