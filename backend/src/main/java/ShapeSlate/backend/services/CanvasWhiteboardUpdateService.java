package ShapeSlate.backend.services;

import ShapeSlate.backend.models.Board;
import ShapeSlate.backend.models.CanvasWhiteboardUpdate;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CanvasWhiteboardUpdateService extends CrudRepository<CanvasWhiteboardUpdate, Integer> {
    @Query("select cu from CanvasWhiteboardUpdate cu where cu.boardUpdate = :boardUpdate")
    Iterable<CanvasWhiteboardUpdate> findByBoardId(@Param("boardUpdate") Board boardUpdate);
}
