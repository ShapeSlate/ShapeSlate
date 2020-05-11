package ShapeSlate.backend.services;

import ShapeSlate.backend.models.SlateRoom;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SlateRoomService extends CrudRepository<SlateRoom, Integer> {
    public SlateRoom findByName(String name);
}