package ShapeSlate.backend.models.comparators;

import ShapeSlate.backend.models.CanvasWhiteboardUpdate;

import java.util.Comparator;

public class CanvasUpdateComparatorByUUID implements Comparator<CanvasWhiteboardUpdate> {
    @Override
    public int compare(CanvasWhiteboardUpdate o1, CanvasWhiteboardUpdate o2) {
        if (o1.getUUID().equals(o2.getUUID())) {
            return 0;
        }
        if (o1.getUUID() == null) {
            return -1;
        }
        if (o2.getUUID() == null) {
            return 1;
        }
        return o1.getUUID().compareTo(o2.getUUID());
    }
}
