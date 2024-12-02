package com.maven.Repository;

import com.maven.Model.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface ITeamMemberRepository extends JpaRepository<TeamMember,Long> {
}
