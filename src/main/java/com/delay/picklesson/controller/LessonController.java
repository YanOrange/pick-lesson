package com.delay.picklesson.controller;

import com.delay.picklesson.entity.Lesson;
import com.delay.picklesson.service.LessonClassService;
import com.delay.picklesson.service.LessonService;
import com.delay.picklesson.service.UserLessonService;
import com.delay.picklesson.utils.ExecuteResult;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.List;

/**
 * @author 闫金柱
 * @date 2021-3-27 19:21
 */
@Controller
@RequestMapping("lesson")
public class LessonController {

    @Autowired
    LessonService lessonService;
    @Autowired
    LessonClassService lessonClassService;
    @Autowired
    UserLessonService userLessonService;

    /**
     * 查找全部科目
     * @return
     */
    @RequestMapping("getAll")
    @ResponseBody
    public ExecuteResult findAll(){
        return null;
    }

    /**
     * 添加科目
     * @param lesson
     * @return
     */
    @RequestMapping("add")
    @ResponseBody
    public ExecuteResult add(@RequestBody Lesson lesson) {
        Lesson byName = lessonService.findByName(lesson.getName());
        if (byName != null) {
            return ExecuteResult.fail(1, "该科目已存在");
        }
        lesson.setCreateTime(new Date());
        lessonService.saveAndFlush(lesson);
        return ExecuteResult.ok();
    }

    /**
     * 删除科目
     *
     * @return
     */
    @RequestMapping("delete")
    @ResponseBody
    public ExecuteResult delete(@RequestBody List<Integer> ids) {
        if (CollectionUtils.isEmpty(ids)) {
            return ExecuteResult.fail(1, "未选择一列");
        }
        ids.stream().forEach(o -> {
            userLessonService.deleteByLessonId(o);
            lessonClassService.deleteByLessonId(o);
            lessonService.deleteById(o);
        });
        return ExecuteResult.ok();
    }

    /**
     * 更改科目
     *
     * @return
     */
    @RequestMapping("editInfo")
    @ResponseBody
    public ExecuteResult editInfo(@RequestBody Lesson lesson) {
        Lesson byId = lessonService.findById(lesson.getId()).orElse(null);
        BeanUtils.copyProperties(lesson, byId, "createTime");
        lessonService.saveAndFlush(byId);
        return ExecuteResult.ok();
    }

    /**
     * 更改科目页面
     *
     * @return
     */
    @RequestMapping("toEditLesson")
    public String toEditLesson(@RequestParam("lessonId") Integer lessonId, Model model) {

        Lesson byId = lessonService.findById(lessonId).orElse(null);
        model.addAttribute("lesson", byId);

        return "lesson/lesson-edit";
    }




}
