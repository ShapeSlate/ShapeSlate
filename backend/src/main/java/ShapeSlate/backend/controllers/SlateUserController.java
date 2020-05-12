package ShapeSlate.backend.controllers;

import ShapeSlate.backend.models.SlateUser;
import ShapeSlate.backend.services.SlateUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class SlateUserController {

    @Autowired private SlateUserService slateUserService;

    @PostMapping("/login")
    public HttpStatus login(@RequestBody SlateUser slateUser) {
        SlateUser mySlateUser = slateUserService.findByName(slateUser.getName());
        if(mySlateUser != null) {
            if(mySlateUser.getPassword().equals(slateUser.getPassword())){
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
    public SlateUser register(@RequestBody SlateUser slateUser) {
        System.out.println(slateUser);
        return slateUserService.save(slateUser);
    }

//    @PutMapping("/account")
//    public SlateUser update(@RequestBody SlateUser slateUser) {
//        return slateUserService.save(slateUser);
//    }
//
//    @ResponseStatus(value = HttpStatus.OK)
//    @DeleteMapping("/account/{id}")
//    public void delete(@PathVariable int id) {
//        slateUserService.deleteById(id);
//    }
//
//    @GetMapping("/account")
//    public List<SlateUser> findAll() {
//        return (List<SlateUser>) slateUserService.findAll();
//    }
//
//    @GetMapping("/account/{id}")
//    public Optional<SlateUser> SlateUserById(@PathVariable int id) {
//        return slateUserService.findById(id);
//    }
}
