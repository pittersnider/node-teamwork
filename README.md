# TeamWork Project API for Node.js

**BEFORE YOU START**: This project is under alpha-experimental stage! API refactoration or break changes could be done. Also, documentation is still being written.

The purpose of this software is to turn the TeamWork Restful APIs more acessible and developer-friendly. To turn it possible, was created a wrapper containing the promise-based CRUD functions, allowing you to handle your projects, tasks, milestones, and everything else inside TeamWork Projects.  
  
This software is still under development and many of the desired APIs are currently being implemented. Please, consider being patient, or submiting your pull request with new features and/or improvements.  
  
Please, considerar that if TeamWork change their Restful API, this software may break.  
By **João Pedro Viana**, February 22th, 2018.

## Install

Common (NPM): `npm install node-teamwork --save`  
Custom (Yarn): `yarn add node-teamwork --save`
  
Generate your TeamWork's token and read their FAQ: https://developer.teamwork.com

## Last changes
```
- Now all applicable API methods can receive 'pagination' as argument. See API for details.
- Added new APIs: getProjectPeople(), getActiveProjects()
- getProject: Added 'includePeople' (defaults true) to the argument's object
```

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

## Missing APIs
You can submit a specific API by creating a new issue.  
I'll attend your issue as soon as possible.

## Disclaimer

I'm not member of TeamWork's STAFF. I've just made this software with the purpose to turn more easy and developer-friendly to handle TeamWork RESTFUL APIs.  
  
This software depends on TeamWork's uptime and their API consistence.

## License

**Author:** João Pedro Viana (wernovox, snider@degiant.com.br)  
**License:** MIT License
