package ShapeSlate.backend.controllers;



import ShapeSlate.backend.models.InputMessage;
import ShapeSlate.backend.models.OutputMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class OutputMessageController {

    @MessageMapping("/hello")
    @SendTo("/topic/chatlog")
    public OutputMessage displayInputMessageToOutput(InputMessage inputmessage) throws Exception {
        return new OutputMessage(HtmlUtils.htmlEscape(inputmessage.getUserTypedTextMessage()));
    }

}
