package com.maven.Controller;

import com.maven.Model.UserPermission;
import com.maven.Services.IPermissionService;
import com.maven.Model.dtos.PermissionDto;
import com.maven.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/permission")
@CrossOrigin("*")
public class PermissionController {

    @Autowired
    private IPermissionService permissionService;

    @PostMapping("/addPermissions")
    public ResponseEntity<?> setPermissions(@RequestBody UserPermission permission) {
        return ResponseEntity.ok(permissionService.setPermissions(permission));
    }

    @GetMapping("/getPermissionById/{id}")
    public ResponseEntity<?> getAllPermissions(@PathVariable Long id) {
        return ResponseEntity.ok(permissionService.getAllPermissionsByGroupId(id));
    }

    @PatchMapping("/updatePermissions")
    public ResponseEntity<?> updatePermission(@RequestBody PermissionDto permissionDto) throws ResourceNotFoundException {
        System.out.println(permissionDto);
        return ResponseEntity.ok(permissionService.updatePermissionsByPermissionId(permissionDto));
    }
}
