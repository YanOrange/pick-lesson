package com.delay.picklesson.controller;

import com.delay.picklesson.service.LessonClassService;
import com.delay.picklesson.service.UserLessonService;
import com.delay.picklesson.utils.ExecuteResult;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @Author 闫金柱
 * @create 2021-3-30 17:32
 */
@Controller
@RequestMapping("lessonClass")
public class LessonClassController {

    @Autowired
    LessonClassService lessonClassService;
    @Autowired
    UserLessonService userLessonService;

    /**
     * 删除课程表
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

}
