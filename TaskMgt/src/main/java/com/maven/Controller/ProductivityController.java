package com.maven.Controller;

import com.maven.Model.Productivity;
import com.maven.Services.IProductivityService;
import com.maven.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/productivity")
@CrossOrigin("*")
public class ProductivityController {

    @Autowired
    private IProductivityService productivityService;

    @PostMapping("/addProductivity")
    public ResponseEntity<?> addProductivities(@RequestBody Productivity productivity){
        return ResponseEntity.ok(productivityService.addProductivity(productivity));
    }

    @GetMapping("/getAllProductivities")
    public ResponseEntity<?> getAllProductivity() {
        return ResponseEntity.ok(productivityService.getAllProductivity());
    }

    @GetMapping("/getProductivitiesByProject/{projectId}")
    public ResponseEntity<?> getProductivitiesByProject(@PathVariable Long projectId) {
        return ResponseEntity.ok(productivityService.getProductivitiesByProject(projectId));
    }

    @GetMapping("/getProductivitiesByStatus/{status}")
    public ResponseEntity<?> getProductivitiesByStatus(@PathVariable String status) {
        return ResponseEntity.ok(productivityService.getProductivitiesByStatus(status));
    }

    @PatchMapping("/updateProductivity")
    public ResponseEntity<?> updateProductivity(@RequestBody Productivity productivity) throws ResourceNotFoundException {
       return ResponseEntity.ok(productivityService.updateProductivity(productivity));
    }

    @DeleteMapping("/deleteProductivity/{productivityId}")
    public ResponseEntity<?> deleteProductivity(@PathVariable Long productivityId){
         return ResponseEntity.ok(productivityService.deleteProductivity(productivityId));
    }
}
