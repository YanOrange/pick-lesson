package com.delay.picklesson.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

/**
 * @author 闫金柱
 * @date 2021-3-27 19:27
 */
@Entity
@Data
@Table(name = "t_lesson_class")
public class LessonClass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)//自增长
    private Integer id;

    @JoinColumn(name = "lesson_id")//外键字段
    @ManyToOne(fetch = FetchType.EAGER)
    private Lesson lesson;

    @JoinColumn(name = "semester_id")//外键字段
    @ManyToOne(fetch = FetchType.EAGER)
    private Semester semester;

    private String doClassTime;//上课时间  每周三第七节 19:00-21:00

    private Integer num;//总人数（意味着提供的课程总数量）

    @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss",timezone = "GMT+8")
    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    private Date createTime;
}
