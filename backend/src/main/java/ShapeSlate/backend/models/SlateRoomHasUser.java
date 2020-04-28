package ShapeSlate.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class SlateRoomHasUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    // many slaterooms can have many slaterooms (junction table uses class SlateRoomHasUser)
    @JsonBackReference(value = "user")
    @ManyToOne
    User user;
    @JsonBackReference(value = "slateroom")
    @ManyToOne
    SlateRoom slateRoom;

    public SlateRoomHasUser() {
    }

    public SlateRoomHasUser(int id, @NotNull int sessionId, @NotNull int userId, User user, SlateRoom slateRoom) {
        this.id = id;
        this.user = user;
        this.slateRoom = slateRoom;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public SlateRoom getSlateRoom() {
        return slateRoom;
    }

    public void setSlateRoom(SlateRoom slateRoom) {
        this.slateRoom = slateRoom;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
