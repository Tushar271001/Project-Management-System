package com.maven.Services.impl;

import com.maven.Model.UserPermission;
import com.maven.Repository.IPermissionRepository;
import com.maven.Services.IPermissionService;
import com.maven.Model.dtos.PermissionDto;
import com.maven.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PermissionServicesImpl implements IPermissionService {
    @Autowired
    private IPermissionRepository permissionRepository;

    @Override
    public UserPermission setPermissions(UserPermission permission) {
        return permissionRepository.save(permission);
    }

    @Override
    public List<UserPermission> getAllPermissionsByGroupId(Long id) {
        return permissionRepository.getAllByAdminGroupsId(id);
    }

    @Override
    public UserPermission updatePermissionsByPermissionId(PermissionDto permissionDto) throws ResourceNotFoundException {
        UserPermission userPermissionById = permissionRepository.getUserPermissionById(permissionDto.getId());


        if (userPermissionById == null) {
            throw new ResourceNotFoundException("UserPermission with ID " + permissionDto.getId() + " not found.");
        }
        if (permissionDto.getShowPermission() != null) {
            userPermissionById.setShowPermission(permissionDto.getShowPermission());
        }
        if (permissionDto.getCreatePermission() != null) {
            userPermissionById.setCreatePermission(permissionDto.getCreatePermission());
        }
        if (permissionDto.getEditPermission() != null) {
            userPermissionById.setEditPermission(permissionDto.getEditPermission());
        }
        if (permissionDto.getDeletePermission() != null) {
            userPermissionById.setDeletePermission(permissionDto.getDeletePermission());
        }
        return permissionRepository.save(userPermissionById);
    }
}
