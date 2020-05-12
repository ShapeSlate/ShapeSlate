package ShapeSlate.backend.controllers;

import ShapeSlate.backend.models.SlateUser;
import ShapeSlate.backend.services.SlateUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class SlateUserController {

    @Autowired private SlateUserService slateUserService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody SlateUser slateUser) {
        SlateUser myUser = slateUserService.findByUsername(slateUser.getUsername());
        System.out.println(BCrypt.checkpw(slateUser.getPassword(), myUser.getPassword()));
        if(myUser != null) {
            if(BCrypt.checkpw(slateUser.getPassword(), myUser.getPassword())){
                return new ResponseEntity(myUser, HttpStatus.OK);
            }
            else {
                return new ResponseEntity(HttpStatus.I_AM_A_TEAPOT);
            }
        }
        else {
            return new ResponseEntity(HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @PostMapping("/register")
    public SlateUser register(@RequestBody SlateUser slateUser) {
        if (slateUserService.findByUsername(slateUser.getUsername()) == null){
            slateUser.setPassword(BCrypt.hashpw(slateUser.getPassword(), BCrypt.gensalt()));
            return slateUserService.save(slateUser);
        } else {
            throw new IllegalArgumentException();
        }
    }
}
