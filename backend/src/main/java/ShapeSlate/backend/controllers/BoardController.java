package ShapeSlate.backend.controllers;

import ShapeSlate.backend.models.*;
import ShapeSlate.backend.models.comparators.CanvasUpdateComparatorById;
import ShapeSlate.backend.models.comparators.CanvasUpdateComparatorByType;
import ShapeSlate.backend.services.BoardService;
import ShapeSlate.backend.services.CanvasWhiteboardShapeOptionsService;
import ShapeSlate.backend.services.CanvasWhiteboardUpdateService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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
            boardService.save(aBoard);
            List<CanvasWhiteboardUpdate> theUpdates = aBoard.getCanvasWhiteboardUpdates();
            if (theUpdates != null) {
                for (CanvasWhiteboardUpdate anUpdate : theUpdates) {
                    CanvasWhiteboardShapeOptions shapeOptions = anUpdate.getSelectedShapeOptions();
                    if (shapeOptions != null) {
                        canvasWhiteboardShapeOptionsService.save(shapeOptions);
                    }
                }
            }
            canvasWhiteboardUpdateService.saveAll(theUpdates);
        }
        return (List<Board>) boardService.saveAll(myBoard);
    }

    @PutMapping("/board")
    public Board update(@RequestBody Board board) {
        return boardService.save(board);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @DeleteMapping("/board/{id}")
    public void delete(@PathVariable int id) {
        System.out.println("Deleting board content for board id: "+id);
        // get current board
        Board myBoard = boardService.findById(id).orElse(null);
        // get all updates
        List<CanvasWhiteboardUpdate> updates = (List<CanvasWhiteboardUpdate>) canvasWhiteboardUpdateService.findByBoardId(myBoard);
        // and delete them
        if (updates != null) {
            for (CanvasWhiteboardUpdate anUpdate : updates) {
                CanvasWhiteboardShapeOptions shapeOptions = anUpdate.getSelectedShapeOptions();
                canvasWhiteboardUpdateService.delete(anUpdate);
                if (shapeOptions != null) {
                    canvasWhiteboardShapeOptionsService.delete(anUpdate.getSelectedShapeOptions());
                }
            }
        }
    }

    @GetMapping("/board")
    public List<Board> findAll() {
        return (List<Board>)boardService.findAll();
    }

    @GetMapping("/board/{id}")
    public Board BoardById(@PathVariable int id) {
        // BUG (probably); early termination of updateset when multiple people are drawing.
        // Too sad too bad that ng2-canvas-whiteboard NEEDS type 2 at the end of a changeset...

        Board myBoard = boardService.findById(id).orElse(null);
        if (myBoard != null) {
            List<CanvasWhiteboardUpdate> myUpdates = myBoard.getCanvasWhiteboardUpdates();
            if (myUpdates != null) {
                List<CanvasWhiteboardUpdate> mySortedUpdates = new ArrayList<>();

                // Sort by ID so that updates are sort of in the right order
                myUpdates.sort(new CanvasUpdateComparatorById());

                // Get unique UUIDs
                String lastUUID = "";
                Set<String> uniqueUUIDs = new HashSet<>();
                for (CanvasWhiteboardUpdate update : myUpdates) {
                    uniqueUUIDs.add(update.getUUID());
                    lastUUID = update.getUUID();
                }
                // grab set of updates for each UUID
                for (String UUID: uniqueUUIDs) {
                    List<CanvasWhiteboardUpdate> changeSet = new ArrayList<>();
                    for (CanvasWhiteboardUpdate update: myUpdates) {
                        if(update.getUUID().equals(UUID)) {
                            changeSet.add(update);
                        }
                    }
                    // sort the changeset by type
                    changeSet.sort(new CanvasUpdateComparatorByType());
                    List<CanvasWhiteboardUpdate> changeSetBegin = new ArrayList<>();
                    List<CanvasWhiteboardUpdate> changeSetInBetween = new ArrayList<>();
                    List<CanvasWhiteboardUpdate> changeSetEnd = new ArrayList<>();
                    for (CanvasWhiteboardUpdate update: changeSet) {
                        if(update.getType() == 0) {
                            changeSetBegin.add(update);
                        } else if (update.getType() == 1) {
                            changeSetInBetween.add(update);
                        } else if (update.getType() == 2) {
                            changeSetEnd.add(update);
                        }
                    }
                    changeSetBegin.sort(new CanvasUpdateComparatorById());
                    changeSetInBetween.sort(new CanvasUpdateComparatorById());
                    changeSetEnd.sort(new CanvasUpdateComparatorById());

                    if (!changeSetBegin.isEmpty()) {
                        boolean shouldAdd = true;

                        if (changeSetEnd.isEmpty()) {
                            CanvasWhiteboardUpdate endUpdate;
                            if (changeSetInBetween.isEmpty()) {
                                endUpdate = changeSetBegin.get(changeSetBegin.size()-1);
                            } else {
                                endUpdate = changeSetInBetween.get(changeSetInBetween.size()-1);
                            }

                            if (!endUpdate.getUUID().equals(lastUUID)) {
                                endUpdate.setType(2);
                                changeSetEnd.add(endUpdate);
                            } else {shouldAdd = false;}
                        }

                        if (shouldAdd) {
                            mySortedUpdates.addAll(changeSetBegin);
                            mySortedUpdates.addAll(changeSetInBetween);
                            mySortedUpdates.addAll(changeSetEnd);
                        }
                    }
                }
                myBoard.setCanvasWhiteboardUpdates(mySortedUpdates);
            }
        }

        return myBoard;
    }
}
