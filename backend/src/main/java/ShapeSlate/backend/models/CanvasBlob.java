package ShapeSlate.backend.models;

import java.util.List;

public class CanvasBlob {
    int id;
    List<CanvasWhiteboardUpdate> updates;
    int session_id;

    public CanvasBlob() {
    }

    public CanvasBlob(int id, List<CanvasWhiteboardUpdate> updates, int session_id) {
        this.id = id;
        this.updates = updates;
        this.session_id = session_id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<CanvasWhiteboardUpdate> getUpdates() {
        return updates;
    }

    public void setUpdates(List<CanvasWhiteboardUpdate> updates) {
        this.updates = updates;
    }

    public void addUpdates(CanvasWhiteboardUpdate update) {
        this.updates.add(update);
    }

    public int getSession_id() {
        return session_id;
    }

    public void setSession_id(int session_id) {
        this.session_id = session_id;
    }
}
