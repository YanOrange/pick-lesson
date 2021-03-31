package com.delay.picklesson.service;

import com.delay.picklesson.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @Author 闫金柱
 * @create 2021-3-15 10:42
 */
public interface TaskService extends JpaRepository<Task,Integer> {

    Task findByName(String name);

    Task findByNameAndSemesterId(String name, Integer id);

    Task findBySemesterId(Integer semesterId);
}
