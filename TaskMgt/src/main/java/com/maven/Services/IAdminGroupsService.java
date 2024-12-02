package com.maven.Services;

import com.maven.Model.AdminGroups;
import com.maven.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Set;

public interface IAdminGroupsService {
    AdminGroups createGroup(AdminGroups groups);
    AdminGroups getGroupById(Long id);
    Set<AdminGroups> getAllGroups();

    AdminGroups updateGroup(AdminGroups group) throws ResourceNotFoundException;

    String deleteGroup(Long groupId);
}
