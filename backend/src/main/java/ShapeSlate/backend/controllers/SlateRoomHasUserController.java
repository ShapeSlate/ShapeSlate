package ShapeSlate.backend.controllers;

import ShapeSlate.backend.models.SlateRoomHasUser;
import ShapeSlate.backend.services.SlateRoomHasUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class SlateRoomHasUserController {
    @Autowired private SlateRoomHasUserService slateRoomHasUserService;

    @PostMapping("/slateroomhasuser")
    public SlateRoomHasUser create(@RequestBody SlateRoomHasUser slateRoomHasUser) {
        return slateRoomHasUserService.save(slateRoomHasUser);
    }

    @PutMapping("/slateroomhasuser")
    public SlateRoomHasUser update(@RequestBody SlateRoomHasUser slateRoomHasUser) {
        return slateRoomHasUserService.save(slateRoomHasUser);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @DeleteMapping("/slateroomhasuser/{id}")
    public void delete(@PathVariable int id) {
        slateRoomHasUserService.deleteById(id);
    }

    @GetMapping("/slateroomhasuser")
    public List<SlateRoomHasUser> findAll() {
        return (List<SlateRoomHasUser>) slateRoomHasUserService.findAll();
    }

    @GetMapping("/slateroomhasuser/{id}")
    public Optional<SlateRoomHasUser> SessionById(@PathVariable int id) {
        return slateRoomHasUserService.findById(id);
    }
}
