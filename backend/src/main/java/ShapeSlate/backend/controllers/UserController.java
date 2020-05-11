package ShapeSlate.backend.controllers;

import ShapeSlate.backend.models.User;
import ShapeSlate.backend.services.UserService;
import jdk.nashorn.internal.objects.NativeJSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class UserController {

    @Autowired private UserService userService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody User user) {
        User myUser = userService.findByUsername(user.getUsername());
        if(myUser != null) {
            if(myUser.getPassword().equals(user.getPassword())){
                return new ResponseEntity(user, HttpStatus.OK);
            }
            else {
                return new ResponseEntity(HttpStatus.UNAUTHORIZED);
            }
        }
        else {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        if (userService.findByUsername(user.getUsername()) == null){
            return userService.save(user);
        } else {
            throw new IllegalArgumentException();
        }
    }

    @PutMapping("/account")
    public User update(@RequestBody User user) {
        return userService.save(user);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @DeleteMapping("/account/{id}")
    public void delete(@PathVariable int id) {
        userService.deleteById(id);
    }

    @GetMapping("/account")
    public List<User> findAll() {
        return (List<User>)userService.findAll();
    }

    @GetMapping("/account/{id}")
    public Optional<User> UserById(@PathVariable int id) {
        return userService.findById(id);
    }
}
