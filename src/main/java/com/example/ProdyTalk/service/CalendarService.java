package com.example.ProdyTalk.service;

import com.example.ProdyTalk.vo.CalendarVO;
import com.example.ProdyTalk.vo.MyCalendarVO;

import java.util.Calendar;
import java.util.List;

public interface CalendarService {
    public List<Calendar> getCalendar(int room_id) throws Exception;
    public void addEvent(CalendarVO calendarVO);
    public int searchLast();
    public void editEvent(CalendarVO calendarVO);
    public void deleteEvent(CalendarVO calendarVO);

    public List<Calendar> getMyCalendar(String user_id) throws Exception;
    public int searchMyLast();
    public void addMyEvent(MyCalendarVO myCalendarVO);
    public void editMyEvent(MyCalendarVO myCalendarVO);
    public void deleteMyEvent(MyCalendarVO myCalendarVO);
}
