package com.delay.picklesson.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

/**
 * @Author 闫金柱
 * @create 2021-3-30 14:30
 */
@Entity
@Data
@Table(name = "t_user_lesson")
public class UserLesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)//自增长
    private Integer id;

    @JoinColumn(name = "lesson_id")//外键字段
    @ManyToOne(fetch = FetchType.EAGER)
    private Lesson lesson;

    @JoinColumn(name = "lesson_class_id")//外键字段
    @ManyToOne(fetch = FetchType.EAGER)
    private LessonClass lessonClass;

    @JoinColumn(name = "user_id")//外键字段
    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss",timezone = "GMT+8")
    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    private Date createTime;

}
