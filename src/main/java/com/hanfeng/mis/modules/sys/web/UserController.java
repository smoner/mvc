package com.hanfeng.mis.modules.sys.web;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSON;
import com.hanfeng.mis.modules.sys.entity.User;
import com.hanfeng.mis.modules.sys.service.UserService;

@Controller
@RequestMapping("/user")
public class UserController {
	
	private static final Logger logger = Logger.getLogger(UserController.class);
	
	private UserService userService;

	@Resource
	public void setUserService(UserService userService) {
		this.userService = userService;
	}
	
	@RequestMapping("/{id}")
	public String showUser(@PathVariable int id,HttpServletRequest request){
		User user = userService.getUserById(1L);
		request.setAttribute("user", user);
		logger.debug("根据ID获取用户："+JSON.toJSONString(user));
		return "modules/sys/showUser";	
	}
}
