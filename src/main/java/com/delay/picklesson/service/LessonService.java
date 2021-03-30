package com.delay.picklesson.service;

import com.delay.picklesson.entity.Lesson;
import com.delay.picklesson.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @Author 闫金柱
 * @create 2021-3-15 10:42
 */
public interface LessonService extends JpaRepository<Lesson,Integer> {

    Lesson findByName(String name);
}
