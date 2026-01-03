const express=require('express');
const router=express.Router();
let employees=[
    {id:1, name: "Nandhini", dept:"Testing", salary:80000},
    {id:2, name: "Vinisha", dept:"Testing", age:80000}
];
router.get('/',(req,res)=>{
    res.json(employees);
});
router.put('/:id',(req, res)=>{
    const id =parseInt(req.params.id);
    const updateName= req.body.name;
    employees=employees.map(employee =>
        employee.id===id?{...employee, name:updateName}:employee
    );
    res.json({
        message:"Employee updated successfully",
        employees
    });
});  
router.post('/',(req, res)=>{
    const newEmployees=req.body;
    employees.push(newEmployees);
    res.status(201).json({
        message:"Employee added successfully",
        employees
    });
});
router.post('/',(req, res)=>{
    const newEmployees=req.body;
    if(Array.isArray(newEmployees)){
        employees.push(...newEmployees);
    }else {
        employees.push(newEmployees);
    }
    res.status(201).json({
        message:"Employee added successfully",
        employees
    });
});
router.put('/',(req,res)=>{
    const updates=req.body;
    updates.forEach(update=>{
        employees=employees.map(employee=>
            employee.id===update.id
                ?{...employee, name: update.name}
                :employee
        );
    });
    res.json({
        message:"Employee added successfully",
        employees
    });
});
router.delete('/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    employees=employees.filter(employee=>employee.id!==id);
    res.json({
        message:"Employee deleted successfully",
        employees
    });
});

router.delete('/',(req,res)=>{
    const idsToDelete=req.body;
    employees=employees.filter(
        employee=>!idsToDelete.includes(employee.id)
    );
    res.json({
        message:"Employee deleted successfully",
        employees
    });
});


module.exports=router;
