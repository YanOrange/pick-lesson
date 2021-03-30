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

}
