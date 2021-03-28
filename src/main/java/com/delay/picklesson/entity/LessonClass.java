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

    @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss",timezone = "GMT+8")
    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    private Date createTime;
}
