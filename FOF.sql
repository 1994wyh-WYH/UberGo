CREATE TABLE Person
(
login varchar(255), 
name varchar(255),
sex varchar (7),
relationshipStatus varchar(12),
birthyear int,
PRIMARY KEY (login),
CHECK (sex IN ('male','female')),
CHECK (relationshipStatus IN ('single','married','divorced','relationship'))
);

CREATE TABLE Family
(
login varchar(255),
member varchar(255), 
role varchar(10),
PRIMARY KEY (login, member),
FOREIGN KEY (login) REFERENCES Person (login),
CHECK (role IN ('mother','father','son','daughter','aunt',
'uncle','cousin','brother','sister'))
);

CREATE TABLE Friends
(
login varchar(255),
friend varchar(255), 
PRIMARY KEY (login, friend),
FOREIGN KEY (login) REFERENCES Person (login),
FOREIGN KEY (friend) REFERENCES Person (login)
);

INSERT INTO Person VALUES('awest@gmail.com', 'Ashton Westad', 'male', 'relationship', 1989);
INSERT INTO Person VALUES('jen.westad@gmail.com', 'Jenny Westad', 'female', 'single', 1992);
INSERT INTO Person VALUES('lizashton@yahoo.com', 'Elizabeth Ashton' , 'female', 'married', 1968);
INSERT INTO Person VALUES('jashton@seas.upenn.edu', 'John Ashton', 'male', 'single', 1990);
INSERT INTO Person VALUES('mbeck@nova.edu', 'Meredith Beckner', 'female', 'single', 1989);
INSERT INTO Person VALUES('megbeckner@jmu.edu', 'Meghan Beckner', 'female', 'single', 1990);
INSERT INTO Person VALUES('mellbeckner@yahoo.com', 'Melanie Beckner', 'female', 'single', 1997);
INSERT INTO Person VALUES('susan.beckner@gmail.com', 'Susan Beckner', 'female', 'married', 1961);
INSERT INTO Person VALUES('scottbeckner@gmail.com', 'Scott Beckner', 'male', 'married', 1960);
INSERT INTO Person VALUES('hallieballie@hotmail.com', 'Hallie Bail', 'female', 'single', 1997);
INSERT INTO Person VALUES('surferdude99@yahoo.co.uk', 'Ryan Mckaskall', 'male', 'single', 1999);
INSERT INTO Person VALUES('boser@seas.upenn.edu' , 'Richard Boser' , 'male' , 'single' , 1991);
INSERT INTO Person VALUES( 'hlc209@temple.edu' , 'Hannah Cochran' , 'female' , 'relationship' , 1994);
INSERT INTO Person VALUES( 'wsf305@drexel.edu' , 'West Finelli' , 'male' , 'single' , 1983);
INSERT INTO Person VALUES('dan.finelli@yahoo.com' , 'Daniel Finelli' , 'male' , 'divorced' , 1954); 
INSERT INTO Person VALUES( 'lyd.jasp@gmail.com' , 'Lydia Jasper' , 'female' , 'single' , 1991);
INSERT INTO Person VALUES('ka.mazejy@yahoo.com' , 'Kristin Mazejy' , 'female' , 'single' , 1987);
INSERT INTO Person VALUES('luken@temple.edu' , 'Luke Newton' , 'male' , 'single' , 1995);
INSERT INTO Person VALUES('richterder@sas.upenn.edu' , 'Derek Richter' , 'male' , 'single' , 1988);
INSERT INTO Person VALUES('mupton@wharton.upenn.edu' , 'Marcus Upton' , 'male' , 'relationship' , 1990);
INSERT INTO Person VALUES( 'natvul@gmail.com' , 'Natalie Vulcan' , 'female' , 'relationship' , 1995);
INSERT INTO Person VALUES('westadj@sas.upenn.edu' , ' Josh Westad' , 'male' , 'single' , 1987);
INSERT INTO Person VALUES('arnold.westad@gmail.com' , 'Arnold Westad' , 'male' , 'married' , 1958);

INSERT INTO Family VALUES('awest@gmail.com', 'arnold.westad@gmail.com' , 'father');
INSERT INTO Family VALUES('mbeck@nova.edu', 'scottbeckner@gmail.com', 'father');
INSERT INTO Family VALUES('wsf305@drexel.edu' , 'dan.finelli@yahoo.com' , 'father');
INSERT INTO Family VALUES('jen.westad@gmail.com', 'awest@gmail.com', 'brother');
INSERT INTO Family VALUES( 'jen.westad@gmail.com', 'westadj@sas.upenn.edu' , 'brother');
INSERT INTO Family VALUES( 'mbeck@nova.edu', 'megbeckner@jmu.edu', 'sister');
INSERT INTO Family VALUES( 'mbeck@nova.edu', 'mellbeckner@yahoo.com', 'sister');
INSERT INTO Family VALUES('awest@gmail.com','jen.westad@gmail.com', 'sister');
INSERT INTO Family VALUES('dan.finelli@yahoo.com' , 'wsf305@drexel.edu' , 'son');
INSERT INTO Family VALUES('lizashton@yahoo.com' , 'jashton@seas.upenn.edu', 'son');
INSERT INTO Family VALUES('jashton@seas.upenn.edu', 'lizashton@yahoo.com', 'mother');
INSERT INTO Family VALUES('mbeck@nova.edu', 'susan.beckner@gmail.com', 'mother');
INSERT INTO Family VALUES('scottbeckner@gmail.com','mbeck@nova.edu', 'daughter');
INSERT INTO Family VALUES('hallieballie@hotmail.com' , 'surferdude99@yahoo.co.uk', 'cousin');
INSERT INTO Family VALUES('lyd.jasp@gmail.com' , 'mbeck@nova.edu' , 'cousin');
INSERT INTO Family VALUES('mbeck@nova.edu' , 'lyd.jasp@gmail.com' , 'cousin');
INSERT INTO Family VALUES(  'lyd.jasp@gmail.com' , 'megbeckner@jmu.edu' , 'cousin');
INSERT INTO Family VALUES( 'megbeckner@jmu.edu' , 'lyd.jasp@gmail.com' , 'cousin');
INSERT INTO Family VALUES('natvul@gmail.com' , 'mupton@wharton.upenn.edu' , 'cousin');

INSERT INTO Friends VALUES('awest@gmail.com', 'jen.westad@gmail.com');
INSERT INTO Friends VALUES('jen.westad@gmail.com', 'awest@gmail.com');
INSERT INTO Friends VALUES('lizashton@yahoo.com', 'jashton@seas.upenn.edu');
INSERT INTO Friends VALUES('jashton@seas.upenn.edu' , 'lizashton@yahoo.com');
INSERT INTO Friends VALUES('awest@gmail.com', 'mbeck@nova.edu');
INSERT INTO Friends VALUES('mbeck@nova.edu', 'awest@gmail.com');
INSERT INTO Friends VALUES('surferdude99@yahoo.co.uk', 'hallieballie@hotmail.com');
INSERT INTO Friends VALUES('hallieballie@hotmail.com' , 'surferdude99@yahoo.co.uk');
INSERT INTO Friends VALUES('hlc209@temple.edu' , 'mellbeckner@yahoo.com'); #yahoo
INSERT INTO Friends VALUES('mellbeckner@yahoo.com' , 'hlc209@temple.edu' );
INSERT INTO Friends VALUES('hlc209@temple.edu' , 'luken@temple.edu');
INSERT INTO Friends VALUES('luken@temple.edu' , 'hlc209@temple.edu' );
INSERT INTO Friends VALUES('luken@temple.edu' , 'boser@seas.upenn.edu');
INSERT INTO Friends VALUES('boser@seas.upenn.edu' , 'luken@temple.edu' );
INSERT INTO Friends VALUES('natvul@gmail.com' , 'mupton@wharton.upenn.edu');
INSERT INTO Friends VALUES('mupton@wharton.upenn.edu' , 'natvul@gmail.com');
INSERT INTO Friends VALUES('natvul@gmail.com' , 'jashton@seas.upenn.edu');
INSERT INTO Friends VALUES('jashton@seas.upenn.edu' , 'natvul@gmail.com' );
INSERT INTO Friends VALUES('richterder@sas.upenn.edu' , 'awest@gmail.com');
INSERT INTO Friends VALUES('awest@gmail.com' , 'richterder@sas.upenn.edu');
INSERT INTO Friends VALUES('richterder@sas.upenn.edu' , 'ka.mazejy@yahoo.com' );
INSERT INTO Friends VALUES('ka.mazejy@yahoo.com' , 'richterder@sas.upenn.edu');
INSERT INTO Friends VALUES('wsf305@drexel.edu' , 'richterder@sas.upenn.edu');
INSERT INTO Friends VALUES( 'richterder@sas.upenn.edu', 'wsf305@drexel.edu' );
INSERT INTO Friends VALUES( 'richterder@sas.upenn.edu' , 'hlc209@temple.edu' );
INSERT INTO Friends VALUES( 'hlc209@temple.edu' , 'richterder@sas.upenn.edu');
INSERT INTO Friends VALUES( 'lyd.jasp@gmail.com' , 'natvul@gmail.com');
INSERT INTO Friends VALUES(  'mbeck@nova.edu' , 'lyd.jasp@gmail.com');
INSERT INTO Friends VALUES(  'lyd.jasp@gmail.com' , 'mbeck@nova.edu');
INSERT INTO Friends VALUES(  'megbeckner@jmu.edu' , 'lyd.jasp@gmail.com');
INSERT INTO Friends VALUES(  'lyd.jasp@gmail.com' , 'megbeckner@jmu.edu');
INSERT INTO Friends VALUES( 'natvul@gmail.com' , 'lyd.jasp@gmail.com');