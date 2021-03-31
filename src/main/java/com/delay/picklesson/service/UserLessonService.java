package com.delay.picklesson.service;

import com.delay.picklesson.entity.LessonClass;
import com.delay.picklesson.entity.UserLesson;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @Author 闫金柱
 * @create 2021-3-15 10:42
 */
public interface UserLessonService extends JpaRepository<UserLesson,Integer> {

    void deleteByLessonClassId(Integer o);

    void deleteByLessonId(Integer o);

    void deleteByUserId(Integer o);

    UserLesson findByLessonClassId(Integer lessonClassId);

    List<UserLesson> findByUserId(Integer id);

    UserLesson findByLessonClassIdAndUserId(Integer lessonClassId, Integer id);
}
