package com.example.ProdyTalk.service;

import com.example.ProdyTalk.mapper.CalendarMapper;
import com.example.ProdyTalk.vo.CalendarVO;
import com.example.ProdyTalk.vo.MyCalendarVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService {
    private final CalendarMapper calendarMapper;

    @Override
    public List<Calendar> getCalendar(int room_id) throws Exception {
        return calendarMapper.getCalendar(room_id);
    }

    @Override
    public void addEvent(CalendarVO calendarVO) { calendarMapper.addEvent(calendarVO);}

    @Override
    public int searchLast() {
        return calendarMapper.searchLast();
    }

    @Override
    public void editEvent(CalendarVO calendarVO) {
        calendarMapper.editEvent(calendarVO);
    }

    @Override
    public void deleteEvent(CalendarVO calendarVO) {
        calendarMapper.deleteEvent(calendarVO);
    }

    @Override
    public List<Calendar> getMyCalendar(String user_id) throws Exception {
        return calendarMapper.getMyCalendar(user_id);
    }

    @Override
    public void addMyEvent(MyCalendarVO myCalendarVO) {
        calendarMapper.addMyEvent(myCalendarVO);
    }

    @Override
    public int searchMyLast() {
        return calendarMapper.searchMyLast();
    }

    @Override
    public void editMyEvent(MyCalendarVO myCalendarVO) {
        calendarMapper.editMyEvent(myCalendarVO);
    }

    @Override
    public void deleteMyEvent(MyCalendarVO myCalendarVO) {
        calendarMapper.deleteMyEvent(myCalendarVO);
    }
}