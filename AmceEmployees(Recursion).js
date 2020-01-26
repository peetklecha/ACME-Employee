const employees = [
    { id: 1, name: 'moe'},
    { id: 2, name: 'larry', managerId: 1},
    { id: 4, name: 'shep', managerId: 2},
    { id: 3, name: 'curly', managerId: 1},
    { id: 5, name: 'groucho', managerId: 3},
    { id: 6, name: 'harpo', managerId: 5},
    { id: 8, name: 'shep Jr.', managerId: 4},
    { id: 99, name: 'lucy', managerId: 1}
  ];
  
  const spacer = (text)=> {
    if(!text){
      return console.log('');
    }
    const stars = new Array(5).fill('*').join('');
    console.log(`${stars} ${text} ${stars}`);
  }
  
  
  //[pk] ok, but for-in would be better... filter would be even better!
  spacer('findEmployeeByName Moe')
  // given a name and array of employees, return employee
  const findEmployeeByName=(name,employees)=>{
    for(let employee of employees){
      if(employee.name === name){
        return employee
      }
    }
  }
  
  console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }
  spacer('')
  
  
  //[pk] same
  spacer('findManagerFor Shep')
  //given an employee and a list of employees, return the employee who is the manager
  const findManagerFor=(employee,employees)=>{
    let employee2 = findEmployeeByName('shep Jr.', employees)
  
    for(let employee of employees){
      if(employee.id === employee2.managerId){
        return employee
      }
    }
  }
  
  console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }
  spacer('')
  
  
  //[pk] good! here "find" is the ideal array method to use
  spacer('findCoworkersFor Larry')
  //given an employee and a list of employees, return the employees who report to the same manager
  const findCoworkersFor=(employee,employees)=>{
    let output = []
    let manager = findEmployeeByName('larry', employees)
  
    for(let employee of employees){
      if(employee.managerId === manager.managerId && employee.name !== manager.name){
        output.push(employee)
      }
    }
    return output
  }
  
  console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));/*
  [ { id: 3, name: 'curly', managerId: 1 },
    { id: 99, name: 'lucy', managerId: 1 } ]
  */
  spacer('');
  
  
  
  spacer('findManagementChain for moe')
  //given an employee and a list of employees, return a the management chain for that employee. 
  //The management chain starts from the employee with no manager with the passed in employees manager 

  //[pk] you gave this the wrong name so when you run it in repl it crashes. how did you test whether it works?
  const findManagementChain=(employee,employees)=>{
    let output = []
    let baseEmplyoee = findEmployeeByName(employee, employees);
     //[pk] you're given the employee. why do you need to find them? (also find by name takes a string not an object, so this would crash.)

    
    output = employees.filter(employees=>employees.id>=baseEmplyoee.managerId)
    //[pk] wait what? ">="?? id number is arbitrary. what if you ran this on lucy?  
      
    //sort the output list of qualifying Managers
    
    return output
  }
  
  console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));//[  ]
  spacer('');



  spacer('findManagementChain for shep Jr.')
  console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));/*
    [ { id: 1, name: 'moe' },
    { id: 2, name: 'larry', managerId: 1 },
    { id: 4, name: 'shep', managerId: 2 }]
    */
    spacer('');


 spacer('generateManagementTree')
 //given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
 console.log(JSON.stringify(generateManagementTree(employees), null, 2));
 /*
 {
  "id": 1,
  "name": "moe",
  "reports": [
    {
      "id": 2,
      "name": "larry",
      "managerId": 1,
      "reports": [
        {
          "id": 4,
          "name": "shep",
          "managerId": 2,
          "reports": [
            {
              "id": 8,
              "name": "shep Jr.",
              "managerId": 4,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "curly",
      "managerId": 1,
      "reports": [
        {
          "id": 5,
          "name": "groucho",
          "managerId": 3,
          "reports": [
            {
              "id": 6,
              "name": "harpo",
              "managerId": 5,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 99,
      "name": "lucy",
      "managerId": 1,
      "reports": []
    }
  ]
 }
 */
 spacer('');

 spacer('displayManagementTree')
 //given a tree of employees, generate a display which displays the hierarchy
 displayManagementTree(generateManagementTree(employees));/*
 moe
 -larry
 --shep
 ---shep Jr.
 -curly
 --groucho
 ---harpo
 -lucy
 */
