package com.delay.picklesson.controller;

import com.delay.picklesson.utils.ExecuteResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author 闫金柱
 * @date 2021-3-27 19:21
 */
@Controller
@RequestMapping("lesson")
public class LessonController {

    @RequestMapping("findAll")
    @ResponseBody
    public ExecuteResult findAll(){
        return null;
    }

}
