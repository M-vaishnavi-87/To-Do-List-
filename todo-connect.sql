create database todo;
use todo;

create table todoItems(
Id int primary key auto_increment,
itemDescription varchar(100),
completed boolean default false
);
select *from todoItems;
insert into todoItems(id, itemDecription) values(id,"insering my sql");
update todoItems set itemDescription = "new Description" where id = 3;
