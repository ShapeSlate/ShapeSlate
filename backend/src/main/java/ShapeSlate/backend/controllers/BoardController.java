package ShapeSlate.backend.controllers;

import ShapeSlate.backend.models.Board;
import ShapeSlate.backend.models.CanvasWhiteboardShapeOptions;
import ShapeSlate.backend.models.CanvasWhiteboardUpdate;
import ShapeSlate.backend.services.BoardService;
import ShapeSlate.backend.services.CanvasWhiteboardShapeOptionsService;
import ShapeSlate.backend.services.CanvasWhiteboardUpdateService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
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
    public List<Board> save(@RequestBody String json) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
        List<Board> myBoard = Arrays.asList(mapper.readValue(json, Board[].class));

        for (Board aBoard : myBoard) {
            List<CanvasWhiteboardUpdate> theUpdates = aBoard.getCanvasWhiteboardUpdates();
            for (CanvasWhiteboardUpdate anUpdate : theUpdates) {
                CanvasWhiteboardShapeOptions shapeOptions = anUpdate.getSelectedShapeOptions();
                if (shapeOptions != null) {
                    canvasWhiteboardShapeOptionsService.save(shapeOptions);
                }
            }
            canvasWhiteboardUpdateService.saveAll(theUpdates);
        }
//        System.out.println(myBoard.get(0).getCanvasWhiteboardUpdates());

        return (List<Board>) boardService.saveAll(myBoard);
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
