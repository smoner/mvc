create database mvc ;
use mvc ;	
create table mvc_user
    (
        id bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
        company_id bigint ,
        office_id bigint,
        login_name VARCHAR(200),
        password VARCHAR(200),
        no VARCHAR(200),
        name VARCHAR(200),			
        email VARCHAR(200),
        phone VARCHAR(200),
        mobile VARCHAR(200),
        user_type char(1),				
        login_ip VARCHAR(200),
        login_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NULL,
        create_by bigint,
        create_date TIMESTAMP,		
        update_by bigint,
        update_date TIMESTAMP,
        remarks VARCHAR(200),
        del_flag char(1),        
        PRIMARY KEY (id)
    )