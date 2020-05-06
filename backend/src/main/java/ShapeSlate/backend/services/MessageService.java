package ShapeSlate.backend.services;

import ShapeSlate.backend.models.Message;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageService extends CrudRepository<Message, Integer> {
}
