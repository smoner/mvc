package com.yy.mvc.handlers;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
public class HelloWorld {
    /**
     * 1. 使用RequestMapping注解来映射请求的URL
     * 2. 返回值会通过视图解析器解析为实际的物理视图, 对于InternalResourceViewResolver视图解析器，会做如下解析
     * 通过prefix+returnVal+suffix 这样的方式得到实际的物理视图，然后会转发操作
     * "/WEB-INF/views/success.jsp"
     * DF
     * @return
     */
	@RequestMapping("/yuncai")
    public String hello(ModelMap model){
        String word3 = "Hello ";
        String word0 = "Hello ";
        String word1 = "World!";
        //將數據添加到視圖數據容器中
        model.addAttribute("word0",word0);
        model.addAttribute("word1",word1);
        return "index";
    }
}