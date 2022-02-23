create database practica1;
use practica1;
create table datos
(
id_data int auto_increment primary key,
fecha timestamp default current_timestamp,
Temp_Int double,
Temp_Ext double,
Humedad double,
Luz double,
Co2 double
);
insert into datos(Temp_Int,Temp_Ext,Humedad,Luz,Co2) values(10.0,12.2,13.3,14.5,15.6);
insert into datos(Temp_Int,Temp_Ext,Humedad,Luz,Co2) values(10,12,13,14,16);

select * from datos where convert(varchar,fecha,112)='20220222'

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin';

flush privileges;