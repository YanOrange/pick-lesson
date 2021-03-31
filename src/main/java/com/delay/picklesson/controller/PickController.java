package com.delay.picklesson.controller;

import com.delay.picklesson.entity.LessonClass;
import com.delay.picklesson.entity.UserLesson;
import com.delay.picklesson.service.LessonClassService;
import com.delay.picklesson.service.UserLessonService;
import com.delay.picklesson.utils.ExecuteResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.user.UserRegistryMessageHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.List;

/**
 * @Author 闫金柱
 * @create 2021-3-31 19:03
 */
public class PickController extends BaseController{

    @Autowired
    LessonClassService lessonClassService;
    @Autowired
    UserLessonService userLessonService;

    /**
     * 选择课程到自选
     * @param pickId
     * @return
     */
    @RequestMapping("pickLesson")
    @ResponseBody
    public synchronized ExecuteResult pickLesson(Integer pickId){

        UserLesson userLesson = userLessonService.findById(pickId).orElse(null);
        Integer id = userLesson.getLessonClass().getId();
        userLessonService.deleteById(pickId);
        LessonClass lessonClass = lessonClassService.findById(id).orElse(null);
        lessonClass.setNum(lessonClass.getNum()+1);
        lessonClassService.saveAndFlush(lessonClass);
        return ExecuteResult.ok();
    }

    /**
     * 退课
     * @param lessonClassId
     * @return
     */
    @RequestMapping("backLesson")
    @ResponseBody
    public synchronized ExecuteResult backLesson(Integer lessonClassId){

        LessonClass lessonClass = lessonClassService.findById(lessonClassId).orElse(null);

        UserLesson userLesson = new UserLesson();
        userLesson.setLesson(lessonClass.getLesson());
        userLesson.setLessonClass(lessonClass);
        userLesson.setUser(getUser());
        userLesson.setCreateTime(new Date());

        userLessonService.saveAndFlush(userLesson);
        lessonClass.setNum(lessonClass.getNum() - 1);
        lessonClassService.saveAndFlush(lessonClass);
        return ExecuteResult.ok();
    }

}
