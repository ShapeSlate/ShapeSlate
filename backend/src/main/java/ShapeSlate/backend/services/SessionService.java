package ShapeSlate.backend.services;

import ShapeSlate.backend.models.Session;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionService extends CrudRepository<Session, Integer> {}
