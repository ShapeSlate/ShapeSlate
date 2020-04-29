package ShapeSlate.backend.models;

import java.util.Comparator;

public class CanvasUpdateComparator implements Comparator<CanvasWhiteboardUpdate> {
    @Override
    public int compare(CanvasWhiteboardUpdate o1, CanvasWhiteboardUpdate o2) {
        return Integer.compare(o1.getId(), o2.getId());
    }
}
