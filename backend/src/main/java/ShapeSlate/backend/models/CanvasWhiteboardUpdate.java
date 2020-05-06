package ShapeSlate.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

enum CanvasWhiteboardUpdateType {
    START, DRAG, STOP
}

@Entity
public class CanvasWhiteboardUpdate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    double x;
    double y;
    CanvasWhiteboardUpdateType type;
    String UUID;
    String selectedShape;
    @OneToOne
    CanvasWhiteboardShapeOptions selectedShapeOptions;
    // many canvaswhiteupdates in one board
    @JsonBackReference(value = "boardUpdate")
    @ManyToOne(targetEntity=Board.class)
    //    @ManyToOne(targetEntity=Board.class, cascade=CascadeType.ALL)
    Board boardUpdate;

    public CanvasWhiteboardUpdate() {
    }

    public CanvasWhiteboardUpdate(int id,
                                  double x,
                                  double y,
                                  CanvasWhiteboardUpdateType type,
                                  String UUID,
                                  String selectedShape,
                                  CanvasWhiteboardShapeOptions selectedShapeOptions,
                                  Board boardUpdate) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.type = type;
        this.UUID = UUID;
        this.selectedShape = selectedShape;
        this.selectedShapeOptions = selectedShapeOptions;
        this.boardUpdate = boardUpdate;
    }

    public Board getBoardUpdate() {
        return boardUpdate;
    }

    public void setBoardUpdate(Board boardUpdate) {
        this.boardUpdate = boardUpdate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public int getType() {
        switch(type) {
            case START:
                return 0;
            case DRAG:
                return 1;
            case STOP:
                return 2;
            default:
                System.out.println("Object with incorrect CanvasWhiteboardUpdateType! Error code 3");
        }
        return 3;
    }

    public void setType(int type) {
        switch(type) {
            case 0:
                this.type = CanvasWhiteboardUpdateType.START;
                break;
            case 1:
                this.type = CanvasWhiteboardUpdateType.DRAG;
                break;
            case 2:
                this.type = CanvasWhiteboardUpdateType.STOP;
                break;
            default:
                System.out.println("Object with incorrect CanvasWhiteboardUpdateType");
        }
    }

//    public void setType(CanvasWhiteboardUpdateType type) {
//        this.type = type;
//    }

    public String getUUID() {
        return UUID;
    }

    @JsonProperty("UUID")
    public void setUUID(String UUID) {
        this.UUID = UUID;
    }

    public String getSelectedShape() {
        return selectedShape;
    }

    public void setSelectedShape(String selectedShape) {
        this.selectedShape = selectedShape;
    }

    public CanvasWhiteboardShapeOptions getSelectedShapeOptions() {
        return selectedShapeOptions;
    }

    public void setSelectedShapeOptions(CanvasWhiteboardShapeOptions selectedShapeOptions) {
        this.selectedShapeOptions = selectedShapeOptions;
    }

    @Override
    public String toString() {
        return "CanvasWhiteboardUpdate{" +
                "id=" + id +
                ", x=" + x +
                ", y=" + y +
                ", type=" + type +
                ", UUID='" + UUID + '\'' +
                ", selectedShape='" + selectedShape + '\'' +
                ", selectedShapeOptions=" + selectedShapeOptions +
                ", boardUpdate=" + boardUpdate +
                '}';
    }
}

