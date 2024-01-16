package com.example.ProdyTalk.service;

import com.example.ProdyTalk.chat.vo.MessageVO;

import java.util.List;

public interface ChatService {
    //그룹채팅용
    public void insertMessage(MessageVO messageVO);
    public int searchLast();

    public List<MessageVO> getChatList(int conversation_id);

    //개인채팅용
    public int searchPersonalLast();
    public void insertPersonalMessage(MessageVO messageVO);
    public List<MessageVO> getPersonalChatList(int conversation_id);
}