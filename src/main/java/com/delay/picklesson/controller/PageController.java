package com.delay.picklesson.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author 闫金柱
 * @date 2021-3-27 19:23
 */
@Controller
@RequestMapping("page")
public class PageController extends BaseController{

    /**
     * 登录页面
     *
     * @return
     */
    @RequestMapping("login")
    public String login() {
        return "login";
    }

    /**
     * 欢迎页面
     *
     * @return
     */
    @RequestMapping("welcome")
    public String welcome() {
        return "welcome";
    }

    /**
     * 首页
     *
     * @return
     */
    @RequestMapping("index")
    public String index() {
        return "index";
    }

    /**
     * 新增用户
     *
     * @return
     */
    @RequestMapping("add")
    public String add(Integer status, Model model) {
        model.addAttribute("status", status);
        return "author/person-add";
    }

    /**
     * 退出登录
     *
     * @return
     */
    @RequestMapping("exit")
    public String exit() {

        getSession().removeAttribute("user");

        return "login";
    }

    /**
     * 个人信息
     *
     * @return
     */
    @RequestMapping("person")
    public String person(){
        return "author/person";
    }

    /**
     * 科目管理
     * @return
     */
    @RequestMapping("lessonList")
    public String lessonList(){
        return "lesson/lesson-list";
    }

    /**
     * 添加科目
     * @return
     */
    @RequestMapping("addLesson")
    public String addLesson(){
        return "lesson/lesson-add";
    }

    /**
     * 学生列表
     * @return
     */
    @RequestMapping("userList")
    public String userList(){
        return "author/person-list";
    }

    /**
     * 课程表列表
     * @return
     */
    @RequestMapping("classList")
    public String classList(){
        return "class/class-list";
    }

    /**
     * 学期列表
     * @return
     */
    @RequestMapping("semesterList")
    public String semesterList(){
        return "semester/semester-list";
    }


    /**
     * 添加学期
     * @return
     */
    @RequestMapping("addSemester")
    public String addSemester(){
        return "semester/semester-add";
    }

    /**
     * 前往定时任务页面
     * @return
     */
    @RequestMapping("toGetMaster")
    public String toGetMaster(){
        return "task/task-list";
    }

    /**
     * 前往管理员列表
     * @return
     */
    @RequestMapping("toAdmin")
    public String toAdmin(){
        return "admin/admin-list";
    }

    /**
     * 前往选课列表
     * @return
     */
    @RequestMapping("pickList")
    public String pickList(){
        return "pick/pick-list";
    }

    /**
     * 前往自选列表
     * @return
     */
    @RequestMapping("userLessonList")
    public String userLessonList(){
        return "pick/user-lesson-list";
    }

    /**
     * 前往添加课程页面
     * @return
     */
    @RequestMapping("addLessonClass")
    public String addLessonClass(){
        return "class/class-add";
    }

    /**
     * 前往添加定时任务页面
     * @return
     */
    @RequestMapping("addTask")
    public String addTask(){
        return "task/task-add";
    }


}
