package ShapeSlate.backend.controllers;

import ShapeSlate.backend.models.Message;
import ShapeSlate.backend.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping("/message")
    public Message create(@RequestBody Message message) {
        return messageService.save(message);
    }

//    @PutMapping("/slateroom")
//    public Message update(@RequestBody Message message) {
//        return messageService.save(message);
//    }

    @GetMapping("/message")
    public List<Message> findAll() {
        return (List<Message>) messageService.findAll();
    }
}
