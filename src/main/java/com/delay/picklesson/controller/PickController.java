package com.delay.picklesson.controller;

import com.delay.picklesson.entity.LessonClass;
import com.delay.picklesson.entity.UserLesson;
import com.delay.picklesson.service.LessonClassService;
import com.delay.picklesson.service.UserLessonService;
import com.delay.picklesson.utils.ExecuteResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.user.UserRegistryMessageHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.List;

/**
 * @Author 闫金柱
 * @create 2021-3-31 19:03
 */
@Controller
@RequestMapping("pick")
public class PickController extends BaseController {

    @Autowired
    LessonClassService lessonClassService;
    @Autowired
    UserLessonService userLessonService;

    /**
     * 选择课程到自选
     *
     * @param lessonClassId
     * @return
     */
    @RequestMapping("pickLesson")
    @ResponseBody
    public synchronized ExecuteResult pickLesson(Integer lessonClassId) {
        UserLesson userLesson1 = userLessonService.findByLessonClassIdAndUserId(lessonClassId,getUser().getId());
        if(userLesson1!=null){
            return ExecuteResult.fail(1,"您已选取该课程，请勿重复选取");
        }

        LessonClass lessonClass = lessonClassService.findById(lessonClassId).orElse(null);
        if(lessonClass.getNum().equals(0)){
            return ExecuteResult.fail(1,"剩余坐席不足，请选择其他课程");
        }
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

    /**
     * 退课
     *
     * @param pickId
     * @return
     */
    @RequestMapping("backLesson")
    @ResponseBody
    public synchronized ExecuteResult backLesson(Integer pickId) {
        UserLesson userLesson = userLessonService.findById(pickId).orElse(null);
        Integer id = userLesson.getLessonClass().getId();
        userLessonService.deleteById(pickId);
        LessonClass lessonClass = lessonClassService.findById(id).orElse(null);
        lessonClass.setNum(lessonClass.getNum() + 1);
        lessonClassService.saveAndFlush(lessonClass);
        return ExecuteResult.ok();

    }

    /**
     * 查找全部课程通过用户
     * @return
     */
    @RequestMapping("findAllByUserId")
    @ResponseBody
    public ExecuteResult findAllByUserId() {
        Integer id = getUser().getId();
        List<UserLesson> list = userLessonService.findByUserId(id);
        return ExecuteResult.ok(list);

    }




}
