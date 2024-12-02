package com.maven.Repository;

import com.maven.Model.AdminGroups;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface IAdminGroupsRepository extends JpaRepository<AdminGroups,Long> {
    AdminGroups getAdminGroupsById(Long id);
}
