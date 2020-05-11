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
    @JsonBackReference(value = "slateuser")
    @ManyToOne
    SlateUser slateUser;
    @JsonBackReference(value = "slateroom")
    @ManyToOne
    SlateRoom slateRoom;

    public SlateRoomHasUser() {
    }

    public SlateRoomHasUser(int id, @NotNull int sessionId, @NotNull int userId, SlateUser slateUser, SlateRoom slateRoom) {
        this.id = id;
        this.slateUser = slateUser;
        this.slateRoom = slateRoom;
    }

    public SlateUser getSlateUser() {
        return slateUser;
    }

    public void setSlateUser(SlateUser slateUser) {
        this.slateUser = slateUser;
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
