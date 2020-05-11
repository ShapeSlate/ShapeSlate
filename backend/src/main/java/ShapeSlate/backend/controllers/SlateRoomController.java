package ShapeSlate.backend.controllers;

import ShapeSlate.backend.models.SlateRoom;
import ShapeSlate.backend.services.SlateRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class SlateRoomController {
    @Autowired private SlateRoomService slateRoomService;

    @PostMapping("/slateroom")
    public HttpStatus enter(@RequestBody SlateRoom slateRoom) {
        if(slateRoomService.findByName(slateRoom.getName()) != null){
            return HttpStatus.OK;
        }
        else {
            return HttpStatus.I_AM_A_TEAPOT;
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
