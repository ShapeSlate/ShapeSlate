package ShapeSlate.backend.controllers;

import ShapeSlate.backend.models.Board;
import ShapeSlate.backend.services.BoardService;
import ShapeSlate.backend.services.CanvasWhiteboardShapeOptionsService;
import ShapeSlate.backend.services.CanvasWhiteboardUpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class BoardController {
    @Autowired
    private BoardService boardService;
    @Autowired
    private CanvasWhiteboardUpdateService canvasWhiteboardUpdateService;
    @Autowired
    private CanvasWhiteboardShapeOptionsService canvasWhiteboardShapeOptionsService;

    @PostMapping("/board")
    public Board create(@RequestBody Board board) {
        return boardService.save(board);
    }

    @PutMapping("/board")
    public Board update(@RequestBody Board board) {
        return boardService.save(board);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @DeleteMapping("/board/{id}")
    public void delete(@PathVariable int id) {
        boardService.deleteById(id);
    }

    @GetMapping("/board")
    public List<Board> findAll() {
        return (List<Board>)boardService.findAll();
    }

    @GetMapping("/board/{id}")
    public Optional<Board> UserById(@PathVariable int id) {
        return boardService.findById(id);
    }
}
