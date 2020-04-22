package ShapeSlate.backend.models;

public class CanvasWhiteboardShapeOptions {
    boolean shouldFillShape;
    String fillStyle;
    String strokeStyle;
    int lineWidth;
    String lineJoin;
    String lineCap;

    public CanvasWhiteboardShapeOptions() {
        this.shouldFillShape = false;
        this.fillStyle = null;
        this.strokeStyle = "rgba(0,0,0,1)";
        this.lineWidth = 2;
        this.lineJoin = "round";
        this.lineCap = "round";
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
