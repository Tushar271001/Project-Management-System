package com.maven.Controller;

import com.maven.Model.Category;
import com.maven.Services.ICategoryService;
import com.maven.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {

    @Autowired
    private ICategoryService categoryService;

    @PostMapping("/addCategory")
    public ResponseEntity<?> addCategory(@RequestBody Category category){
        return ResponseEntity.ok(categoryService.addCategory(category));
    }

    @GetMapping("/getAllCategories")
    public ResponseEntity<?> getAllCategories(){
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @DeleteMapping("/deleteCategory/{categoryId}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long categoryId){
         categoryService.deleteCategory(categoryId);
         return ResponseEntity.ok("category deleted successfully...!");
    }

    @PatchMapping("/updateCategory")
    public ResponseEntity<?> updateCategory(@RequestBody Category category) throws ResourceNotFoundException {

        return ResponseEntity.ok(categoryService.updateCategory(category));
    }
}
