package com.hanfeng.mis.modules.sys.service;

import com.hanfeng.mis.modules.sys.entity.User;

public interface UserService {
	/**
	 * 根据id获取用户
	 */
	public User getUserById(Long id);
}
