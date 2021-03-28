package com.delay.picklesson.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "t_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)//自增长
    private Integer id;

    private String name;
    private String sex;
    private String phone;
    private String specialty;//专业
    private String grade;//班级
    private String account;//学号
    private String passWord;
    @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss",timezone = "GMT+8")
    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    private Date createTime;
    private Integer status;//0普通用户 3管理员


}
