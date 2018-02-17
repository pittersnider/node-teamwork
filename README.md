# TeamWork Project API for Node.js

The purpose of this software is to turn the TeamWork Restful APIs more acessible and developer-friendly. To turn it possible, was created a wrapper containing the promise-based CRUD functions, allowing you to handle your projects, tasks, milestones, and everything else inside TeamWork Projects.  
  
This software is still under development and many of the desired APIs are currently being implemented. Please, consider being patient, or submiting your pull request with new features and/or improvements.  
  
Please, considerar that if TeamWork change their Restful API, this software may break.  
By **João Pedro Viana**, February 22th, 2018.

## Install

Common (NPM): `npm install node-teamwork --save`  
Custom (Yarn): `yarn add node-teamwork --save`
  
Generare your TeamWork's token and read their FAQ: https://developer.teamwork.com

## Currently Available APIs

```javascript
'use strict';

const TeamWorkSession = require('node-teamwork');

// We'll now create a session; an instance of TeamWork to use with our APi.
// Attention: You can use ANY url you want (in an example, if you have a dedicated teamwork domain name).
const TeamWork = new TeamWorkSession({ url: 'https://your-team.teamwork.com', token: 'your account token'});

// Now you're allowed to use all APIs with permission granted by the Token.

```

Our API response is always offered as:
```javascript
// Pattern of response
{
    "url": "https://your-team.teamwork.com/{service}",
    "success": true|false,
    "payload": { /* Response by TeamWork */ },
}

// Example of response (when creating a time entry)
{
    "url": 'https://your-team.teamwork.com/tasks/8016586/time_entries.json',
    "success": true,
    "payload": { 
        /* Response by TeamWork */
        "timeLogId": '3434306',
        "STATUS": 'OK'
    }
}
```

And our current APIs are:

#### Get Project by ID
```javascript
// asynchronous (promise)
// Retrieves information about a specific project
TeamWork.getProject({ projectId: '1' }).then((response) => { ... }).catch((error) => { ... });
```

#### Get Tasks assigned to User(s) ID(s)
```javascript
// asynchronous (promise)
// Retrieves a list of tasks from a single specific user
TeamWork.getUserTasks({ userIds: '2' }).then(...).catch(...);

// or retrieves a list of tasks from specific users
TeamWork.getUserTasks({ userIds: ['1', '2', ...] }).then(...).catch(...);

```

#### Get Tasks from Project ID
```javascript
// asynchronous (promise)
// Retrieves a list of tasks from a SINGLE specific project
TeamWork.getProjectTasks({ projectId: '2' }).then(...).catch(...);

// you may also filter by ONE or MANY user(s)
TeamWork.getUserTasks({ projectId: '2', userIds: ['1', ...] }).then(...).catch(...);

```

#### Add User(s) to Project
```javascript
// asynchronous (promise)
// Add a SINGLE user to the project
TeamWork.addProjectUser({ projectId: '2', userIds: '1' }).then(...).catch(...);

// you may also add more than one user per time to the project
TeamWork.addProjectUser({ projectId: '2', userIds: ['1', '2', ...] }).then(...).catch(...);

```

#### Add User(s) to Project
```javascript
// asynchronous (promise)
// REMOVE a SINGLE user from the project
TeamWork.removeProjectUser({ projectId: '2', userIds: '1' }).then(...).catch(...);

// you may also remove more than one user per time from the project
TeamWork.removeProjectUser({ projectId: '2', userIds: ['1', '2', ...] }).then(...).catch(...);

```

#### Mark Task as Completed
```javascript
// asynchronous (promise)
// Mark task as completed
TeamWork.completeTask({ taskId: '2' }).then(...).catch(...);

```

#### Mark Task as Uncompleted (Reopen)
```javascript
// asynchronous (promise)
// Mark task as uncompleted/undone and reopens it
TeamWork.reopenTask({ taskId: '2' }).then(...).catch(...);

```

#### Create Tasklist
```javascript
// asynchronous (promise)
// Create a new Tasklist inside a specific project
TeamWork.addTasklist({ 
    projectId: "1",
    name: "design and ux",
    description: "the necessary steps before we can launch the product design and ux",
    pinned: true,
    milestoneId: '',
    todoListTemplateId: '',

    // 'hidden' is the 'private'; different name due to JS protected keyword
    hidden: false
}).then(...).catch(...);

```

#### Create Task inside Tasklist
```javascript
// asynchronous (promise)
// Create a new Task inside a specific tasklist
TeamWork.addTask({ 
    parentTaskId: '0',
    tasklistId: "1",
    content: "check login page usabillity - ux",
    progress: '25',
    startDate: '20180103',
    endDate: ''
}).then(...).catch(...);

```

#### Create Time Entry (assigned to Project)
```javascript
// asynchronous (promise)
// Create a new Time Entry assigned to a specific project
TeamWork.addProjectTimeEntry({ 
    projectId: '1',
    userId: '331',
    hours: '1',
    minutes: '30',
    date: '20180201',
    time: '12:00',
    isbillable: '1',
    tags: 'tag1,tag2',
    description: 'tell your boss what are you doing'
}).then(...).catch(...);

```

#### Create Time Entry (assigned to Task)
```javascript
// asynchronous (promise)
// Create a new Time Entry assigned to a specific task
TeamWork.addTaskTimeEntry({ 
    taskId: '1333',
    userId: '331',
    hours: '1',
    minutes: '30',
    date: '20180209',
    time: '14:20',
    isbillable: '1',
    tags: 'tag1,tag2',
    description: 'tell your boss what are you doing'
}).then(...).catch(...);

```

#### Delete Time Entry
```javascript
// asynchronous (promise)
// Delete a time entry from the TeamWork
TeamWork.removeTimeEntry({ timeId: '2' }).then(...).catch(...);

```

## Missing APIs
You can submit a specific API by creating a new issue.  
I'll attend your issue as soon as possible.

## Disclaimer

I'm not member of TeamWork's STAFF. I've just made this software with the purpose to turn more easy and developer-friendly to handle TeamWork RESTFUL APIs.  
  
This software depends on TeamWork's uptime and their API consistence.

## License

**Author:** João Pedro Viana (wernovox, snider@degiant.com.br)  
**License:** GPL-3.0
