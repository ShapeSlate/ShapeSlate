package ShapeSlate.backend.controllers;

import ShapeSlate.backend.models.Session;
import ShapeSlate.backend.models.User;
import ShapeSlate.backend.services.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class SessionController {
    @Autowired private SessionService sessionService;

    @PostMapping("/session")
    public Session create(@RequestBody Session session) {
        return sessionService.save(session);
    }

    @PutMapping("/session")
    public Session update(@RequestBody Session session) {
        return sessionService.save(session);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @DeleteMapping("/session/{id}")
    public void delete(@PathVariable int id) {
        sessionService.deleteById(id);
    }

    @GetMapping("/session")
    public List<Session> findAll() {
        return (List<Session>)sessionService.findAll();
    }

    @GetMapping("/session/{id}")
    public Optional<Session> SessionById(@PathVariable int id) {
        return sessionService.findById(id);
    }
}
