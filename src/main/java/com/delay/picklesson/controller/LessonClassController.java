package com.delay.picklesson.controller;

import com.delay.picklesson.entity.LessonClass;
import com.delay.picklesson.entity.Task;
import com.delay.picklesson.entity.User;
import com.delay.picklesson.service.LessonClassService;
import com.delay.picklesson.service.TaskService;
import com.delay.picklesson.service.UserLessonService;
import com.delay.picklesson.utils.ExecuteResult;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.List;

/**
 * @Author 闫金柱
 * @create 2021-3-30 17:32
 */
@Controller
@RequestMapping("lessonClass")
public class LessonClassController extends BaseController {

    @Autowired
    LessonClassService lessonClassService;
    @Autowired
    UserLessonService userLessonService;
    @Autowired
    TaskService taskService;

    /**
     * 删除课程表
     *
     * @param ids
     * @return
     */
    @RequestMapping("delete")
    @ResponseBody
    public ExecuteResult delete(@RequestBody List<Integer> ids) {
        if (CollectionUtils.isEmpty(ids)) {
            return ExecuteResult.fail(1, "未选择一列");
        }
        ids.stream().forEach(o -> {
            userLessonService.deleteByLessonClassId(o);
            lessonClassService.deleteById(o);
        });
        return ExecuteResult.ok();
    }

    /**
     * 添加课程
     *
     * @return
     */
    @RequestMapping("add")
    @ResponseBody
    public ExecuteResult add(@RequestBody LessonClass lessonClass) {
        lessonClass.setCreateTime(new Date());
        lessonClassService.saveAndFlush(lessonClass);
        return ExecuteResult.ok();
    }

    /**
     * 根据学期查找课程
     *
     * @param semesterId
     * @return
     */
    @RequestMapping("findAllBySemesterId")
    @ResponseBody
    public ExecuteResult findAllBySemesterId(Integer semesterId) {

        List<LessonClass> list;
        User user = getUser();
        if (user.getStatus().equals(0)) {//学生，执行定时任务判断
            Task task = taskService.findBySemesterId(semesterId);
            if (task != null) {
                Date now = new Date();
                if (task.getTaskTime().getTime() <= now.getTime() && task.getEndTime().getTime() > now.getTime()) {
                    list = lessonClassService.findAllBySemesterId(semesterId);
                    return ExecuteResult.ok(list);
                }else{
                    return ExecuteResult.fail(1,"未到选课时间或已过期");
                }
            }
        }

        list = lessonClassService.findAllBySemesterId(semesterId);
        return ExecuteResult.ok(list);
    }


}
