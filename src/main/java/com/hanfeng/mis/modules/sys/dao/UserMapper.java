package com.hanfeng.mis.modules.sys.dao;

import com.hanfeng.mis.common.persistence.annotation.MyBatisDao;
import com.hanfeng.mis.modules.sys.entity.User;
@MyBatisDao
public interface UserMapper {
    int deleteByPrimaryKey(Long id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);
}