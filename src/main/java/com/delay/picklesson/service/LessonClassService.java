package com.delay.picklesson.service;

import com.delay.picklesson.entity.LessonClass;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @Author 闫金柱
 * @create 2021-3-15 10:42
 */
public interface LessonClassService extends JpaRepository<LessonClass,Integer> {

    void deleteByLessonId(Integer o);

    List<LessonClass> findAllBySemesterId(Integer semesterId);
}
