package ShapeSlate.backend.services;

import ShapeSlate.backend.models.SlateRoomHasUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SlateRoomHasUserService extends CrudRepository<SlateRoomHasUser, Integer> {}
