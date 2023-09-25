package com.ssafy.economius.game.controller;

import com.ssafy.economius.game.dto.request.CalculateRequest;
import com.ssafy.economius.game.dto.request.EndTurnRequest;
import com.ssafy.economius.game.dto.request.GameJoinRequest;
import com.ssafy.economius.game.dto.request.GameStartRequest;
import com.ssafy.economius.game.dto.response.CalculateResponse;
import com.ssafy.economius.game.dto.response.GameJoinResponse;
import com.ssafy.economius.game.dto.response.GameStartResponse;
import com.ssafy.economius.game.entity.redis.Game;
import com.ssafy.economius.game.service.GameService;
import com.ssafy.economius.game.service.FinishTurnService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class GameController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
    private final GameService gameService;

    // todo 추후에 하나의 서비스로 통합 예정
    private final FinishTurnService finishTurnService;

    @MessageMapping(value = "/{roomId}/join")
    public void join(@DestinationVariable int roomId, GameJoinRequest gameJoinRequest) {
        GameJoinResponse gameJoinResponse = gameService.join(roomId, gameJoinRequest.getPlayer());

        Map<String, Object> headers = Map.of("success", true, "type", "join");
        template.convertAndSend("/sub/" + roomId, gameJoinResponse, headers);
    }

    @MessageMapping(value = "/{roomId}/start")
    public void start(@DestinationVariable int roomId, GameStartRequest gameStartRequest) {
        GameStartResponse gameStartResponse = gameService.start(roomId,
            gameStartRequest.getHostPlayer());

        Map<String, Object> headers = Map.of("success", true, "type", "start");
        template.convertAndSend("/sub/" + roomId, gameStartResponse, headers);
    }

    @MessageMapping(value = "/{roomId}/calculate")
    public void calculate(@DestinationVariable int roomId, CalculateRequest calculateRequest) {
        CalculateResponse calculateResponse = gameService.calculate(
            roomId, calculateRequest.getPlayer());

        Map<String, Object> headers = Map.of("success", true, "type", "calculate");
        template.convertAndSend("/sub/" + roomId, calculateResponse, headers);
    }


    @MessageMapping(value = "/{roomId}/finishTurn")
    public void finishTurn(@DestinationVariable int roomId){
        Game game = finishTurnService.finish(roomId);

        Map<String, Object> headers = Map.of("success", true, "type", "finishTurn");
        template.convertAndSend("/sub/" + roomId, game, headers);
    }
}
