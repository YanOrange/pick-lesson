package com.delay.picklesson.service;

import com.delay.picklesson.entity.LessonClass;
import com.delay.picklesson.entity.Semester;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @Author 闫金柱
 * @create 2021-3-15 10:42
 */
public interface SemesterService extends JpaRepository<Semester,Integer> {

    Semester findByName(String name);
}
