package com.maven.Controller;

import com.maven.Model.AdminGroups;
import com.maven.Model.UserPermission;
import com.maven.Services.IAdminGroupsService;
import com.maven.Services.IPermissionService;
import com.maven.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/group")
@CrossOrigin("*")
public class GroupController {

    @Autowired
    private IAdminGroupsService adminGroupsService;

    @Autowired
    private IPermissionService permissionService;

    @PostMapping("/addGroup")
    public ResponseEntity<?> createGroup(@RequestBody AdminGroups adminGroups){

        AdminGroups group = adminGroupsService.createGroup(adminGroups);
        Set<String> module_list = new HashSet<>();
        module_list.add("Admin");
        module_list.add("Admin Groups");
        module_list.add("Designations");
        module_list.add("Members");
        module_list.add("Categories");
        module_list.add("Project");
        module_list.add("Task");
        module_list.add("Productivities");
        module_list.add("Reports");
        module_list.add("Settings");
        module_list.forEach(m->{
            UserPermission p = new UserPermission();
            p.setModules(m);
            p.setShowPermission(Boolean.FALSE);
            p.setCreatePermission(Boolean.FALSE);
            p.setEditPermission(Boolean.FALSE);
            p.setDeletePermission(Boolean.FALSE);
            p.setAdminGroups(group);
            permissionService.setPermissions(p);
        });
        return ResponseEntity.ok(group);
    }

    @GetMapping("/getGroupById/{id}")
    public ResponseEntity<?> getGroup(@PathVariable Long id){
        return ResponseEntity.ok(adminGroupsService.getGroupById(id));
    }

    @GetMapping("/allGroups")
    public ResponseEntity<?> getAllGroup(){
        return ResponseEntity.ok(adminGroupsService.getAllGroups());
    }

    @PatchMapping("/updateGroup")
    public ResponseEntity<?> updateGroup(@RequestBody AdminGroups group) throws ResourceNotFoundException {
       return ResponseEntity.ok(adminGroupsService.updateGroup(group));
    }

    @DeleteMapping("/deleteGroup/{groupId}")
    public ResponseEntity<?> deleteGroup(@PathVariable Long groupId){
      return ResponseEntity.ok(adminGroupsService.deleteGroup(groupId));
    }

}
