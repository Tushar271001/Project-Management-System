package com.maven.Services;

import com.maven.Model.TeamMember;
import com.maven.Model.dtos.TeamMemberDto;
import com.maven.exception.ResourceNotFoundException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ITeamMemberService {
    TeamMember addTeamMember(TeamMember teamMember);

    List<TeamMemberDto> getAllTeamMember();

    TeamMember updateTeamMember(TeamMember teamMember) throws ResourceNotFoundException, IOException;

    String deleteTeamMember(Long teamMemberId);
}
