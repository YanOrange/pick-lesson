package com.delay.picklesson.controller;

import com.delay.picklesson.entity.Lesson;
import com.delay.picklesson.entity.Semester;
import com.delay.picklesson.service.SemesterService;
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
 * @Author 闫金柱
 * @create 2021-3-31 10:13
 */
@Controller
@RequestMapping("semester")
public class SemesterController {

    @Autowired
    SemesterService semesterService;

    /**
     * 查找全部学期
     * @return
     */
    @RequestMapping("findAll")
    @ResponseBody
    public ExecuteResult findAll(){
        List<Semester> all = semesterService.findAll();
        return ExecuteResult.ok(all);
    }

    /**
     * 添加学期
     * @param semester
     * @return
     */
    @RequestMapping("add")
    @ResponseBody
    public ExecuteResult add(@RequestBody Semester semester) {
        Semester byName = semesterService.findByName(semester.getName());
        if (byName != null) {
            return ExecuteResult.fail(1, "该学期已存在");
        }
        semester.setCreateTime(new Date());
        semesterService.saveAndFlush(semester);
        return ExecuteResult.ok();
    }

    /**
     * 删除学期
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
            semesterService.deleteById(o);
        });
        return ExecuteResult.ok();
    }

    /**
     * 更改学期页面
     *
     * @return
     */
    @RequestMapping("toEditSemester")
    public String toEditSemester(@RequestParam("semesterId") Integer semesterId, Model model) {

        Semester byId = semesterService.findById(semesterId).orElse(null);
        model.addAttribute("semester", byId);

        return "semester/semester-edit";
    }

    /**
     * 更改学期
     *
     * @return
     */
    @RequestMapping("editInfo")
    @ResponseBody
    public ExecuteResult editInfo(@RequestBody Semester semester) {
        Semester byId = semesterService.findById(semester.getId()).orElse(null);
        BeanUtils.copyProperties(semester, byId, "createTime");
        semesterService.saveAndFlush(byId);
        return ExecuteResult.ok();
    }


}
