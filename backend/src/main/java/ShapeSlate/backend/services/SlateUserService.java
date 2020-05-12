package ShapeSlate.backend.services;

import ShapeSlate.backend.models.SlateUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SlateUserService extends CrudRepository<SlateUser, Integer> {
    public SlateUser findByUsername(String username);
}
