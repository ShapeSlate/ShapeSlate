package ShapeSlate.backend.services;

import ShapeSlate.backend.models.CanvasWhiteboardUpdate;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CanvasWhiteboardUpdateService extends CrudRepository<CanvasWhiteboardUpdate, Integer> {
}
