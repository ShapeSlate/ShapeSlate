package ShapeSlate.backend.controllers;

import ShapeSlate.backend.models.User;
import ShapeSlate.backend.services.UserService;
import jdk.nashorn.internal.objects.NativeJSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
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
        System.out.println(BCrypt.checkpw(user.getPassword(), myUser.getPassword()));
        if(myUser != null) {
            if(BCrypt.checkpw(user.getPassword(), myUser.getPassword())){
                return new ResponseEntity(myUser, HttpStatus.OK);
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
            user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
            return userService.save(user);
        } else {
            throw new IllegalArgumentException();
        }
    }

//    @PutMapping("/account")
//    public User update(@RequestBody User user) {
//        return userService.save(user);
//    }
//
//    @ResponseStatus(value = HttpStatus.OK)
//    @DeleteMapping("/account/{id}")
//    public void delete(@PathVariable int id) {
//        userService.deleteById(id);
//    }
//
//    @GetMapping("/account")
//    public List<User> findAll() {
//        return (List<User>)userService.findAll();
//    }
//
//    @GetMapping("/account/{id}")
//    public Optional<User> UserById(@PathVariable int id) {
//        return userService.findById(id);
//    }
}
