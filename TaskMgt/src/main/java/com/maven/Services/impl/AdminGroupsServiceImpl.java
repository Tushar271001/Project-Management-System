package com.maven.Services.impl;

import com.maven.Model.AdminGroups;
import com.maven.Repository.IAdminGroupsRepository;
import com.maven.Services.IAdminGroupsService;
import com.maven.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class AdminGroupsServiceImpl implements IAdminGroupsService {
    @Autowired
    private IAdminGroupsRepository groupsRepository;

    @Override
    public AdminGroups createGroup(AdminGroups groups) {
        groups.setCreatedDate(LocalDate.now().toString());
        return groupsRepository.save(groups);
    }

    @Override
    public AdminGroups getGroupById(Long id) {
        return groupsRepository.getAdminGroupsById(id);
    }

    @Override
    public Set<AdminGroups> getAllGroups() {
        List<AdminGroups> all = groupsRepository.findAll();
        return new HashSet<>(all);
    }

    @Override
    public AdminGroups updateGroup(AdminGroups group) throws ResourceNotFoundException {
        AdminGroups existedGroup=groupsRepository.findById(group.getId()).orElseThrow(()->new ResourceNotFoundException("Group is not found"));

        existedGroup.setGroup_name(group.getGroup_name());
        existedGroup.setDescription(group.getDescription());
        existedGroup.setCreatedDate(group.getCreatedDate());
        return groupsRepository.save(existedGroup);
    }

    @Override
    public String deleteGroup(Long groupId) {
        groupsRepository.deleteById(groupId);

        if(groupsRepository.findById(groupId).isEmpty()){
            return "Group deleted successfully";
        }
        else{
            return "Group deletion failed";
        }
    }
}
