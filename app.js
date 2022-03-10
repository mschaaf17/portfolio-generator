const fs = require('fs')
const inquirer= require('inquirer')
const generatePage = require('./src/page-template')

const promptUser = () => {
return inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'What is your name? (Required)',
    validate: nameInput=> {
      if (nameInput) {
      return true;
    } else {
      console.log('Please enter your name!')
      return false;
    }
  }
  },
  {
    type: 'input',
    name: 'github',
    message: 'Enter your GitHub Username (Required)',
    validate: userInput => {
      if(userInput) {
        return true;
      } else {
        console.log('Please enter your username!')
      }
    }
  },
  {
    type: 'confirm',
    name: 'confirmAbout',
    message: 'Would you like to enter some information about yourself for an "About" section?',
    default: true
  },
  {
    type: 'input',
    name: 'about',
    message: 'Provide some information about yourself:',
    when: ({confirmAbout})=> {
      if (confirmAbout) {
        return true;
      } else {
        return false;
      }
    }
  }
])
}

//promptUser().then(answers=> console.log(answers));

const promptProject = portfolioData => {
  console.log(`
  ======================
  Add a New Project
  ===============
  `);
  //if theres no array proprety, create one 
  if(!portfolioData.projects) {
    portfolioData.projects = [];
  }
  return inquirer.prompt([
    {
      type:'input',
      name: 'name',
      message: 'What is the name of your project? (Required)',
      validate: nameInput => {
        if(nameInput) {
          return true;
        } else {
          console.log('Please enter the name of your project!')
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project(Required)',
      validate: description => {
        if (description) {
          return true;
        } else {
          console.log('Please enter a desription of the project')
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: link => {
        if (link) {
          return true; 
          } else {
            console.lof('Please enter GitHub link')
          }
        }
      },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    }, 
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ])
};
promptUser()
//.then(answers => console.log(answers))
.then(promptProject)
.then(portfolioData => {
console.log(portfolioData)})
.then(projectData => {
portfolioData.projects.push(projectData);
 if (projectData.confirmAddProject) {
 return promptProject(portfolioData);
 } else {
   return portfolioData;
 }
 });

// const fs = require('fs');
// 

// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!')
// })