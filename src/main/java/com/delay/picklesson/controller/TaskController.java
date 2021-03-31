package com.delay.picklesson.controller;

import com.delay.picklesson.entity.Semester;
import com.delay.picklesson.entity.Task;
import com.delay.picklesson.service.TaskService;
import com.delay.picklesson.utils.ExecuteResult;
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
 * @create 2021-3-31 16:24
 */
@Controller
@RequestMapping("task")
public class TaskController {

    @Autowired
    TaskService taskService;

    /**
     * 更改任务页面
     *
     * @return
     */
    @RequestMapping("findAll")
    @ResponseBody
    public ExecuteResult findAll() {

        List<Task> all = taskService.findAll();

        return ExecuteResult.ok(all);
    }

    /**
     * 更改任务页面
     *
     * @return
     */
    @RequestMapping("toEditTask")
    public String toEditTask(@RequestParam("taskId") Integer taskId, Model model) {

        Task byId = taskService.findById(taskId).orElse(null);
        model.addAttribute("task", byId);

        return "task/task-edit";
    }

    /**
     * 更改任务
     *
     * @return
     */
    @RequestMapping("editInfo")
    @ResponseBody
    public ExecuteResult editInfo(@RequestBody Task task) {
        Task byId = taskService.findById(task.getId()).orElse(null);
        BeanUtils.copyProperties(task, byId, "createTime","semester");
        taskService.saveAndFlush(byId);
        return ExecuteResult.ok();
    }

    /**
     * 添加任务
     * @param task
     * @return
     */
    @RequestMapping("add")
    @ResponseBody
    public ExecuteResult add(@RequestBody Task task) {
        Task byName = taskService.findByNameAndSemesterId(task.getName(),task.getSemester().getId());
        if (byName != null) {
            return ExecuteResult.fail(1, "该任务已存在");
        }
        task.setCreateTime(new Date());
        taskService.saveAndFlush(task);
        return ExecuteResult.ok();
    }

}
