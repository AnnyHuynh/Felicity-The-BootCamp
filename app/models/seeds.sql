
/* groups */
INSERT INTO `felicitydb`.`groups`(`groupname`,`grouptopic`,`grouplocation`,`status`,`createdAt`,`updatedAt`) values('Javascript for beginners','Javascript','Bellevue','active',NOW(),NOW());
INSERT INTO `felicitydb`.`groups`(`groupname`,`grouptopic`,`grouplocation`,`status`,`createdAt`,`updatedAt`) values('FE Frameworks','Front End Technologies','Bellevue','active',NOW(),NOW());
INSERT INTO `felicitydb`.`groups`(`groupname`,`grouptopic`,`grouplocation`,`status`,`createdAt`,`updatedAt`) values('FE Coders','Front End Technologies','South Seattle','active',NOW(),NOW());
INSERT INTO `felicitydb`.`groups`(`groupname`,`grouptopic`,`grouplocation`,`status`,`createdAt`,`updatedAt`) values('BE Server Side Coding','Back End Technologies','North Seattle','active',NOW(),NOW());
INSERT INTO `felicitydb`.`groups`(`groupname`,`grouptopic`,`grouplocation`,`status`,`createdAt`,`updatedAt`) values('Nodejs & Expressjs','Back End Technologies','Bellevue','active',NOW(),NOW());
INSERT INTO `felicitydb`.`groups`(`groupname`,`grouptopic`,`grouplocation`,`status`,`createdAt`,`updatedAt`) values('Algos','DataStructure and Algorithms','Bellevue','active',NOW(),NOW());

/* somedefault groups user has joined*/
INSERT INTO `felicitydb`.`groupusers`
(`createdAt`,
`updatedAt`,
`groupId`,
`userId`)
VALUES
(NOW(),NOW(),1,1);

INSERT INTO `felicitydb`.`groupusers`
(`createdAt`,
`updatedAt`,
`groupId`,
`userId`)
VALUES
(NOW(),NOW(),2,1);