package ShapeSlate.backend.controllers;

import ShapeSlate.backend.models.SlateRoom;
import ShapeSlate.backend.models.User;
import ShapeSlate.backend.services.SlateRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class SlateRoomController {
    @Autowired private SlateRoomService slateRoomService;

    @PostMapping("/enter")
    public ResponseEntity enter(@RequestBody SlateRoom slateRoom) {
        if(slateRoomService.findByRoomname(slateRoom.getRoomname()) != null){
            return new ResponseEntity(slateRoom, HttpStatus.OK);
        }
        else {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/create")
    public SlateRoom create(@RequestBody SlateRoom slateRoom) {
        return slateRoomService.save(slateRoom);
    }

    @PutMapping("/create")
    public SlateRoom update(@RequestBody SlateRoom slateRoom) {
        return slateRoomService.save(slateRoom);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @DeleteMapping("/slateroom/{id}")
    public void delete(@PathVariable int id) {
        slateRoomService.deleteById(id);
    }

    @GetMapping("/slateroom")
    public List<SlateRoom> findAll() {
        return (List<SlateRoom>) slateRoomService.findAll();
    }

    @GetMapping("/slateroom/{id}")
    public Optional<SlateRoom> SessionById(@PathVariable int id) {
        return slateRoomService.findById(id);
    }
}
