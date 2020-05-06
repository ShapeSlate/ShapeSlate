package ShapeSlate.backend.controllers;

import ShapeSlate.backend.models.User;
import ShapeSlate.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public HttpStatus login(@RequestBody User user) {
        User myUser = userService.findByUsername(user.getName());
        if(myUser != null) {
            if(myUser.getPassword().equals(user.getPassword())){
                return HttpStatus.OK;
            }
            else {
                return HttpStatus.I_AM_A_TEAPOT;
            }
        }
        else {
            return HttpStatus.BAD_REQUEST;
        }
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.save(user);
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
