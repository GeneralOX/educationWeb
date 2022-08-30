import express, { Router } from 'express';
import auth from './components/auth/auth.controller';
import course from './components/course/course.controller';
import events from './components/event/event.controller';
import users from './components/user/user.controller';

const router = Router();
router.get('/', (req, res) => res.send('ok'));


/* AUTH ROUTER */
{
    // REGISTER USER
    router.post('/auth/register', auth.register);

    // LOGIN USER
    router.post('/auth/login', auth.login);
}

/* USER ROUTER */
{
    // FIND ALL USER
    router.post('/user/find', users.findAll);

    // GET USER DETAILS
    router.post('/user/find/:id', users.findOne);

    //  USER DELETE
    router.post('/user/delete/:id', users.remove);

    //  USER CONFIRM
    router.post('/user/confirm/:id', users.accept);

    //  USER UPDATE
    router.post('/user/update/:id', users.update);
}

/* course ROUTER */
{
    // CREATE course
    router.post('/course/create/:id', course.create);

    // FIND ALL courses
    router.post('/course/find', course.findAll);

    // FIND course
    router.post('/course/find/:id', course.findOne);

    // FIND course
    router.post('/course/user/:id', course.coursesByUser);

    // DELETE course
    router.post('/course/delete/:id', course.remove);

    // UPDATE course
    router.post('/course/update/:id', course.update);

    // JOIN course
    router.post('/course/join/:id', course.join);
    
    // participant course
    router.post('/course/participant/:id', course.participant);
}


/* event ROUTER */
{
    // CREATE event
    router.post('/event/create/:id', events.create);

    // FIND ALL eventS
    router.post('/event/find', events.findAll);

    // FIND event
    router.post('/event/find/:id', events.findOne);

    // FIND event
    router.post('/event/user/:id', events.eventsByUser);

    // DELETE event
    router.post('/event/delete/:id', events.remove);

    // UPDATE event
    router.post('/event/update/:id', events.update);

    // JOIN event
    // router.post('/event/join/:id', events.join);
}

module.exports = router;