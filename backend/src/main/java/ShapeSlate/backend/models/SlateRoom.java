package ShapeSlate.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
public class SlateRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @NotNull
    String sessionName;

    @JsonManagedReference(value = "slateroom")
    @OneToMany(mappedBy = "slateRoom")
    List<SlateRoomHasUser> slateRoomHasUsers;

    public SlateRoom() {
    }

    public SlateRoom(int id, @NotNull String sessionName, List<SlateRoomHasUser> slateRoomHasUsers) {
        this.id = id;
        this.sessionName = sessionName;
        this.slateRoomHasUsers = slateRoomHasUsers;
    }

    public List<SlateRoomHasUser> getSlateRoomHasUsers() {
        return slateRoomHasUsers;
    }

    public void setSlateRoomHasUsers(List<SlateRoomHasUser> slateRoomHasUsers) {
        this.slateRoomHasUsers = slateRoomHasUsers;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSessionName() {
        return sessionName;
    }

    public void setSessionName(String sessionName) {
        this.sessionName = sessionName;
    }
}
