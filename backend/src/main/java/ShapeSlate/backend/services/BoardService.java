package ShapeSlate.backend.services;

import ShapeSlate.backend.models.Board;
import ShapeSlate.backend.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardService extends CrudRepository<Board, Integer> {
}
