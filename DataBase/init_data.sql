INSERT INTO todos (userId, title, completed) VALUES
(1, 'Finish project', false),
(2, 'Buy groceries', true),
(3, 'Study for exam', false),
(4, 'Clean room', true),
(5, 'Call friend', false);

INSERT INTO comments (postId, userId, name) VALUES
(1, 2, 'Nice post!'),
(1, 3, 'Good job!'),
(2, 1, 'Welcome!'),
(3, 4, 'Sounds interesting'),
(4, 5, 'Keep going!');

INSERT INTO posts (userId, title, body) VALUES
(1, 'My First Post', 'This is my first post in the system'),
(2, 'Hello World', 'Excited to start using this app'),
(3, 'Node.js Project', 'Working on my backend project'),
(1, 'Another Post', 'Adding more content here'),
(4, 'Thoughts', 'Sharing some random thoughts');

INSERT INTO users (name, email) VALUES
('Noa Levi', 'noa@example.com'),
('David Cohen', 'david@example.com'),
('Maya Mizrahi', 'maya@example.com'),
('Yossi Klein', 'yossi@example.com'),
('Rivka Shalom', 'rivka@example.com');

INSERT INTO passwords (id, password_hash) VALUES
(1, '123456'),
(2, 'password'),
(3, 'qwerty'),
(4, 'abc123'),
(5, 'iloveyou');