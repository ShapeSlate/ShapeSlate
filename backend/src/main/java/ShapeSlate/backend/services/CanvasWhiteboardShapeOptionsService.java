package ShapeSlate.backend.services;

import ShapeSlate.backend.models.CanvasWhiteboardShapeOptions;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CanvasWhiteboardShapeOptionsService extends CrudRepository<CanvasWhiteboardShapeOptions, Integer> {
}
