package ShapeSlate.backend.models;

enum CanvasWhiteboardUpdateType {
    START, DRAG, STOP
}

public class CanvasWhiteboardUpdate {
    double x;
    double y;
    CanvasWhiteboardUpdateType type;
    String UUID;
    String selectedShape;
    CanvasWhiteboardShapeOptions selectedShapeOptions;

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
            case 1:
                this.type = CanvasWhiteboardUpdateType.DRAG;
            case 2:
                this.type = CanvasWhiteboardUpdateType.STOP;
            default:
                System.out.println("Object with incorrect CanvasWhiteboardUpdateType");
        }
    }

    public String getUUID() {
        return UUID;
    }

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
}

