package ShapeSlate.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

@Entity
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    // many boards in one slateroom
    @JsonBackReference(value = "board")
    @ManyToOne
    SlateRoom boardSlateRoom;
    // many canvaswhiteupdates in one board
    @JsonManagedReference(value = "boardUpdate")
    @OneToMany(mappedBy = "boardUpdate")
//    @OneToMany(targetEntity=CanvasWhiteboardUpdate.class, mappedBy = "boardUpdate",cascade={CascadeType.ALL},orphanRemoval=true)
    List<CanvasWhiteboardUpdate> canvasWhiteboardUpdates;

    public Board() {
    }

    public Board(int id, SlateRoom boardSlateRoom, List<CanvasWhiteboardUpdate> canvasWhiteboardUpdates) {
        this.id = id;
        this.boardSlateRoom = boardSlateRoom;
        this.canvasWhiteboardUpdates = canvasWhiteboardUpdates;
    }

    public List<CanvasWhiteboardUpdate> getCanvasWhiteboardUpdates() {
        return canvasWhiteboardUpdates;
    }

    public void setCanvasWhiteboardUpdates(List<CanvasWhiteboardUpdate> canvasWhiteboardUpdates) {
        this.canvasWhiteboardUpdates = canvasWhiteboardUpdates;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public SlateRoom getBoardSlateRoom() {
        return boardSlateRoom;
    }

    public void setBoardSlateRoom(SlateRoom boardSlateRoom) {
        this.boardSlateRoom = boardSlateRoom;
    }
}
