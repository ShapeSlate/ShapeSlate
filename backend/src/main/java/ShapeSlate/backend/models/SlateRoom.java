package ShapeSlate.backend.models;

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
    String roomname;

    // many slaterooms can have many slaterooms (junction table uses class SlateRoomHasUser)
    @JsonManagedReference(value = "slateroom")
    @OneToMany(mappedBy = "slateRoom")
    List<SlateRoomHasUser> slateRoomHasUsers;
    // many boards in one slateroom
    @JsonManagedReference(value = "board")
    @OneToMany(mappedBy = "boardSlateRoom")
    List<Board> boards;

    public SlateRoom() {
    }

    public SlateRoom(int id, @NotNull String roomname, List<SlateRoomHasUser> slateRoomHasUsers, List<Board> boards) {
        this.id = id;
        this.roomname = roomname;
        this.slateRoomHasUsers = slateRoomHasUsers;
        this.boards = boards;
    }

    public List<Board> getBoards() {
        return boards;
    }

    public void setBoards(List<Board> boards) {
        this.boards = boards;
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

    public String getRoomname() {
        return roomname;
    }

    public void setRoomname(String roomname) {
        this.roomname = roomname;
    }
}
