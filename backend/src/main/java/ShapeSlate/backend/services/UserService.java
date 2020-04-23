package ShapeSlate.backend.services;

import ShapeSlate.backend.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserService extends CrudRepository<User, Integer> {}
