package ShapeSlate.backend.models.comparators;

import ShapeSlate.backend.models.CanvasWhiteboardUpdate;

import java.util.Comparator;

public class CanvasUpdateComparatorById implements Comparator<CanvasWhiteboardUpdate> {
    @Override
    public int compare(CanvasWhiteboardUpdate o1, CanvasWhiteboardUpdate o2) {
        return Integer.compare(o1.getId(), o2.getId());
    }
}
