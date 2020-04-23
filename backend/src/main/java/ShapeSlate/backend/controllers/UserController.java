package ShapeSlate.backend.controllers;

import ShapeSlate.backend.models.User;
import ShapeSlate.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class UserController {

    @Autowired private UserService userService;

    @PostMapping("/user")
    public User create(@RequestBody User user) {
        return userService.save(user);
    }

    @PutMapping("/user")
    public User update(@RequestBody User user) {
        return userService.save(user);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @DeleteMapping("/user/{id}")
    public void delete(@PathVariable int id) {
        userService.deleteById(id);
    }

    @GetMapping("/user")
    public List<User> findAll() {
        return (List<User>)userService.findAll();
    }

    @GetMapping("/user/{id}")
    public Optional<User> UserById(@PathVariable int id) {
        return userService.findById(id);
    }
}
