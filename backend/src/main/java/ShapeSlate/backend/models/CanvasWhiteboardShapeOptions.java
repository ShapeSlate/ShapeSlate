package ShapeSlate.backend.models;

import javax.persistence.*;

@Entity
public class CanvasWhiteboardShapeOptions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    boolean shouldFillShape;
    String fillStyle;
    String strokeStyle;
    int lineWidth;
    String lineJoin;
    String lineCap;
    @OneToOne
    CanvasWhiteboardUpdate canvasWhiteboardUpdate;

    public CanvasWhiteboardShapeOptions() {
        this.shouldFillShape = false;
        this.fillStyle = null;
        this.strokeStyle = "rgba(0,0,0,1)";
        this.lineWidth = 2;
        this.lineJoin = "round";
        this.lineCap = "round";
    }

    public CanvasWhiteboardShapeOptions(int id,
                                        boolean shouldFillShape,
                                        String fillStyle,
                                        String strokeStyle,
                                        int lineWidth,
                                        String lineJoin,
                                        String lineCap,
                                        CanvasWhiteboardUpdate canvasWhiteboardUpdate) {
        this.id = id;
        this.shouldFillShape = shouldFillShape;
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
        this.lineJoin = lineJoin;
        this.lineCap = lineCap;
        this.canvasWhiteboardUpdate = canvasWhiteboardUpdate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public CanvasWhiteboardUpdate getCanvasWhiteboardUpdate() {
        return canvasWhiteboardUpdate;
    }

    public void setCanvasWhiteboardUpdate(CanvasWhiteboardUpdate canvasWhiteboardUpdate) {
        this.canvasWhiteboardUpdate = canvasWhiteboardUpdate;
    }

    public boolean isShouldFillShape() {
        return shouldFillShape;
    }

    public void setShouldFillShape(boolean shouldFillShape) {
        this.shouldFillShape = shouldFillShape;
    }

    public String getFillStyle() {
        return fillStyle;
    }

    public void setFillStyle(String fillStyle) {
        this.fillStyle = fillStyle;
    }

    public String getStrokeStyle() {
        return strokeStyle;
    }

    public void setStrokeStyle(String strokeStyle) {
        this.strokeStyle = strokeStyle;
    }

    public int getLineWidth() {
        return lineWidth;
    }

    public void setLineWidth(int lineWidth) {
        this.lineWidth = lineWidth;
    }

    public String getLineJoin() {
        return lineJoin;
    }

    public void setLineJoin(String lineJoin) {
        this.lineJoin = lineJoin;
    }

    public String getLineCap() {
        return lineCap;
    }

    public void setLineCap(String lineCap) {
        this.lineCap = lineCap;
    }
}
