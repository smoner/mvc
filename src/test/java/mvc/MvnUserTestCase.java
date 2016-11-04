package mvc;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;

import com.hanfeng.mis.modules.sys.entity.User;
import com.hanfeng.mis.modules.sys.service.UserService;

@ContextConfiguration(locations={"classpath:/spring-context-mybatis.xml"})
public class MvnUserTestCase extends
		AbstractTransactionalJUnit4SpringContextTests {
	@Autowired
	private UserService userservice;
	@Test
	public void testInsertUser(){
		User user =userservice.getUserById(1L);
		System.out.println("ddd");
	}

}
